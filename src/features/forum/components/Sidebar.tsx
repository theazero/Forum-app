import { Link } from 'react-router-dom'
import { useForum } from '../state/ForumProvider'

export default function Sidebar() {
  const { state } = useForum()
  const items = state.threads.slice(0, 5)
  return (
    <aside className="sidebar-box">
      <div className="sidebar-title">New posts</div>
      <ul className="space-y-3">
        {items.map(t => (
          <li key={t.id} className="text-[13px]">
            <Link to={`/thread/${t.id}`} className="link">{t.title}</Link>
            <div className="text-[12px] text-[var(--muted)]">Latest: {new Date(t.creationDate).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
