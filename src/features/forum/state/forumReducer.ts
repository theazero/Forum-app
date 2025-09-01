import type { ForumState, Thread, Comment, User } from '../types'

export type ForumAction =
  | { type: 'ADD_THREAD'; thread: Thread }
  | { type: 'ADD_COMMENT'; comment: Comment }
  | { type: 'LOCK_THREAD'; threadId: number }
  | { type: 'SET_USER'; userId?: number }
  | { type: 'REGISTER'; user: User }
  | { type: 'MARK_QNA_ANSWER'; threadId: number; commentId: number }

export function forumReducer(state: ForumState, action: ForumAction): ForumState {
  switch (action.type) {
    case 'ADD_THREAD':
      return { ...state, threads: [action.thread, ...state.threads] }
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.comment] }
    case 'LOCK_THREAD':
      return { ...state, threads: state.threads.map(t => t.id === action.threadId ? { ...t, locked: true } : t) }
    case 'SET_USER':
      return { ...state, currentUserId: action.userId }
    case 'REGISTER':
      return { ...state, users: [...state.users, action.user], currentUserId: action.user.id }
    case 'MARK_QNA_ANSWER':
      return {
        ...state,
        threads: state.threads.map(t => {
          if (t.id !== action.threadId || t.category !== 'QNA') return t
          return { ...t, isAnswered: true, commentAnswerId: action.commentId }
        })
      }
    default:
      return state
  }
}
