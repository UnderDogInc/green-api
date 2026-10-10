import { Button, Typography } from '@maxhub/max-ui'
import { CredentialsForm } from '../../../features/login-by-credentials'
import { useLoginPage } from '../model/useLoginPage'
import { InstanceStateNotice } from './InstanceStateNotice'
import { LoginAuthorizationFlow } from './LoginAuthorizationFlow'

export function LoginPage() {
  const page = useLoginPage()

  if (page.showCredentialsForm) {
    return <CredentialsForm onCredentialsAccepted={page.handleCredentialsAccepted} />
  }

  const credentials = page.credentials

  if (!credentials) {
    return null
  }

  return (
    <div className="grid w-full justify-items-stretch gap-5">
      <header className="grid gap-2 text-center">
        <Typography.Title>Вход в telegram аккаунт</Typography.Title>

        <Typography.Text color="secondary">
          Выберите QR-код или запросите код на номер телефона.
          <br />
          Если включена двухфакторная защита, Telegram попросит облачный пароль.
        </Typography.Text>
      </header>

      {page.method === 'qr' && !page.passwordRequired && (
        <InstanceStateNotice
          isLoading={page.instanceState.isPending}
          statusMessage={page.statusMessage}
          error={page.instanceState.error}
          hasInvalidCredentials={page.hasInvalidCredentials}
          onRetry={page.retryState}
          onChangeInstance={page.changeInstance}
        />
      )}

      <LoginAuthorizationFlow
        method={page.method}
        passwordRequired={page.passwordRequired}
        credentials={credentials}
        qrEnabled={!page.instanceState.isError}
        onMethodChange={page.setMethod}
        onAuthorized={() => page.handleAuthorized(credentials)}
        onPasswordRequired={page.requestPassword}
        onCancelPassword={page.cancelPassword}
      />

      <Button variant="ghost" size={'small'} stretched onClick={page.changeInstance}>
        Сменить инстанс
      </Button>
    </div>
  )
}
