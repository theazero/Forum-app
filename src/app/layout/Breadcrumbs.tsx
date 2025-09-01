import { Link, useLocation } from 'react-router-dom'
import { useForum } from '../../features/forum/state/ForumProvider'

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  const { state } = useForum()

  let trail: Array<{ label: string; to?: string }> = [
    { label: 'Forums', to: '/' },
    { label: 'Fashion' }
  ]

  if (pathname.startsWith('/thread/')) {
    const id = Number(pathname.split('/').pop())
    const t = state.threads.find(x => x.id === id)
    if (t) trail = [...trail, { label: t.title }]
  } else if (pathname === '/new') {
    trail = [...trail, { label: 'New Thread' }]
  } else if (pathname === '/signin') {
    trail = [...trail, { label: 'Sign In' }]
  }

  return (
    <div className="breadcrumb">
      <div className="container">
        <span className="crumb">
          {trail.map((item, i) => (
            <span key={i}>
              {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
              {i < trail.length - 1 ? ' / ' : ''}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}
