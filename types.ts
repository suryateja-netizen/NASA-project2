
import type { Feature, Geometry } from 'geojson';

// A GeoJSON feature with a properties object that includes the country name
export interface Country extends Feature<Geometry, { name: string }> {}

// The structure of the TopoJSON file we'll fetch
export interface WorldAtlas {
  objects: {
    countries: {
      type: 'GeometryCollection';
      geometries: Array<{
        type: 'Polygon' | 'MultiPolygon';
        id: string;
        properties: {
          name: string;
        };
        arcs: number[][][] | number[][][][];
      }>;
    };
  };
  arcs: Array<[number, number][]>;
  transform: any;
  bbox: [number, number, number, number];
}
