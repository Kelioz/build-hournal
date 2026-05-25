import { BrowserRouter } from 'react-router-dom'
import { MainLayout } from './shared/ui/layout/Layout'
import { Router } from './app/router'
import QueryProvider from './app/queryProvider'

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
