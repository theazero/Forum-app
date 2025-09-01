export default function App() {
  const threads = [
    { id: 1, title: 'SS25 Collections – Street Style Recap', excerpt: 'Share your favorite looks and discuss styling…', replies: 342, views: '58K', lastPost: 'Today 16:42 • by Ana', hot: true, locked: false },
    { id: 2, title: 'Who is your style icon right now?', excerpt: 'From models to editors – inspirations welcome.', replies: 97, views: '13K', lastPost: 'Today 14:03 • by Marc', hot: false, locked: false },
    { id: 3, title: 'Forum rules & announcements', excerpt: 'Please read before posting.', replies: 0, views: '3.2K', lastPost: 'Yesterday 09:12 • by Mod', hot: false, locked: true },
  ]

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <header className="header">
        <div className="container h-16 flex items-center justify-between">
          <div className="brand">thefashionspot (mock av thea ericson)</div>
          <nav className="topnav">
            <a href="#">Forums</a>
            <a href="#">New Posts</a>
            <a href="#">Search</a>
            <a href="#" className="btn btn-primary">Sign In</a>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <span className="crumb">
            <a href="#">Forums</a> / <span>Fashion</span>
          </span>
        </div>
      </div>

      {/* Category title */}
      <section className="section">
        <div className="container space-y-6">
          <h1 className="h-title">Fashion & Street Style</h1>
          <div className="thread-list">
            {/* header row */}
            <div className="thread-row font-semibold text-[12px] text-muted">
              <div>Thread</div><div>Replies / Views</div><div>Last Post</div>
            </div>

            {threads.map(t => (
              <div key={t.id} className="thread-row">
                <div className="space-y-1">
                  <a className="thread-title" href="#">
                    {t.title}
                  </a>
                  <div className="flex items-center gap-2">
                    <span className="thread-ex">{t.excerpt}</span>
                    {t.hot && <span className="badge badge-hot">Hot</span>}
                    {t.locked && <span className="badge badge-lock">Locked</span>}
                  </div>
                </div>
                <div className="thread-stat">
                  <div>{t.replies} replies</div>
                  <div className="text-muted">{t.views} views</div>
                </div>
                <div className="last-post">{t.lastPost}</div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn">« Prev</button>
            <button className="page-btn">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">Next »</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="container py-10 text-sm text-muted">© 2025 — forum mock inspired by thefashionspot</div>
      </footer>
    </div>
  )
}
