import React, { FC } from 'react'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import { supabase } from '@/utils/supabase'
import { UserProfile } from './UserProfile'
import { useQueryClient } from 'react-query'
import { useStore } from '@/store'
import { Notification } from './Notification'
import { Feed } from './Feed'
import { Asynchronous } from './Asynchronous'

export const DashBoard: FC = () => {
  const queryClient = useQueryClient()
  const resetPost = useStore((state) => state.resetEditedPost)
  const resetProfile = useStore((state) => state.resetEditedProfile)
  const resetNotice = useStore((state) => state.resetEditedNotice)
  const signOut = () => {
    resetPost()
    resetProfile()
    resetNotice()
    supabase.auth.signOut()
    queryClient.removeQueries(['posts'])
    queryClient.removeQueries(['profile'])
    queryClient.removeQueries(['notices'])
  }

  return (
    <>
      <ArrowLeftOnRectangleIcon
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      {/* UserProfile */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <Asynchronous>
            <UserProfile />
          </Asynchronous>
        </div>

        {/* Feed */}
        <div className="flex w-96 flex-col items-center">
          <Asynchronous>
            <Feed />
          </Asynchronous>
        </div>

        {/* Notification */}
        <div className="flex flex-col items-center">
          <Asynchronous>
            <Notification />
          </Asynchronous>
        </div>
      </div>
    </>
  )
}
