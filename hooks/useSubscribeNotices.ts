import React, { useEffect } from 'react'
import { Notice } from '@/types'
import { supabase } from '@/utils/supabase'
import {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js'
import { useQueryClient } from 'react-query'

export const useSubscribeNotices = () => {
  const queryClient = useQueryClient()

  const handleRecordInserted = (
    payload: RealtimePostgresInsertPayload<Notice>
  ) => {
    let previousNotices = queryClient.getQueryData<Notice[]>(['notices'])
    if (!previousNotices) previousNotices = []
    const newNotice = payload.new
    queryClient.setQueryData(
      ['notices'],
      [...previousNotices, { ...newNotice }]
    )
  }

  const handleRecordUpdated = (
    payload: RealtimePostgresUpdatePayload<Notice>
  ) => {
    let previousNotices = queryClient.getQueryData<Notice[]>(['notices'])
    if (!previousNotices) previousNotices = []
    const newNotice = payload.new
    queryClient.setQueryData(
      ['notices'],
      previousNotices.map((notice) =>
        notice.id === newNotice.id ? { ...newNotice } : notice
      )
    )
  }

  const handleRecordDeleted = (
    payload: RealtimePostgresDeletePayload<Notice>
  ) => {
    let previousNotices = queryClient.getQueryData<Notice[]>(['notices'])
    if (!previousNotices) previousNotices = []
    const oldNotice = payload.old
    queryClient.setQueryData(
      ['notices'],
      previousNotices.filter((notice) => notice.id !== oldNotice.id)
    )
  }
  useEffect(() => {
    const channel = supabase.channel('notice')

    channel
      .on(
        // Subscribe for when the INSERT event occurs
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notices' },
        handleRecordInserted
      )
      .on(
        // Subscribe for when the UPDATE event occurs
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notices' },
        handleRecordUpdated
      )
      .on(
        // Subscribe for when the DELETE event occurs
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'notices' },
        handleRecordDeleted
      )
      .subscribe()

    const removeSubscription = async () => {
      try {
        const result = await supabase.removeChannel(channel)
        switch (result) {
          case 'error':
            throw new Error('Failed to remove notice channel by error')
          case 'ok':
            console.log('Successfully remove notice channel')
            return
          case 'timed out':
            throw new Error('Failed to remove notice channel by timed out')
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
