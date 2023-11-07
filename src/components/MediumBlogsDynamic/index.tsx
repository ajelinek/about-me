import { createSignal } from 'solid-js'
import s from './style.module.css'

type Props = {
  blogs: BlogPost[]
}
export default function MediumBlogsDynamic(props: Props) {
  const [filter, setFilter] = createSignal('')
  const filteredBlogs = () => props.blogs.filter(blog => (
    blog.title.toLowerCase().includes(filter().toLowerCase()) ||
    blog.intro?.toLowerCase().includes(filter().toLowerCase()) ||
    blog.categories.join(', ').toLowerCase().includes(filter().toLowerCase())
  ))

  return (
    <>
      <div class={s.header}>
        <h2 >Published Blogs</h2>
        <input class={s.search} type="search" placeholder="filter" value={filter()} onInput={(e) => setFilter(e.currentTarget.value)} />
      </div>
      {
        filteredBlogs().map(post => <Post post={post} />)
      }
    </>
  )
}

function Post(props: { post: BlogPost }) {
  const post = props.post
  const categoriesList = props.post.categories.join(', ')

  return (
    <div class={s.postContainer}>
      <div class={s.post}>
        <div class={s.imageContainer}>
          <img
            class={s.url}
            src={post.imageUrl}
            alt={post.title}
          />
        </div>

        <div class={s.info}>
          <a href={post.link}>
            <h5 class={s.title}>{post.title}</h5>
          </a>

          {/* <p class={s.pubDate}>{post.pubDate?.format('MMMM DD, YYYY')}</p> */}
          <p class={s.content}>{post.intro}</p>
          <label class={s.categoryLabel}>Categories:</label> {categoriesList}
        </div>
      </div>
    </div>
  )
}