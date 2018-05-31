import { Component } from 'react'
import App from '../src/components/app'
import LangPicker from '../src/components/lang-picker'
import Test from '../src/components/test'
export default class Imdex extends Component {
  render() {
    return (
      <App>
        <div>
          <p>hello world</p>
          <LangPicker />
          <Test />
        </div>
      </App>
    )
  }
}