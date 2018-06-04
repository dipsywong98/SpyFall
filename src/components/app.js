import { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from '../lib/store'
import { initGA, logPageView } from '../lib/ga'

export default class App extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }
  render() {
    return <Provider store={store} children={this.props.children} />
  }
}