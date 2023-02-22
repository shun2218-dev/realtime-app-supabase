import React, { useEffect } from 'react'
import { Comment } from '@/types'
import { supabase } from '@/utils/supabase'
import {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js'
import { useQueryClient } from 'react-query'

export const useSubscribeComments = (postId: string) => {
  const queryClient = useQueryClient()

  const handleRecordInserted = (
    payload: RealtimePostgresInsertPayload<Comment>
  ) => {
    let previousComments = queryClient.getQueryData<Comment[]>([
      'comments',
      postId,
    ])
    if (!previousComments) previousComments = []
    const newComment = payload.new
    queryClient.setQueryData(
      ['comments', postId],
      [...previousComments, { ...newComment }]
    )
  }

  const handleRecordUpdated = (
    payload: RealtimePostgresUpdatePayload<Comment>
  ) => {
    let previousComments = queryClient.getQueryData<Comment[]>([
      'comments',
      postId,
    ])
    if (!previousComments) previousComments = []
    const newComment = payload.new
    queryClient.setQueryData(
      ['comments', postId],
      previousComments.map((comment) =>
        comment.id === newComment.id ? { ...newComment } : comment
      )
    )
  }

  const handleRecordDeleted = (
    payload: RealtimePostgresDeletePayload<Comment>
  ) => {
    let previousComments = queryClient.getQueryData<Comment[]>([
      'comments',
      postId,
    ])
    if (!previousComments) previousComments = []
    const oldComment = payload.old
    queryClient.setQueryData(
      ['comments', postId],
      previousComments.filter((comment) => comment.id !== oldComment.id)
    )
  }

  useEffect(() => {
    const channel = supabase.channel('comment')

    channel
      .on(
        // Subscribe for when the INSERT event occurs
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        handleRecordInserted
      )
      .on(
        // Subscribe for when the UPDATE event occurs
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        handleRecordUpdated
      )
      .on(
        // Subscribe for when the DELETE event occurs
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        handleRecordDeleted
      )
      .subscribe()

    const removeSubscription = async () => {
      try {
        const result = await supabase.removeChannel(channel)
        switch (result) {
          case 'error':
            throw new Error('Failed to remove comment channel by error')
          case 'ok':
            console.log('Successfully remove comment channel')
            return
          case 'timed out':
            throw new Error('Failed to remove comment channel by timed out')
        }
      } catch (err: any) {
        console.error(err.message)
      }
    }

    return () => {
      removeSubscription()
    }
  }, [queryClient, postId])
}
