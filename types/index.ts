type Post = {
  id: string
  created_at: string
  user_id: string | undefined
  title: string
  post_url: string
}

type EditedPost = {
  id: string
  title: string
  post_url: string
}

type Comment = {
  id: string
  created_at: string
  user_id: string | undefined
  post_id: string
  comment: string
}

type EditedComment = {
  id: string
  comment: string
}

type Profile = {
  id: string | undefined
  updated_at: string
  created_at: string
  username: string | undefined
  avatar_url: string | undefined
  favorites: string | undefined
}

type EditedProfile = {
  username: string | undefined
  avatar_url: string | undefined
  favorites: string | undefined
}

type Notice = {
  id: string
  created_at: string
  user_id: string
  content: string
}

type EditedNotice = {
  id: string
  content: string
}

export type {
  Post,
  EditedPost,
  Comment,
  EditedComment,
  Profile,
  EditedProfile,
  Notice,
  EditedNotice,
}
