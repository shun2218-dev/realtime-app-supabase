import { useStore } from '@/store'
import { Comment, EditedComment } from '@/types'
import { supabase } from '@/utils/supabase'
import React from 'react'
import { useMutation } from 'react-query'

export const useMutateComment = () => {
  const reset = useStore((state) => state.resetEditedComment)
  const createCommentMutation = useMutation(
    async (comment: Omit<Comment, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('comments')
        .insert(comment)
        .select('*')
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  const updateCommentMutation = useMutation(
    async (comment: EditedComment) => {
      const { data, error } = await supabase
        .from('comments')
        .update({ comment: comment.comment })
        .eq('id', comment.id)
        .select('*')
      if (error) throw new Error(error.message)
      return data
    },

    {
      onSuccess: () => {
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const deleteCommentMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)
        .select('*')
      if (error) throw new Error(error.message)
      return data
    },

    {
      onSuccess: () => {
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return { createCommentMutation, updateCommentMutation, deleteCommentMutation }
}
