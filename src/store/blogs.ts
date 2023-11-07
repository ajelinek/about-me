
import rss from 'rss-to-json'
//@ts-ignore
const { parse } = rss
import dayjs from 'dayjs'
import { sort } from 'fast-sort'
const paragraph = /<p[^>]*>(.*?)<\/p>/i
const imageUrl = /<img[^>]+src="([^">]+)"/i

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const rssJson = await parse('https://medium.com/feed/@shadetreeit')
  const posts: BlogPost[] = rssJson.items.map(item => {
    const firstParagraph = item.content.match(paragraph)?.[1]
    return {
      title: item.title,
      link: item.link,
      pubDate: dayjs(item.published),
      categories: item.category,
      imageUrl: item.content.match(imageUrl)?.[1],
      intro: firstParagraph.length > 300 ? firstParagraph.slice(0, 300) + '...' : firstParagraph,
      content: item.content
    }
  })

  return sort(posts).desc(post => post.pubDate)
}