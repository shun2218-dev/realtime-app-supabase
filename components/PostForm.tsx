import { useDownloadUrl } from '@/hooks/useDownloadUrl'
import { useMutatePost } from '@/hooks/useMutatePost'
import { useUploadPostImg } from '@/hooks/useUploadPostImg'
import { useStore } from '@/store'
import Image from 'next/image'
import React, { FC, FormEvent, memo, useMemo } from 'react'
import { Spinner } from './Spinner'
import { CameraIcon } from '@heroicons/react/24/solid'

const PostFormMemo: FC = () => {
  const session = useStore((state) => state.session)
  const editedPost = useStore((state) => state.editedPost)
  const update = useStore((state) => state.updateEditedPost)
  const { createPostMutation, updatePostMutation } = useMutatePost()
  const { useMutateUploadPostImg } = useUploadPostImg()
  const { fullUrl: postUrl, setFullUrl } = useDownloadUrl(
    editedPost.post_url,
    'posts'
  )
  const isDisabled = useMemo(
    () => useMutateUploadPostImg.isLoading || !editedPost.title,
    [useMutateUploadPostImg.isLoading, editedPost.title]
  )

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedPost.id === '') {
      await createPostMutation.mutateAsync({
        user_id: session?.user.id,
        title: editedPost.title,
        post_url: editedPost.post_url,
      })
      setFullUrl('')
    } else {
      await updatePostMutation.mutateAsync({
        id: editedPost.id,
        title: editedPost.title,
        post_url: editedPost.post_url,
      })
      setFullUrl('')
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="my-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        placeholder="New post ?"
        value={editedPost.title}
        onChange={(e) => update({ ...editedPost, title: e.target.value })}
      />
      <div className="my-3 flex justify-center">
        <button
          type="submit"
          className={`rounded ${
            isDisabled ? 'bg-gray-300' : 'bg-indigo-600'
          } px-3 py-2 text-sm text-white`}
          disabled={isDisabled}
          data-testid="btn-post"
        >
          {editedPost.id ? 'Update' : 'Create'}
        </button>
      </div>
      <div className="flex justify-center">
        {postUrl && (
          <Image
            src={postUrl}
            alt="Image"
            className="rounded"
            width={150}
            height={150}
          />
        )}
      </div>
      <div className="flex justify-center">
        {useMutateUploadPostImg.isLoading && <Spinner />}
      </div>
      <div className="flex justify-center">
        <label htmlFor="post">
          <CameraIcon className="mt-2 h-7 w-7 cursor-pointer text-gray-500" />
        </label>
        <input
          type="file"
          className="hidden"
          id="post"
          accept="image/*"
          onChange={async (e) => {
            await useMutateUploadPostImg.mutateAsync(e)
            e.target.value = ''
          }}
        />
      </div>
    </form>
  )
}

export const PostForm = memo(PostFormMemo)
