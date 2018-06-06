import { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography, Grid, List, ListItem, ListItemText, Input, Paper, Button, Collapse, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ColorHash from 'color-hash'
import moment from 'moment'

const styles = theme => ({
  chip: {
    padding: '5px 10px',
    backgroundColor: theme.palette.grey[200],
    width: '80%',
    margin: '5px',
    marginLeft: '10px',
    borderRadius: '20px'
  },
  nameText: {
    color: props => props.color
  }
})

const Chip = ({ name, message, time, classes }) => {
  let colorHash = new ColorHash(), color = colorHash.hex(name)
  return (
    <ListItem className={classes.chip}>
      <Grid direction='column' alignItems='stretch' container>

        <Grid item>
          <Grid container justify='space-between' alignItems='baseline'>
            <Grid item>
              <Typography variant='body2' style={{ color }}>{name}</Typography>
            </Grid>
            <Grid item>
              <abbr title={moment(time).format('YYYY-MM-DD HH:mm:ss')} style={{textDecoration:'none'}}>
              <Typography variant='caption'>{moment(time).format('HH:mm')}</Typography>
              </abbr>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant='subheading'>{message}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default withStyles(styles)(Chip)
