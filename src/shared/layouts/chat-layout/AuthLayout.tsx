import { Outlet } from '@tanstack/react-router'

export function AuthLayout() {
  return (
    <main className="centered-layout">
      <section className="auth-panel">
        <Outlet />
      </section>
    </main>
  )
}
