import { getCollection } from "astro:content"
import { sort } from 'fast-sort'

export async function getStoryPaths() {
  const stories = await getCollection('story')
  const sortedStories = sort(stories).asc(story => story.slug)
  return stories?.map((story, index) => {
    const slug = story.slug.split('_')[1]
    const id = story.id
    const title = story.data.title
    const nextStory = sortedStories[index + 1]

    let nextUrl = '/'
    let nextPageTitle = 'The End'
    if (nextStory && index < sortedStories.length - 1) {
      nextUrl = nextStory.slug.split('_')[1]
      nextPageTitle = nextStory.data.title
    }

    return { params: { slug, id }, props: { story, title, nextUrl, nextPageTitle } }
  })
}

