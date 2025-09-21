import dayjs from 'dayjs'
import { sort } from 'fast-sort'

const paragraph = /<p[^>]*>(.*?)<\/p>/i
const imageUrl = /<img[^>]+src="([^">]+)"/i

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // Try multiple RSS proxy services
    const rssUrls = [
      'https://rss2json.com/api.json?rss_url=https://medium.com/feed/@shadetreeit',
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@shadetreeit',
      'https://medium.com/feed/@shadetreeit',
    ]

    let rssData = null
    let lastError = null

    for (const url of rssUrls) {
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
            Accept: 'application/rss+xml, application/xml, text/xml, */*',
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.items || data.feed) {
            rssData = data
            break
          }
        }
      } catch (error) {
        lastError = error
        continue
      }
    }

    if (!rssData) {
      throw lastError || new Error('All RSS sources failed')
    }

    const items = rssData.items || rssData.feed?.items || []
    const posts: BlogPost[] = items.map((item: any) => {
      const firstParagraph = item.content?.match(paragraph)?.[1] || item.description?.match(paragraph)?.[1] || ''
      return {
        title: item.title,
        link: item.link,
        pubDate: dayjs(item.pubDate || item.published),
        categories: item.categories || item.category || [],
        imageUrl: item.content?.match(imageUrl)?.[1] || item.thumbnail,
        intro: firstParagraph.length > 300 ? firstParagraph.slice(0, 300) + '...' : firstParagraph,
        content: item.content || item.description,
      }
    })

    return sort(posts).desc(post => post.pubDate)
  } catch (error) {
    console.warn('Failed to fetch Medium blog posts:', error)
    return []
  }
}
