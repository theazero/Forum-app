import { useState } from 'react'
import ThreadTable from '../features/forum/components/ThreadTable'
import SidebarNewPosts from '../features/forum/components/Sidebar'
import TabBar from '../features/forum/components/TabBar'
import { Link } from 'react-router-dom'



export default function HomePage() {
  const tabs = ['Latest Posts', 'Latest Threads', 'Hottest Threads', 'Most Reacted Threads', 'Most Viewed Threads', 'Most Popular Forums']
  const [tab, setTab] = useState(tabs[0])

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
      <div className="space-y-4">
        <div className="panel">
          <TabBar tabs={tabs} value={tab} onChange={setTab} />
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

      <div className="space-y-4">
        <SidebarNewPosts />
      </div>
    </section>
  )
}
