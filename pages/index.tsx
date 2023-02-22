import { Auth } from '@/components/Auth'
import { DashBoard } from '@/components/DashBoard'
import { Layout } from '@/components/Layout'
import { useStore } from '@/store'
import { supabase } from '@/utils/supabase'
import type { NextPage } from 'next'
import React, { useCallback, useEffect } from 'react'

const Home: NextPage = () => {
  const session = useStore((state) => state.session)
  const _setSession = useStore((state) => state.setSession)
  const setSession = useCallback(async () => {
    const { data } = await supabase.auth.getSession()
    _setSession(data.session)
  }, [_setSession])

  useEffect(() => {
    setSession()
    supabase.auth.onAuthStateChange((_event, session) => {
      _setSession(session)
    })
  }, [_setSession])
  return (
    <Layout title="Dashboard">{!session ? <Auth /> : <DashBoard />}</Layout>
  )
}

export default Home
