import { createContext, useContext, useMemo, useReducer } from 'react'
import { createLocalStorage } from '../../../lib/storage'
import { forumReducer, type ForumAction } from './forumReducer'
import type { ForumState, Thread, Comment, User } from '../types'

const ForumContext = createContext<{
  state: ForumState
  dispatch: React.Dispatch<ForumAction>
  addThread: (t: Thread) => void
  addComment: (c: Comment) => void
  signIn: (userId: number) => void
  signOut: () => void
  register: (u: User) => void
} | null>(null)

const INITIAL: ForumState = {
  users: [
    { id: 1, userName: 'guest', password: 'guest' },
    { id: 2, userName: 'mod', password: 'mod', isModerator: true },
  ],
  currentUserId: 1,
  threads: [
    { id: 1001, title: 'SS25 Collections – Street Style Recap', category: 'THREAD', creationDate: new Date().toISOString(), description: 'Share looks and discuss styling…', creatorId: 1 },
    { id: 1002, title: 'Who is your style icon right now?', category: 'THREAD', creationDate: new Date().toISOString(), description: 'From models to editors – inspirations welcome.', creatorId: 1 },
    { id: 1003, title: 'Forum rules & announcements', category: 'THREAD', creationDate: new Date().toISOString(), description: 'Please read before posting.', creatorId: 2, locked: true },
  ],
  comments: []
}

const store = createLocalStorage<ForumState>('forum:v1')

export function ForumProvider({ children }: { children: React.ReactNode }) {
  const persisted = store.get() ?? INITIAL
  const [state, dispatch] = useReducer(forumReducer, persisted)

  useMemo(() => { store.set(state) }, [state])

  const api = useMemo(() => ({
    addThread: (t: Thread) => dispatch({ type: 'ADD_THREAD', thread: t }),
    addComment: (c: Comment) => dispatch({ type: 'ADD_COMMENT', comment: c }),
    signIn: (userId: number) => dispatch({ type: 'SET_USER', userId }),
    signOut: () => dispatch({ type: 'SET_USER' }),
    register: (u: User) => dispatch({ type: 'REGISTER', user: u })
  }), [])

  return (
    <ForumContext.Provider value={{ state, dispatch, ...api }}>
      {children}
    </ForumContext.Provider>
  )
}

export function useForum() {
  const ctx = useContext(ForumContext)
  if (!ctx) throw new Error('useForum must be used within ForumProvider')
  return ctx
}
