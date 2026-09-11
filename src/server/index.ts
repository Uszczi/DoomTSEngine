import { Wad } from "../engine/wad";
import { parseMap } from "../engine/map";

const wad = new Wad(await Bun.file("./10sector.wad").arrayBuffer());

Bun.serve({
  port: 4322,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/maps") {
      return Response.json(wad.mapNames());
    }

    const mapMatch = url.pathname.match(/^\/api\/map\/([^/]+)$/);
    if (mapMatch) {
      try {
        return Response.json(parseMap(wad, mapMatch[1]));
      } catch (e) {
        return new Response((e as Error).message, { status: 404 });
      }
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`DoomTS server running on http://localhost:4322`);
