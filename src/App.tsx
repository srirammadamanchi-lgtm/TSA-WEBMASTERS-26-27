import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { LessonPage, ModulePage } from './pages/Learn'
import { Dashboard } from './pages/Dashboard'
import { References } from './pages/References'
import { NotFound } from './pages/NotFound'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="modules/:moduleId" element={<ModulePage />} />
          <Route path="modules/:moduleId/:lessonId" element={<LessonPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="references" element={<References />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
