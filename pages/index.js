import { Component } from 'react'
import App from '../src/components/app'
import Home from '../src/components/home'
export default class Index extends Component {
  render() {
    return (
      <App>
        <Home />
      </App>
    )
  }
}