import { Link, Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Search</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
      <Outlet />
    </div>
  )
}
