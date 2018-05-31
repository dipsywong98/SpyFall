import { Component } from 'react'
import { connect } from 'react-redux'
import { setLang } from '../lib/store'
import { langList } from '../lib/i18n'

class Picker extends Component {
  onChange = ({ target: { value } }) => {
    this.props.setLang(value)
  }

  render() {
    const { lang } = this.props
    return (
      <div>
        {langList[lang].name}
        <select onChange={this.onChange}>
          {Object.keys(langList).map(lang =>
            <option value={lang}>
              {langList[lang].name}
            </option>)
          }
        </select>
      </div>
    )
  }
}

const mapStateToProps = ({ lang }) => ({ lang })
const mapDispatchToProps = (dispatch, ownProps) => ({ setLang: (...args) => dispatch(setLang(...args)) })

export default connect(mapStateToProps, mapDispatchToProps)(Picker)
