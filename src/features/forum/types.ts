export type ThreadCategory = 'THREAD' | 'QNA'

export type User = {
  id: number
  userName: string
  password: string
  isModerator?: boolean
}

export type ThreadBase = {
  id: number
  title: string
  category: ThreadCategory
  creationDate: string
  description: string
  creatorId: number
  locked?: boolean
}

export type QNAThread = ThreadBase & {
  category: 'QNA'
  isAnswered: boolean
  commentAnswerId?: number
}

export type Thread = ThreadBase | QNAThread

export type Comment = {
  id: number
  threadId: number
  content: string
  creatorId: number
  createdAt: string
}

export type ForumState = {
  users: User[]
  currentUserId?: number
  threads: Thread[]
  comments: Comment[]
}
