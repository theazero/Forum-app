import { useParams } from 'react-router-dom'
import { useForum } from '../features/forum/state/ForumProvider'
import ThreadDetail from '../features/forum/components/ThreadDetail'
import CommentList from '../features/forum/components/CommentList'
import CommentForm from '../features/forum/components/CommentForm'

export default function ThreadPage() {
  const { id } = useParams()
  const { state, dispatch } = useForum()
  const thread = state.threads.find(t => t.id === Number(id))
  if (!thread) return <p>Thread not found.</p>
  return (
    <section className="space-y-6">
      <ThreadDetail thread={thread} />
      <div className="flex items-center justify-between">
        <h2 className="h-title text-xl">Replies</h2>
        {!thread.locked && (
          <button className="btn" onClick={() => dispatch({ type: 'LOCK_THREAD', threadId: thread.id })}>
            Lock Thread
          </button>
        )}
      </div>
      <CommentList threadId={thread.id} />
      <CommentForm threadId={thread.id} disabled={thread.locked} />
    </section>
  )
}
