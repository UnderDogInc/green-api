import { Outlet } from '@tanstack/react-router'
import { ChatList } from '../../widgets/chat-list'
import styles from './chat-layout/chat-layout.module.scss'

export function ChatLayout() {
  return (
    <div className={styles.layout}>
      <aside className={styles.aside} aria-label="Список чатов">
        <ChatList />
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
