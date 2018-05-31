import { connect } from 'react-redux'
import en from '../locales/en.i18n'
import zh from '../locales/zh.i18n'

const langList = { en, zh }

const getLang = () => lang

const withi18n = WrapComponent => {
  return connect(({ lang }) => ({ i18n: langList[lang] }))(WrapComponent)
  // return ()=><WrapComponent i18n={langList[lang]} lang={lang}/>
}

export {
  langList, withi18n
}

