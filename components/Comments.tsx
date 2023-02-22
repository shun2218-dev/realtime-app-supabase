import { useQueryComments } from '@/hooks/useQueryComments'
import { useSubscribeComments } from '@/hooks/useSubscribeComments'
import React, { FC, memo, useState } from 'react'
import { CommentForm } from './CommentForm'
import { CommentItem } from './CommentItem'

type Props = {
  postId: string
}

const CommentsMemo: FC<Props> = ({ postId }) => {
  const [editedComment, setEditedComment] = useState({
    id: '',
    comment: '',
  })
  const { data: comments } = useQueryComments(postId)
  useSubscribeComments(postId)
  return (
    <div className="w-60">
      <CommentForm
        postId={postId}
        editedComment={editedComment}
        setEditedComment={setEditedComment}
      />
      <ul data-testid="ul-comment" className="my-5">
        {comments?.map(({ id, comment, user_id }) => (
          <CommentItem
            key={id}
            id={id}
            comment={comment}
            user_id={user_id}
            setEditedComment={setEditedComment}
          />
        ))}
      </ul>
    </div>
  )
}

export const Comments = memo(CommentsMemo)
