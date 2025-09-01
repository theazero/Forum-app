import type { Thread } from '../types'
import { useForum } from '../state/ForumProvider'

export default function ThreadDetail({ thread }: { thread: Thread }) {
  const { state } = useForum()
  const author = state.users.find(u => u.id === thread.creatorId)
  return (
    <article className="bg-white border border-line rounded-xl p-6 md:p-8">
      <h1 className="h-title mb-2">{thread.title}</h1>
      <div className="meta mb-6 flex items-center gap-4">
        <span>{new Date(thread.creationDate).toLocaleString()}</span>
        <span>by {author?.userName}</span>
        {thread.locked && <span className="badge badge-lock">Locked</span>}
      </div>
      <div className="whitespace-pre-wrap text-[15px] leading-7">{thread.description}</div>
    </article>
  )
}
