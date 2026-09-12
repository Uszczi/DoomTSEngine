export interface LumpEntry {
  offset: number;
  size: number;
}

interface Lump extends LumpEntry {
  name: string;
}

const MAP_NAME_RE = /^(MAP[0-3][0-9]|E[1-4]M[1-9])$/;

function isMapName(name: string): boolean {
  return MAP_NAME_RE.test(name);
}

export class Wad {
  private buffer: ArrayBuffer;
  private view: DataView;
  private lumps: Lump[] = [];
  private lumpIndex = new Map<string, LumpEntry>();
  readonly type: string;
  readonly numLumps: number;

  constructor(buffer: ArrayBuffer) {
    this.buffer = buffer;
    this.view = new DataView(buffer);
    this.type = this.readMagic();
    this.numLumps = this.view.getUint32(4, true);
    const dirOffset = this.view.getUint32(8, true);
    this.buildIndex(dirOffset);
  }

  private readMagic(): string {
    return String.fromCharCode(
      this.view.getUint8(0),
      this.view.getUint8(1),
      this.view.getUint8(2),
      this.view.getUint8(3),
    );
  }

  private buildIndex(dirOffset: number): void {
    for (let i = 0; i < this.numLumps; i++) {
      const off = dirOffset + i * 16;
      const lumpOffset = this.view.getUint32(off, true);
      const size = this.view.getUint32(off + 4, true);
      const name = String.fromCharCode(
        this.view.getUint8(off + 8),
        this.view.getUint8(off + 9),
        this.view.getUint8(off + 10),
        this.view.getUint8(off + 11),
        this.view.getUint8(off + 12),
        this.view.getUint8(off + 13),
        this.view.getUint8(off + 14),
        this.view.getUint8(off + 15),
      ).replace(/\0.*$/, "");
      const entry = { offset: lumpOffset, size };
      this.lumps.push({ name, ...entry });
      this.lumpIndex.set(name, entry);
    }
  }

  has(name: string): boolean {
    return this.lumpIndex.has(name);
  }

  lump(name: string): LumpEntry | undefined {
    return this.lumpIndex.get(name);
  }

  readLump(name: string): Uint8Array {
    const entry = this.lumpIndex.get(name);
    if (!entry) throw new Error(`Lump not found: ${name}`);
    return new Uint8Array(this.buffer, entry.offset, entry.size);
  }

  mapNames(): string[] {
    return [...this.lumpIndex.keys()].filter(isMapName);
  }

  private mapLumps(mapName: string): Lump[] {
    const mapIndex = this.lumps.findIndex((l) => l.name === mapName);
    if (mapIndex === -1) throw new Error(`Map not found: ${mapName}`);
    const out: Lump[] = [];
    for (let i = mapIndex + 1; i < this.lumps.length; i++) {
      const lump = this.lumps[i];
      if (isMapName(lump.name)) break;
      out.push(lump);
    }
    return out;
  }

  hasMapLump(mapName: string, lumpName: string): boolean {
    return this.mapLumps(mapName).some((l) => l.name === lumpName);
  }

  readMapLump(mapName: string, lumpName: string): Uint8Array {
    const lump = this.mapLumps(mapName).find((l) => l.name === lumpName);
    if (!lump) throw new Error(`Lump not found: ${lumpName}`);
    return new Uint8Array(this.buffer, lump.offset, lump.size);
  }
}
