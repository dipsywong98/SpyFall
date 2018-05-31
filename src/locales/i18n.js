import en from './en.i18n'
import zh from './zh.i18n'

const langList = [
  {
    id: 'en',
    name: 'English'
  },
  {
    id: 'zh',
    name: '中文'
  }
]

let lang = 'en'

const setLang = _lang => {
  console.log(_lang,lang)
  lang = _lang
  console.log(_lang,lang)
}

const getLang = () => lang

const withi18n = WrapComponent => {
  let i18n
  switch(lang){
    case 'en':
      i18n = en
      break
    case 'zh':
      i18n = zh
      break
    default:
      i18n = en
  }
  return ()=><WrapComponent i18n={i18n} {...this.props}/>
}

export {
  setLang, getLang, langList, withi18n
}

