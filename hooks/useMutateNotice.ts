import React from 'react'
import { useStore } from '@/store'
import { EditedNotice, Notice } from '@/types'
import { supabase } from '@/utils/supabase'
import { useMutation } from 'react-query'

export const useMutateNotice = () => {
  const reset = useStore((state) => state.resetEditedNotice)

  const createNoticeMutation = useMutation(
    async (notice: Omit<Notice, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('notices').insert(notice)
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

  const updateNoticeMutation = useMutation(
    async (notice: EditedNotice) => {
      const { data, error } = await supabase
        .from('notices')
        .update({ content: notice.content })
        .eq('id', notice.id)
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

  const deleteNoticeMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('notices')
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
  return {
    createNoticeMutation,
    updateNoticeMutation,
    deleteNoticeMutation,
  }
}
