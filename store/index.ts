import { create } from 'zustand'
import { Session } from '@supabase/supabase-js'
import { EditedComment, EditedNotice, EditedPost, EditedProfile } from '@/types'

type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  editedProfile: EditedProfile
  updateEditedProfile: (payload: EditedProfile) => void
  resetEditedProfile: () => void
  editedNotice: EditedNotice
  updateEditedNotice: (payload: EditedNotice) => void
  resetEditedNotice: () => void
  editedPost: EditedPost
  updateEditedPost: (payload: EditedPost) => void
  resetEditedPost: () => void
  editedComment: EditedComment
  updateEditedComment: (payload: EditedComment) => void
  resetEditedComment: () => void
}

const useStore = create<State>((set) => ({
  // Session
  session: null,
  setSession: (payload) => set({ session: payload }),

  // Profile
  editedProfile: { username: '', favorites: '', avatar_url: '' },
  updateEditedProfile: ({ username, favorites, avatar_url }) =>
    set({
      editedProfile: {
        username,
        favorites,
        avatar_url,
      },
    }),
  resetEditedProfile: () =>
    set({ editedProfile: { username: '', favorites: '', avatar_url: '' } }),

  // Notice
  editedNotice: { id: '', content: '' },
  updateEditedNotice: ({ id, content }) =>
    set({
      editedNotice: { id, content },
    }),
  resetEditedNotice: () => set({ editedNotice: { id: '', content: '' } }),

  // Post
  editedPost: { id: '', title: '', post_url: '' },
  updateEditedPost: ({ id, title, post_url }) =>
    set({
      editedPost: { id, title, post_url },
    }),
  resetEditedPost: () =>
    set({ editedPost: { id: '', title: '', post_url: '' } }),

  // Comment
  editedComment: { id: '', comment: '' },
  updateEditedComment: ({ id, comment }) =>
    set({
      editedComment: { id, comment },
    }),
  resetEditedComment: () => set({ editedComment: { id: '', comment: '' } }),
}))

export { useStore }
