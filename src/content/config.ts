import { z, defineCollection } from "astro:content"

const story = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  })
})

export const collections = {
  'story': story,
}