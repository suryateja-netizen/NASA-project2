import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import type { Country, WorldAtlas } from '../types';
import type { GeoProjection, GeoPath } from 'd3-geo';
import type { DragBehavior } from 'd3-drag';
import type { Timer } from 'd3-timer';
import type { FeatureCollection } from 'geojson';

const Globe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(null);
  const hoveredCountryRef = useRef<Country | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    let width = 0;
    let height = 0;
    
    const resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.scale(devicePixelRatio, devicePixelRatio);
    });
    
    if (canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight;
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        context.scale(devicePixelRatio, devicePixelRatio);
    }
    
    let countries: Country[] = [];
    let rotationTimer: Timer | null = null;
    let currentRotation: [number, number, number] = [0, -30, 0];

    const projection: GeoProjection = d3.geoOrthographic();
    const path: GeoPath = d3.geoPath(projection, context);

    const sphere = { type: 'Sphere' } as const;
    const graticule = d3.geoGraticule10();

    const drawGlobe = () => {
      if (!context) return;
      const scale = Math.min(width, height) / 2.2;
      projection.fitSize([width, height], sphere);
      projection.scale(scale);
      projection.translate([width / 2, height / 2]);
      projection.rotate(currentRotation);

      context.clearRect(0, 0, width, height);
      
      // 1. Atmosphere effect
      const atmosphereGradient = context.createRadialGradient(width / 2, height / 2, scale, width / 2, height / 2, scale * 1.1);
      atmosphereGradient.addColorStop(0, 'rgba(52, 144, 220, 0.4)');
      atmosphereGradient.addColorStop(1, 'rgba(52, 144, 220, 0)');
      context.fillStyle = atmosphereGradient;
      context.fillRect(0, 0, width, height);

      // 2. Ocean
      const oceanGradient = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, scale);
      oceanGradient.addColorStop(0, '#4f94d4');
      oceanGradient.addColorStop(1, '#0c2d48');
      context.fillStyle = oceanGradient;
      context.beginPath();
      path(sphere);
      context.fill();
      
      // 3. Graticules (faint)
      context.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      context.lineWidth = 0.5;
      context.beginPath();
      path(graticule);
      context.stroke();

      // 4. Land
      context.fillStyle = '#677D42'; // Earthy green/brown
      context.strokeStyle = '#283618'; // Darker border for definition
      context.lineWidth = 0.5;
      
      countries.forEach(country => {
        context.beginPath();
        path(country);
        context.fill();
        context.stroke();
      });

      // 5. Highlighted country
      if (hoveredCountryRef.current) {
        context.fillStyle = 'rgba(163, 230, 53, 0.7)'; // Semi-transparent lime
        context.beginPath();
        path(hoveredCountryRef.current);
        context.fill();
      }

      // 6. Specular Highlight (sun reflection)
      const lightSource = {x: width * 0.4, y: height * 0.4};
      const specularGradient = context.createRadialGradient(lightSource.x, lightSource.y, 0, lightSource.x, lightSource.y, scale * 0.4);
      specularGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      specularGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      context.fillStyle = specularGradient;
      context.beginPath();
      path(sphere);
      context.fill();
    };
    
    const startRotation = () => {
      rotationTimer?.stop();
      rotationTimer = d3.timer(elapsed => {
        const rotateSpeed = 0.1;
        currentRotation[0] += rotateSpeed;
        drawGlobe();
      });
    };
    
    const stopRotation = () => {
      rotationTimer?.stop();
    };

    const drag: DragBehavior<HTMLCanvasElement, unknown, unknown> = d3.drag<HTMLCanvasElement, unknown>()
      .on('start', (event) => {
        stopRotation();
      })
      .on('drag', (event) => {
        const k = 50 / projection.scale();
        currentRotation[0] += event.dx * k;
        currentRotation[1] -= event.dy * k;
        drawGlobe();
      })
      .on('end', () => {
        startRotation();
      });

    d3.select(canvas).call(drag);

    const handleMouseMove = (event: MouseEvent) => {
        const { offsetX, offsetY } = event;
        const coords = projection.invert([offsetX, offsetY]);

        if (coords) {
            const foundCountry = countries.find(c => d3.geoContains(c, coords));
            if (foundCountry) {
                if (hoveredCountryRef.current !== foundCountry) {
                    hoveredCountryRef.current = foundCountry;
                    drawGlobe();
                }
                setTooltip({ x: offsetX, y: offsetY, name: foundCountry.properties.name });
            } else {
                if (hoveredCountryRef.current) {
                    hoveredCountryRef.current = null;
                    drawGlobe();
                }
                setTooltip(null);
            }
        }
    };

    const handleMouseOut = () => {
        if (hoveredCountryRef.current) {
            hoveredCountryRef.current = null;
            drawGlobe();
        }
        setTooltip(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseout', handleMouseOut);

    d3.json<WorldAtlas>('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
      .then(world => {
        if (world) {
          countries = (topojson.feature(world, world.objects.countries) as unknown as FeatureCollection).features as Country[];
          startRotation();
        }
      });
      
    return () => {
      rotationTimer?.stop();
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseout', handleMouseOut);
      d3.select(canvas).on('.drag', null);
    };
  }, []);

  return (
    <div className="w-full h-full relative cursor-move">
      <canvas ref={canvasRef} className="w-full h-full" />
      {tooltip && (
        <div
          className="absolute bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-lg pointer-events-none transition-transform transform -translate-y-full"
          style={{ left: tooltip.x + 15, top: tooltip.y }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
};

export default Globe;