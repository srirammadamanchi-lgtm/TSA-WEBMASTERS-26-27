import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { Start } from './pages/Start'
import { LearnHub } from './pages/LearnHub'
import { LessonPage, ModulePage } from './pages/Learn'
import { References } from './pages/References'
import { NotFound } from './pages/NotFound'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Start />} />
          <Route path="learn" element={<LearnHub />} />
          <Route path="modules/:moduleId" element={<ModulePage />} />
          <Route path="modules/:moduleId/:lessonId" element={<LessonPage />} />
          <Route path="references" element={<References />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
