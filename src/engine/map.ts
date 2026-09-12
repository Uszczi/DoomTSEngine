import { Wad } from "./wad";

export interface Vertex {
  x: number;
  y: number;
}

export interface Linedef {
  v1: number;
  v2: number;
  flags: number;
  special: number;
  tag: number;
  side: [number, number];
}

export interface Thing {
  x: number;
  y: number;
  angle: number;
  type: number;
  flags: number;
}

export interface MapData {
  name: string;
  vertices: Vertex[];
  linedefs: Linedef[];
  things: Thing[];
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
}

export function parseMap(wad: Wad, mapName: string): MapData {
  if (!wad.has(mapName)) throw new Error(`Map not found: ${mapName}`);

  let vertices: Vertex[] = [];
  if (wad.hasMapLump(mapName, "VERTEXES")) {
    vertices = parseVertices(wad.readMapLump(mapName, "VERTEXES"));
  }

  let linedefs: Linedef[] = [];
  if (wad.hasMapLump(mapName, "LINEDEFS")) {
    linedefs = parseLinedefs(wad.readMapLump(mapName, "LINEDEFS"));
  }

  let things: Thing[] = [];
  if (wad.hasMapLump(mapName, "THINGS")) {
    things = parseThings(wad.readMapLump(mapName, "THINGS"));
  }

  const bounds = vertices.reduce(
    (b, v) => ({
      minX: Math.min(b.minX, v.x),
      minY: Math.min(b.minY, v.y),
      maxX: Math.max(b.maxX, v.x),
      maxY: Math.max(b.maxY, v.y),
    }),
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity },
  );

  return { name: mapName, vertices, linedefs, things, bounds };
}

function parseVertices(lump: Uint8Array): Vertex[] {
  const view = new DataView(lump.buffer, lump.byteOffset, lump.byteLength);
  const out: Vertex[] = [];
  for (let i = 0; i < lump.length; i += 4) {
    out.push({ x: view.getInt16(i, true), y: view.getInt16(i + 2, true) });
  }
  return out;
}

function parseLinedefs(lump: Uint8Array): Linedef[] {
  const view = new DataView(lump.buffer, lump.byteOffset, lump.byteLength);
  const out: Linedef[] = [];
  for (let i = 0; i < lump.length; i += 14) {
    out.push({
      v1: view.getUint16(i, true),
      v2: view.getUint16(i + 2, true),
      flags: view.getUint16(i + 4, true),
      special: view.getUint16(i + 6, true),
      tag: view.getUint16(i + 8, true),
      side: [view.getUint16(i + 10, true), view.getUint16(i + 12, true)],
    });
  }
  return out;
}

function parseThings(lump: Uint8Array): Thing[] {
  const view = new DataView(lump.buffer, lump.byteOffset, lump.byteLength);
  const out: Thing[] = [];
  for (let i = 0; i < lump.length; i += 10) {
    out.push({
      x: view.getInt16(i, true),
      y: view.getInt16(i + 2, true),
      angle: view.getUint16(i + 4, true),
      type: view.getUint16(i + 6, true),
      flags: view.getUint16(i + 8, true),
    });
  }
  return out;
}
