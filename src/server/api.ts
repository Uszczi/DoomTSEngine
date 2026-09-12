import { Hono } from "hono";
import {
  describeRoute,
  openAPIRouteHandler,
  resolver,
  validator,
} from "hono-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { z } from "zod";

import { Wad } from "../engine/wad";
import { parseMap } from "../engine/map";
import { MapDataSchema } from "./schemas";

const wad = new Wad(await Bun.file("./10sector.wad").arrayBuffer());

const app = new Hono();

app.get(
  "/api/maps",
  describeRoute({
    description: "List all map names",
    responses: {
      200: {
        description: "Map names",
        content: {
          "application/json": { schema: resolver(z.array(z.string())) },
        },
      },
    },
  }),
  (c) => c.json(wad.mapNames()),
);

app.get(
  "/api/map/:name",
  describeRoute({
    description: "Parse a map by name",
    responses: {
      200: {
        description: "Parsed map data",
        content: { "application/json": { schema: resolver(MapDataSchema) } },
      },
      404: { description: "Map not found" },
    },
  }),
  validator("param", z.object({ name: z.string() })),
  (c) => {
    const { name } = c.req.valid("param");
    try {
      return c.json(parseMap(wad, name));
    } catch (e) {
      return c.text((e as Error).message, 404);
    }
  },
);

app.get(
  "/doc",
  openAPIRouteHandler(app, {
    documentation: { info: { title: "DoomTS API", version: "1.0.0" } },
  }),
);

app.get("/docs", swaggerUI({ url: "/doc" }));

app.notFound((c) => c.text("Not found", 404));

export default app;
