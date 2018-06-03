import { Component } from 'react'
import { Grid, TextField, Button } from '@material-ui/core/index'

export default class ToggleDeleteButton extends Component {
  state = {
    deleted: false
  }
  onClick = () => {
    this.setState({ deleted: !this.state.deleted })
  }
  render() {
    const {deleted} = this.state
    return (
      <Button
        variant={(deleted?'outlined':'raised')}
        onClick={this.onClick}
      >
        {(
          deleted
          ? <del>{this.props.children}</del>
          : this.props.children
        )}
      </Button>
    )
  }
}
