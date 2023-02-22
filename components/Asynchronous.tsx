import React, { FC, ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Spinner } from './Spinner'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

type Props = {
  children: ReactNode
}

const ErrorFallback: FC = () => {
  return <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
}

export const Asynchronous: FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </ErrorBoundary>
  )
}
