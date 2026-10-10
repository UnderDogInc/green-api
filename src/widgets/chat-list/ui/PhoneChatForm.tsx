import { Input } from '@maxhub/max-ui'
import { Search } from 'lucide-react'
import { usePhoneChatSearch } from '../model/usePhoneChatSearch'

export function PhoneChatForm() {
  const search = usePhoneChatSearch()

  return (
    <>
      <form className="min-w-0" onSubmit={search.openChat}>
        <Input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={24}
          value={search.inputValue}
          size="medium"
          onChange={(event) => search.updatePhoneNumber(event.currentTarget.value)}
          placeholder="Найти по номеру"
          disabled={search.isPending}
          iconBefore={<Search size={16} aria-hidden="true" />}
          aria-invalid={Boolean(search.error)}
          aria-describedby={search.error ? 'chat-phone-error' : undefined}
          required
        />
      </form>

      {search.error && (
        <p id="chat-phone-error" className="-mt-2 mb-0 text-xs text-[#b42318]" role="alert">
          {search.error}
        </p>
      )}
    </>
  )
}
