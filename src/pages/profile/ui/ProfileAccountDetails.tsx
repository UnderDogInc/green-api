import { CellHeader, CellInput, CellList, CellSimple } from '@maxhub/max-ui'
import type { AccountSettings } from '../../../entities/session'

interface Props {
  account?: AccountSettings
  apiUrl?: string
  idInstance?: string
}

export function ProfileAccountDetails({ account, apiUrl, idInstance }: Props) {
  return (
    <>
      {account?.phone && Number(account.phone) !== 0 && (
        <CellList mode="island" header={<CellHeader>Телефон</CellHeader>}>
          <CellSimple height="compact" title={account.phone} />
        </CellList>
      )}

      {account && (
        <CellList mode="island" header={<CellHeader>Статус подключения</CellHeader>}>
          <CellSimple
            height="compact"
            title={account.stateInstance === 'authorized' ? 'Подключен' : account.stateInstance}
          />
        </CellList>
      )}

      <CellList mode="island" header={<CellHeader>Текущий инстанс</CellHeader>}>
        <CellInput
          before="API URL"
          value={apiUrl ?? ''}
          readOnly
          aria-label="API URL текущего инстанса"
        />
        <CellInput
          before="ID инстанса"
          value={idInstance ?? ''}
          readOnly
          aria-label="ID текущего инстанса"
        />
      </CellList>
    </>
  )
}
