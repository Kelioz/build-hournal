import { BrowserRouter } from 'react-router-dom'
import { MainLayout } from '../shared/ui/layout/Layout'
import { Router } from './router'
import QueryProvider from './queryProvider'

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <MainLayout>
          <Router />
        </MainLayout>
      </BrowserRouter>
    </QueryProvider>
  )
}

export default App
