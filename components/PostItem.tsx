import React, { FC, memo, useState } from 'react'
import Image from 'next/image'
import { useDownloadUrl } from '@/hooks/useDownloadUrl'
import { useMutatePost } from '@/hooks/useMutatePost'
import { useQueryAvatar } from '@/hooks/useQueryAvatar'
import { useStore } from '@/store'
import { Post } from '@/types'
import {
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'
import { Spinner } from './Spinner'
import { Comments } from './Comments'
import { Asynchronous } from './Asynchronous'

const PostItemMemo: FC<Omit<Post, 'created_at'>> = ({
  id,
  title,
  post_url,
  user_id,
}) => {
  const [openComments, setOpenComments] = useState(false)
  const session = useStore((state) => state.session)
  const update = useStore((state) => state.updateEditedPost)
  const { data } = useQueryAvatar(user_id)
  const { deletePostMutation } = useMutatePost()
  const { fullUrl: avatarUrl, isLoading: isLoadingAvatar } = useDownloadUrl(
    data?.avatar_url,
    'avatars'
  )
  const { fullUrl: postUrl, isLoading: isLoadingPost } = useDownloadUrl(
    post_url,
    'posts'
  )

  return (
    <>
      <li className="w-80">
        <div className="my-3 w-full border border-dashed border-gray-400" />
        <div className="flex item-center justify-between">
          <div className="flex">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar"
                className="rounded-full"
                width={25}
                height={25}
              />
            ) : (
              <UserCircleIcon className="inline-block h-8 w-8 cursor-pointer text-gray-500" />
            )}
            <span className="ml-2 font-bold">{title}</span>
          </div>

          {session?.user.id === user_id && (
            <div className="flex pr-4">
              <PencilSquareIcon
                data-testid="pencil-post"
                className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
                onClick={() => {
                  update({
                    id,
                    title,
                    post_url,
                  })
                }}
              />
              <TrashIcon
                data-testid="trash-post"
                className="h-5 w-5 cursor-pointer text-blue-500"
                onClick={() => {
                  deletePostMutation.mutate(id)
                }}
              />
            </div>
          )}
        </div>
        <div className="my-3 flex justify-center">
          {postUrl && (
            <Image
              src={postUrl}
              alt="Image"
              className="rounded-lg"
              width={300}
              height={220}
            />
          )}
        </div>
        <div className="my-3 flex justify-center">
          {(isLoadingAvatar || isLoadingPost) && <Spinner />}
        </div>
        <ChatBubbleLeftRightIcon
          data-testid="open-comments"
          className="ml-2 h-6 w-6 cursor-pointer text-blue-500"
          onClick={() => setOpenComments(!openComments)}
        />
        {openComments && (
          <Asynchronous>
            <div className="flex justify-center">
              <Comments postId={id} />
            </div>
          </Asynchronous>
        )}
      </li>
    </>
  )
}

export const PostItem = memo(PostItemMemo)
