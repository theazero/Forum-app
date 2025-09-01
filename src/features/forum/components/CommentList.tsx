import { useForum } from '../state/ForumProvider'

export default function CommentList({ threadId }: { threadId: number }) {
  const { state } = useForum()
  const comments = state.comments.filter(c => c.threadId === threadId)
  const users = state.users
  if (comments.length === 0) return <p className="text-muted">No comments yet.</p>
  return (
    <ul className="bg-white border border-line rounded-xl p-6 space-y-4">
      {comments.map(c => (
        <li key={c.id} className="border-b border-line pb-4 last:border-b-0 last:pb-0">
          <div className="text-xs text-muted mb-1">
            {users.find(u => u.id === c.creatorId)?.userName} • {new Date(c.createdAt).toLocaleString()}
          </div>
          <div className="whitespace-pre-wrap text-[15px] leading-7">{c.content}</div>
        </li>
      ))}
    </ul>
  )
}
