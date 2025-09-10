import { Outlet } from 'react-router-dom'
import Header from './Header'
import Headerbar from "./Header"

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <Header />
      <Headerbar />
      <main className="container py-8 md:py-10">
        <Outlet />
      </main>
      <footer className="border-t border-line">
        <div className="container py-10 text-sm text-muted">© 2025 — forum by thea inspired by thefashionspot</div>
      </footer>
    </div>
  )
}
