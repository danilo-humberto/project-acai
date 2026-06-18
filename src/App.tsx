import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'

const TrackingPage = lazy(async () => {
  const module = await import('./pages/TrackingPage')

  return { default: module.TrackingPage }
})

const AdminRoutes = lazy(async () => {
  const module = await import('./pages/admin/AdminRoutes')

  return { default: module.AdminRoutes }
})

const NotFoundPage = lazy(async () => {
  const module = await import('./pages/NotFoundPage')

  return { default: module.NotFoundPage }
})

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/pedido/:trackingCode"
          element={
            <Suspense
              fallback={
                <div className="tracking-page-bg grid min-h-dvh place-items-center px-4 text-[var(--cream-50)]">
                  <p className="font-display text-3xl font-extrabold">Carregando pedido...</p>
                </div>
              }
            >
              <TrackingPage />
            </Suspense>
          }
        />
        <Route
          path="/admin/*"
          element={
            <Suspense
              fallback={
                <div className="admin-app-shell grid min-h-dvh place-items-center px-4">
                  <p className="text-sm font-bold text-[var(--admin-muted)]">Carregando admin...</p>
                </div>
              }
            >
              <AdminRoutes />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense
              fallback={
                <div className="grid min-h-dvh place-items-center bg-[var(--plum-950)] px-4 text-[var(--cream-50)]">
                  <p className="font-display text-3xl font-extrabold">Carregando página...</p>
                </div>
              }
            >
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
