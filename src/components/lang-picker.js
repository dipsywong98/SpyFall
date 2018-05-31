import { Component } from 'react'
import { connect } from 'react-redux'
import { setLang, getLang } from '../lib/store'

class Picker extends Component {
  onChange = ({ target: { value } }) => {
    console.log(value, getLang())
    this.props.setLang(value)
  }

  render() {
    const {lang} = this.props
    return (
      <div>
        {lang}
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

const mapStateToProps = lang => ({lang})
const mapDispatchToProps = (dispatch, ownProps) => ({setLang: (...args) => dispatch(setLang(...args))})

export default connect(mapStateToProps, mapDispatchToProps)(Picker)
