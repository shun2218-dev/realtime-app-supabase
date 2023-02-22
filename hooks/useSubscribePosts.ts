import React, { useEffect } from 'react'
import { Post } from '@/types'
import { supabase } from '@/utils/supabase'
import {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js'
import { useQueryClient } from 'react-query'

export const useSubscribePosts = () => {
  const queryClient = useQueryClient()

  const handleRecordInserted = (
    payload: RealtimePostgresInsertPayload<Post>
  ) => {
    let previousPosts = queryClient.getQueryData<Post[]>(['posts'])
    if (!previousPosts) previousPosts = []
    const newPost = payload.new
    queryClient.setQueryData(['posts'], [...previousPosts, { ...newPost }])
  }

  const handleRecordUpdated = (
    payload: RealtimePostgresUpdatePayload<Post>
  ) => {
    let previousPosts = queryClient.getQueryData<Post[]>(['posts'])
    if (!previousPosts) previousPosts = []
    const newPost = payload.new
    queryClient.setQueryData(
      ['posts'],
      previousPosts.map((post) =>
        post.id === newPost.id ? { ...newPost } : post
      )
    )
  }

  const handleRecordDeleted = (
    payload: RealtimePostgresDeletePayload<Post>
  ) => {
    let previousPosts = queryClient.getQueryData<Post[]>(['posts'])
    if (!previousPosts) previousPosts = []
    const oldPost = payload.old
    queryClient.setQueryData(
      ['posts'],
      previousPosts.filter((post) => post.id !== oldPost.id)
    )
  }

  useEffect(() => {
    const channel = supabase.channel('post')

    channel
      .on(
        // Subscribe for when the INSERT event occurs
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        handleRecordInserted
      )
      .on(
        // Subscribe for when the UPDATE event occurs
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'posts' },
        handleRecordUpdated
      )
      .on(
        // Subscribe for when the DELETE event occurs
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'posts' },
        handleRecordDeleted
      )
      .subscribe()

    const removeSubscription = async () => {
      try {
        const result = await supabase.removeChannel(channel)
        switch (result) {
          case 'error':
            throw new Error('Failed to remove post channel by error')
          case 'ok':
            console.log('Successfully remove post channel')
            return
          case 'timed out':
            throw new Error('Failed to remove post channel by timed out')
        }
      } catch (err: any) {
        console.error(err.message)
      }
    }

    return () => {
      removeSubscription()
    }
  }, [queryClient])
}
