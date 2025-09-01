import { useState } from 'react'
import { useForum } from '../state/ForumProvider'
import { uid } from '../../../lib/uid'

export default function CommentForm({ threadId, disabled }: { threadId: number; disabled?: boolean }) {
  const { state, addComment } = useForum()
  const [content, setContent] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (disabled || content.trim().length < 1) return
    addComment({
      id: uid(),
      threadId,
      content,
      creatorId: state.currentUserId ?? state.users[0].id,
      createdAt: new Date().toISOString()
    })
    setContent('')
  }

  return (
    <form onSubmit={submit} className="bg-white border border-line rounded-xl p-6 space-y-3">
      <textarea rows={4} value={content} onChange={e=>setContent(e.target.value)}
        disabled={disabled}
        placeholder={disabled ? 'Thread is locked.' : 'Write a comment…'}
        className="w-full border border-line rounded-lg px-4 py-3 bg-white" />
      <button className="btn" disabled={disabled} type="submit">Post Comment</button>
    </form>
  )
}
