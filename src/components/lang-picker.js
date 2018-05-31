import { Component } from 'react'
import { setLang, getLang } from '../locales/i18n'
export default class App extends Component {
  state = {
    lang: 'en'
  }

  onChange = ({target:{value}}) => {
    alert('yo')
    setLang(value)
    this.setState({ lang: value })
  }

  render() {
    return (
      <div>
        {getLang()}
        <select onChange={this.onChange}>
          {['en', 'zh'].map(lang =>
            <option value={lang}>
              {lang}
            </option>)
          }
        </select>
      </div>
    )
  }
}