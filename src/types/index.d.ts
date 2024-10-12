type BlogPost = {
  title: string
  link: string
  pubDate: import('dayjs').Dayjs
  categories: string[]
  imageUrl?: string
  intro?: string
  content?: string
}
