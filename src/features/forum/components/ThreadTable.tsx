import { Link } from 'react-router-dom'
import { useForum } from '../state/ForumProvider'

export default function ThreadTable() {
  const { state } = useForum()

  return (
    <div className="thread-list">
      <div className="thread-head">
        <div>Thread</div>
        <div>Replies / Views</div>
        <div>Last Post</div>
      </div>

      {state.threads.map(t => (
        <div key={t.id} className="thread-row hover:bg-[#f5f6f8] transition-colors">
          <div className="space-y-1">
            <Link to={`/thread/${t.id}`} className="thread-title">{t.title}</Link>
            <div className="flex items-center gap-2">
              <span className="thread-ex">{t.description}</span>
              {t.locked && <span className="badge badge-lock">Locked</span>}
            </div>
          </div>
          <div className="thread-stat">
            <div>—</div>
            <div className="text-[var(--muted)]">—</div>
          </div>
          <div className="last-post">
            {new Date(t.creationDate).toLocaleDateString()} • by {
              state.users.find(u => u.id === t.creatorId)?.userName
            }
          </div>
        </div>
      ))}
    </div>
  )
}

