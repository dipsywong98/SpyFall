import { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from '../lib/store'

export default class App extends Component {
  render() {
    return <Provider store={store} children={this.props.children} />
  }
}