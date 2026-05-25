import { JournalListPage } from '@/pages/HournalListPage/JournalList'
import { JournalFormPage } from '@/pages/JournalFormPage/JournalForm'
import { Routes, Route } from 'react-router-dom'

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<JournalListPage />} />
      <Route path='/create' element={<JournalFormPage />} />
      <Route path='/edit/:id' element={<JournalFormPage />} />
    </Routes>
  )
}
