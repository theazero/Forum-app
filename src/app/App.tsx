import AppRouter from './router'
import { ForumProvider } from '../features/forum/state/ForumProvider'
import '../index.css'

export default function App() {
  return (
    <ForumProvider>
      <AppRouter />
    </ForumProvider>
  )
}
