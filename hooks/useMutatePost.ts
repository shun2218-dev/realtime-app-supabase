import { useStore } from '@/store'
import { EditedPost, Post } from '@/types'
import { supabase } from '@/utils/supabase'
import React from 'react'
import { useMutation } from 'react-query'

export const useMutatePost = () => {
  const reset = useStore((state) => state.resetEditedPost)
  const createPostMutation = useMutation(
    async (post: Omit<Post, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('posts')
        .insert(post)
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

  const updatePostMutation = useMutation(
    async (post: EditedPost) => {
      const { data, error } = await supabase
        .from('posts')
        .update({ title: post.title, post_url: post.post_url })
        .eq('id', post.id)
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

  const deletePostMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .select('*')
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

  return { createPostMutation, updatePostMutation, deletePostMutation }
}
