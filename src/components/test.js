import { Component } from 'react'
import { withi18n } from '../locales/i18n'

@withi18n
class Test extends Component {
  render(){
    return (
      <p>
        {JSON.stringify(this.props.i18n)}
      </p>
    )
  }
}

export default Test