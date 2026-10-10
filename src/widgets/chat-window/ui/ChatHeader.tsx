import { Avatar, IconButton, Spinner, Typography } from '@maxhub/max-ui'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, BadgeCheck } from 'lucide-react'
import { getInitials } from '../../../shared/helpers'
import { useContactInfo } from '../model/useContactInfo'
import { getContactDisplayName, getContactSubtitle } from '../utils/chatPresentation'

type Props = {
  chatId: string
  direct: boolean
}

export function ChatHeader({ chatId, direct }: Props) {
  const contact = useContactInfo(chatId, !direct)
  const displayName = getContactDisplayName(chatId, direct, contact.data)
  const subtitle = getContactSubtitle(chatId, direct, contact.data, contact.isError, displayName)
  const initials = getInitials(displayName)

  return (
    <header className="flex min-h-[72px] items-center gap-3 border-b border-[var(--divider-primary)] px-6 py-3 max-[720px]:min-h-16 max-[720px]:px-3 max-[720px]:py-2">
      <IconButton
        asChild
        className="shrink-0"
        variant="ghost"
        aria-label="Вернуться к списку чатов"
        title="Вернуться к списку чатов"
      >
        <Link to="/">
          <ArrowLeft size={20} aria-hidden="true" />
        </Link>
      </IconButton>

      <Avatar.Container size={44} form="circle">
        {contact.data?.avatar && <Avatar.Image src={contact.data.avatar} alt="" />}
        {!contact.data?.avatar && <Avatar.Text>{initials || '?'}</Avatar.Text>}
      </Avatar.Container>

      <div className="grid min-w-0 gap-0.5 [&_h1]:m-0 [&_h1]:truncate">
        <Typography.Title>{displayName}</Typography.Title>

        {subtitle && <Typography.Text color="secondary">{subtitle}</Typography.Text>}

        {!subtitle && contact.isLoading && <Spinner />}
      </div>

      {contact.data?.isVerified && (
        <BadgeCheck className="shrink-0 text-[var(--icon-themed)]" size={18} />
      )}
    </header>
  )
}
