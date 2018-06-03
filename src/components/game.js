import { Component } from 'react'
import { Typography, Grid, Button, Slide, Collapse } from '@material-ui/core/index'
import { withStyles } from '@material-ui/core/styles'
import { withi18n } from '../lib/i18n'
import locations from '../lib/locations'
import randInt from '../lib/rand-int'
import Loading from './svg/loading'
import ToggleDeleteButton from './toggle-delete-button'

const styles = theme => {
  paper: {
    backgroundColor: '#ffffff'
  }
}
@withi18n
@withStyles(styles)
class Game extends Component {
  state = { hide: false, secondsLeft: 99999, timer: null }
  componentWillMount() {
    this.state.timer = setInterval(() => {
      let secondsLeft = this.props.room.startTime / 1000 + 60 * 10 - Date.now() / 1000
      this.setState({ secondsLeft })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.state.timer)
    this.state.timer = null
  }
  render() {
    const { i18n, i18n: { ui }, room, endGame, classes } = this.props
    const { hide, secondsLeft } = this.state
    let role
    if (room.players[this.props.name] === 'spy') role = i18n.locations['spy']
    else if (room.location && i18n.locations[room.location]) role = i18n.locations[room.location].roles[room.players[this.props.name]]
    return (
      <div>
        <Grid container direction='column' justify='center' spacing={16} style={{ textAlign: 'center' }}>
        <Grid item>
            <Typography variant='display1'>
              {ui.first_player}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='title'>
              {room.firstPlayer}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='display1'>
              {ui.time_remained}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='title'>
              {Math.floor(secondsLeft / 60)}: {Math.floor(secondsLeft % 60)}
            </Typography>
          </Grid>
          <Grid item>
            <Collapse in={!hide} collapsedHeight="30px">
              <Button
                variant="raised"
                elevation={4}
                className={classes.paper}
                onClick={() => this.setState({ hide: !hide })}
              >
                <Grid container direction='column' spacing={16}>
                  <Grid item>
                    <Typography variant="display2" item>
                      {ui.your_role}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="title" item>
                      {role}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="display1" item>
                      {ui.the_location}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="title" item>
                      {(room.players[this.props.name] === 'spy'
                        ? ui.you_are_the_spy
                        : i18n.locations[room.location].name)}
                    </Typography>
                  </Grid>
                </Grid>


              </Button>
            </Collapse>
          </Grid>
          <Grid item>
            <Typography variant="display1" item>
              {ui.location_reference}
            </Typography>
          </Grid>

          <Grid item>
            <Grid container justify='center'>
              <Grid item xl={6} lg={6} md={8} sm={10} xs={12}>
                <Grid container justify='center' spacing={8}>
                  {locations.map(({ name }) => (<Grid item> <ToggleDeleteButton children={i18n.locations[name].name} /></Grid>))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button color='secondary' variant='raised' onClick={endGame}>{ui.end_game}</Button>
          </Grid>
        </Grid>
      </div>

    )
  }
}

export default Game
