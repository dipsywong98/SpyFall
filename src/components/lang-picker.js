import { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Typography, Button, Menu, MenuItem } from '@material-ui/core/index'
import { withStyles } from '@material-ui/core/styles'
import { setLang } from '../lib/store'
import { langList } from '../lib/i18n'
import Language from './svg/language'

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
})

@withStyles(styles)
class Picker extends Component {
  state = {
    anchorEl: null,
  }

  onChange = ({ target: { value } }) => {
    this.props.setLang(value)
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = (value = null) => {
    this.setState({ anchorEl: null })
    if (!!value) {
      this.props.setLang(value)
    }
  };


  render() {
    const { lang, classes } = this.props
    const { anchorEl } = this.state
    return (
      <div>
        <Button variant='outlined' onClick={this.handleClick}>
          Language <Language />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={()=>this.handleClose(null)}
        >
          {
            Object.keys(langList).map(lang =>(
              <MenuItem onClick={() => this.handleClose(lang)}>
                {langList[lang].name}
              </MenuItem>))
          }
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = ({ lang }) => ({ lang })
const mapDispatchToProps = (dispatch, ownProps) => ({ setLang: (...args) => dispatch(setLang(...args)) })

export default connect(mapStateToProps, mapDispatchToProps)(Picker)
