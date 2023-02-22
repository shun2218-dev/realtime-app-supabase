import React, { FC, ReactNode } from 'react'
import Head from 'next/head'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ children, title = 'Realtime App' }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <footer className="flex h-12 w-full items-center justify-center border-t">
        <CheckBadgeIcon className="h6 w-6 text-blue-500" />
      </footer>
    </div>
  )
}
