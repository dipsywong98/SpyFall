import { Component } from 'react'
import { Typography, Paper, Button, Grid } from '@material-ui/core/index'
import Clear from './svg/clear'
import Edit from './svg/edit'

class NameTag extends Component {
  render() {
    return (
      <Paper>
        <Grid container justify='space-between' alignItems='center'>
          <Typography variant='body2' item xs={10} item>{this.props.children}</Typography>
          <Grid item >
          <Button align="right" size='small' children={<Edit />} />
          <Button align="right" mini variant='fab' style={{backgroundColor:'#ffffff'}} children={<Clear />} />
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default NameTag