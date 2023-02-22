import { Profile } from '@/types'
import { supabase } from '@/utils/supabase'
import React from 'react'
import { useQuery } from 'react-query'

export const useQueryAvatar = (userId: string | undefined) => {
  const getAvatarUrl = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', userId)
      .single()
    if (error) throw new Error(error.message)
    return data
  }
  return useQuery<Pick<Profile, 'avatar_url'>, Error>({
    queryKey: ['avatar-url', userId],
    queryFn: getAvatarUrl,
    refetchOnWindowFocus: true,
  })
}
