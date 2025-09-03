import { useState } from 'react'
import ThreadTable from '../features/forum/components/ThreadTable'
import SidebarNewPosts from '../features/forum/components/Sidebar'
import TabBar from '../features/forum/components/TabBar'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function HomePage() {
  const tabs = ['Latest Posts', 'Latest Threads', 'Hottest Threads', 'Most Reacted Threads', 'Most Viewed Threads', 'Most Popular Forums']
  const [tab, setTab] = useState(tabs[0])
  const { user } = useAuth()

  return (
    <div className="container section relative">
      {/* Header med knapp */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Forum Discussions</h1>
        {user && (
          <Link
            to="/new-thread"
            className="btn btn-primary text-sm py-1 px-3"
          >
            + New Thread
          </Link>
        )}
      </div>

      {/* "Join the Discussion"-kortet med absolut positionering */}
      {!user && (
        <div className="absolute top-20 right-6 z-10 w-80">
          <div className="panel">
            <div className="panel-head">
              <h3 className="font-semibold">Join the Discussion</h3>
            </div>
            <div className="panel-pad">
              <p className="text-sm text-[var(--muted)] mb-3">
                Log in to create new threads and participate in discussions.
              </p>
              <Link 
                to="/signin" 
                className="btn btn-primary text-sm py-1 px-3"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Vanlig layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
        {/* Vänsterkolumn */}
        <div className="space-y-4">
          <div className="panel">
            <div className="panel-head">
              <TabBar tabs={tabs} value={tab} onChange={setTab} />
            </div>
            <div className="panel-pad">
              <ThreadTable />
            </div>
          </div>
          
          <div className="panel panel-pad">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Front Row</h2>
              <div className="text-[12px] text-[var(--muted)]">Threads 11.9K • Messages 315.4K</div>
            </div>
            <div className="mt-3">
              <Link to="/" className="link text-[15px]">Designers and Collections</Link>
            </div>
          </div>
        </div>

        {/* Högerkolumn - endast sidebar */}
        <div className="space-y-4">
          <SidebarNewPosts />
        </div>
      </div>
    </div>
  )
}