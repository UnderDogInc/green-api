import { IconButton, Input } from '@maxhub/max-ui'
import { Send } from 'lucide-react'
import { useChatComposer } from '../model/useChatComposer'

type Props = {
  chatId: string
  onSent: () => void
}

export function ChatComposer({ chatId, onSent }: Props) {
  const { draft, isPending, canSend, setDraft, submit } = useChatComposer(chatId, onSent)

  return (
    <form
      className="sticky bottom-0 z-[1] grid w-full grid-cols-[minmax(0,1fr)] items-center border-t border-[var(--divider-primary)] bg-[var(--background-primary)] px-5 pt-3 pb-[max(12px,env(safe-area-inset-bottom,0px))] max-[720px]:px-3 max-[720px]:py-2"
      onSubmit={submit}
    >
      <Input
        className="mx-auto min-h-11 w-full max-w-[900px]"
        type="text"
        maxLength={20_000}
        value={draft}
        onChange={(event) => setDraft(event.currentTarget.value)}
        withClearButton={false}
        placeholder="Сообщение..."
        iconAfter={
          <IconButton
            className="h-11 w-11 shrink-0"
            type="submit"
            size="small"
            variant="ghost"
            loading={isPending}
            disabled={!canSend || isPending}
            title="Отправить сообщение"
          >
            <Send size={19} />
          </IconButton>
        }
      />
    </form>
  )
}
