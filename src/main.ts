import { Wad } from "./engine/wad";
import { parseMap } from "./engine/map";

for (const file of ["./DOOM.WAD", "./DOOM64.WAD", "./10sector.wad"]) {
  const wad = new Wad(await Bun.file(file).arrayBuffer());
  // console.log(wad.mapNames());

  const names = wad.mapNames();
  const name = names[Math.floor(Math.random() * names.length)];

  const map = parseMap(wad, name);
  console.log(`map.name = ${map.name}`);
  console.log(`map.vertices.length = ${map.vertices.length}`);
  console.log(`map.things.length = ${map.things.length}`);
  console.log(`map.linedefs.length = ${map.linedefs.length}`);

  console.log(map.linedefs);
  console.log();
}

export {};
