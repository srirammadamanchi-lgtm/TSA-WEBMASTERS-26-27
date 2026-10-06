import { Link } from 'react-router'
import { SITE_NAME } from '../site'

export function NotFound() {
  return (
    <div className="py-16 text-center">
      <title>{`Page not found · ${SITE_NAME}`}</title>
      <h1 className="text-3xl font-extrabold">Page not found</h1>
      <Link to="/" className="btn mt-6">
        Back to home
      </Link>
    </div>
  )
}
