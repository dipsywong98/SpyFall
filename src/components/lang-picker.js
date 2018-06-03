import { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, TextField, Typography, Button, Slide } from '@material-ui/core/index'
import { withStyles } from '@material-ui/core/styles'
import { setLang } from '../lib/store'
import { langList } from '../lib/i18n'

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
})

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
