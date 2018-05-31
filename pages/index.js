import { Component } from 'react'
import i18n from '../src/locales/i18n'
import LangPicker from '../src/components/lang-picker'
import Test from '../src/components/test'
export default class App extends Component {
  render() {
    return (
      <div>hello world 
        <LangPicker/>
        <Test/>
      </div>
    )
  }
}