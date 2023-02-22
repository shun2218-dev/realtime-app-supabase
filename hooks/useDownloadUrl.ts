import { supabase } from '@/utils/supabase'
import React, { useEffect, useState } from 'react'

export const useDownloadUrl = (
  filePath: string | undefined,
  key: 'avatars' | 'posts'
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fullUrl, setFullUrl] = useState('')
  const bucketName = key === 'avatars' ? 'avatars' : 'posts'

  useEffect(() => {
    if (filePath) {
      const download = async () => {
        setIsLoading(true)
        const { data, error } = await supabase.storage
          .from(bucketName)
          .download(filePath)
        if (error) throw new Error(error.message)
        setFullUrl(URL.createObjectURL(data))
        setIsLoading(false)
      }
      download()
    }
  }, [filePath, bucketName])
  return {
    isLoading,
    fullUrl,
    setFullUrl,
  }
}
