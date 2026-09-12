import { z } from "zod";

export const VertexSchema = z.object({ x: z.number(), y: z.number() });

export const LinedefSchema = z.object({
  v1: z.number(),
  v2: z.number(),
  flags: z.number(),
  special: z.number(),
  tag: z.number(),
  side: z.tuple([z.number(), z.number()]),
});

export const ThingSchema = z.object({
  x: z.number(),
  y: z.number(),
  angle: z.number(),
  type: z.number(),
  flags: z.number(),
});

export const MapDataSchema = z.object({
  name: z.string(),
  vertices: z.array(VertexSchema),
  linedefs: z.array(LinedefSchema),
  things: z.array(ThingSchema),
  bounds: z.object({
    minX: z.number(),
    minY: z.number(),
    maxX: z.number(),
    maxY: z.number(),
  }),
});

export type MapData = z.infer<typeof MapDataSchema>;
