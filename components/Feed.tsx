import { useQueryPosts } from '@/hooks/useQueryPosts'
import { useSubscribePosts } from '@/hooks/useSubscribePosts'
import React, { FC } from 'react'
import { PostForm } from './PostForm'
import { PostItem } from './PostItem'

export const Feed: FC = () => {
  const { data: posts } = useQueryPosts()
  useSubscribePosts()
  return (
    <>
      <p className="mb-4 text-center">Feed</p>
      <PostForm />
      <ul data-testid="ul-post" className="my-5">
        {posts?.map(({ id, title, post_url, user_id }) => (
          <PostItem
            key={id}
            id={id}
            title={title}
            post_url={post_url}
            user_id={user_id}
          />
        ))}
      </ul>
    </>
  )
}
