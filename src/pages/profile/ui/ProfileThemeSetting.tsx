import { CellHeader, CellList, CellSimple, Switch } from '@maxhub/max-ui'
import type { ColorScheme } from '../../../shared/lib'

interface Props {
  scheme: ColorScheme
  onChange: (scheme: ColorScheme) => void
}

export function ProfileThemeSetting({ scheme, onChange }: Props) {
  return (
    <CellList mode="island" header={<CellHeader>Настройки</CellHeader>}>
      <CellSimple
        as="label"
        title="Тёмная тема"
        subtitle={scheme === 'dark' ? 'Включена' : 'Выключена'}
        after={
          <Switch
            checked={scheme === 'dark'}
            onChange={(event) => onChange(event.currentTarget.checked ? 'dark' : 'light')}
            aria-label="Переключить тёмную тему"
          />
        }
      />
    </CellList>
  )
}
