import { Component } from 'react'
import { Typography, Grid, Button, Slide } from '@material-ui/core/index'
import { withStyles } from '@material-ui/core/styles'
import { database, dbon, dboff, dbset, dbupdate } from '../lib/init-firebase'
import { withi18n } from '../lib/i18n'
import locations from '../lib/locations'
import randInt from '../lib/rand-int'
import Loading from './svg/loading'
import Game from './game'
import ToggleDeleteButton from './toggle-delete-button'

const styles = theme => ({
  center: {
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    flexGrow: 1,
  }
})

@withi18n
@withStyles(styles)
class Room extends Component {
  state = {
    room: null,
    loading: false
  }

  componentWillMount = () => {
    const { name, roomName } = this.props
    console.log('will mount')
    dbon(`/rooms/${roomName}`, 'value', room => this.setState({ room }))
    window.addEventListener("beforeunload", this.componentWillUnmount)
  }

  componentWillUnmount = () => {
    const { room } = this.state
    const { name, roomName } = this.props
    dboff(`/rooms/${roomName}`, 'value', room => this.setState({ room }))
    if (!!room && !!room.players && Object.keys(room.players).length > 1) {
      console.log(`rm /rooms/${roomName}/players/${name}`)
      dbset(`/rooms/${roomName}/players/${name}`, null)
    }
    else {
      console.log(`rm /rooms/${roomName}`)
      dbset(`/rooms/${roomName}`, null)
    }
    window.removeEventListener("beforeunload", this.componentWillUnmount)
  }

  startGame = () => {
    this.setState({ loading: true })
    const { roomName } = this.props
    let { room: { players } } = this.state
    const locationId = randInt(0, locations.length)
    const firstPlayer = Object.keys(players)[randInt(0, Object.keys(players).length)]
    dbupdate(`rooms/${roomName}`, {
      location: locations[locationId].name,
      playing: true,
      startTime: Date.now(),
      firstPlayer
    })
    console.log(locations[locationId].roles)
    let roles = Array(locations[locationId].roles).fill('').map((_, k) => k)
    const defaultRole = roles[roles.length - 1]
    let notAssigned = Object.keys(players)
    while (notAssigned.length > 1) {
      console.log(notAssigned, roles)
      let role = defaultRole
      if (roles.length > 0) {
        role = roles.splice(randInt(0, roles.length), 1)[0]
      }
      let player
      player = notAssigned.splice(randInt(0, notAssigned.length), 1)[0]
      players[player] = role
      console.log(`${player}->${role}`)
    }
    players[notAssigned[0]] = 'spy'
    dbset(`rooms/${roomName}/players`, players)
    this.setState({ loading: false })
  }

  endGame = async () => {
    const { roomName } = this.props
    dbupdate(`rooms/${roomName}`, { playing: false, startTime: null })
  }

  render() {
    const { i18n, i18n: { ui }, leaveRoom, name, roomName, classes } = this.props
    const { room, loading } = this.state
    return (
      <Grid direction='column' spacing={16} container justify='center'>
        <Grid item>
          <Typography variant="display3">{ui.room}: {roomName}</Typography>
        </Grid>
        {(loading ? <Loading /> : null)}
        {/* {JSON.stringify(room)} */}
        <Grid item>
          <Grid container spacing={8} justify='center'>

            {room && room.players && Object.keys(room.players).map(player => (
              <Grid item>
                <ToggleDeleteButton>
                  {player}
                </ToggleDeleteButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
        <Slide direction="left" in={room && room.playing} mountOnEnter unmountOnExit>
          <Game room={room} name={name} roomName={roomName} endGame={this.endGame} />
        </Slide>
        </Grid>
        {/* {room && Object.keys(room.players).join()} */}
        {(room && room.playing
          ? (null)
          : (<Grid item>
            <Grid container spacing={8} justify='center'>
              <Grid item>
                <Button color='secondary' variant='raised' onClick={leaveRoom}>{ui.leave_room}</Button>
              </Grid>
              <Grid item>
                <Button color='primary' variant='raised' onClick={this.startGame}>{ui.start_game}</Button>
              </Grid>
            </Grid>
          </Grid>)
        )}


      </Grid>
    )
  }
}

export default Room
