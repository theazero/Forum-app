// src/app/App.tsx
import AppRouter from './router'
import { ForumProvider } from '../features/forum/state/ForumProvider'
import { AuthProvider } from '../contexts/AuthContext' 
import '../index.css'

export default function App() {
  return (
    <AuthProvider> 
      <ForumProvider>
        <AppRouter />
      </ForumProvider>
    </AuthProvider>
  )
}