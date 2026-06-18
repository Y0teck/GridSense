import { useContext } from 'react'
import { LanguageContext } from '../LanguageContext'
import { STRINGS } from './strings'

export function useStrings() {
  const { lang } = useContext(LanguageContext)
  return STRINGS[lang] ?? STRINGS.fr
}
