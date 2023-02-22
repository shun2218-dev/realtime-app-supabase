import { useQueryNotices } from '@/hooks/useQueryNotices'
import { useSubscribeNotices } from '@/hooks/useSubscribeNotices'
import React, { FC } from 'react'
import { NoticeForm } from './NoticeForm'
import { NoticeItem } from './NoticeItem'

export const Notification: FC = () => {
  const { data: notices } = useQueryNotices()
  useSubscribeNotices()
  return (
    <>
      <p className="mb-4 text-center">Notification</p>
      <NoticeForm />
      <ul data-testid="ul-notice" className="my-5">
        {notices &&
          notices.map(({ id, content, user_id }) => (
            <NoticeItem key={id} id={id} content={content} user_id={user_id} />
          ))}
      </ul>
    </>
  )
}
