import { NavLink, Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="container h-16 flex items-center justify-between">
          <Link to="/" className="brand">thefashionspot</Link>
          <nav className="topnav">
            <NavLink to="/" end className={({isActive}) => `tab ${isActive ? 'tab-active' : ''}`}>Home</NavLink>
            <NavLink to="/" className={({isActive}) => `tab ${isActive ? 'tab-active' : ''}`}>Forums</NavLink>
        
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/signin" className="btn">Log in</Link>
            <a className="btn btn-primary" href="#">Register</a>
            <a className="btn" href="#">Search</a>
          </div>
        </div>
      </header>
    
    </>
  )
}
