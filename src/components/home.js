import { Component } from 'react'
import { Grid, TextField, Typography, Button } from '@material-ui/core/index'
import { withStyles } from '@material-ui/core/styles';
import LangPicker from './lang-picker'
import { withi18n } from '../lib/i18n'
import config from '../../config'
import { database, dbonce, dbset, dbupdate } from '../lib/init-firebase'
import Room from './room'
import Loading from './svg/loading'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

@withi18n
@withStyles(styles)
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      roomName: null,
      loading: false,
      joinedRoom: false
    }
  }

  nameChangeHandler = ({ target: { value } }) => {
    this.setState({ name: value })
  }

  roomNameChangeHandler = ({ target: { value } }) => {
    this.setState({ roomName: value })
  }

  newRoom = async () => {
    this.setState({ loading: true })
    const { roomName, name } = this.state
    const { i18n: { ui }, joinRoom, updateRoom } = this.props
    let s = await dbonce(`/rooms/${roomName}`)
    if (!!s) {
      alert(`${ui.room} ${roomName} ${ui.already_exist}`)
      this.setState({ loading: false })
    } else {
      console.log('creating room')
      await dbset(`/rooms/${roomName}`, { location: -1, players: { [name]: -1 }, playing: false })
      this.setState({ loading: false, joinedRoom: true })
    }
  }

  joinRoom = async () => {
    this.setState({ loading: true })
    const { roomName, name } = this.state
    const { i18n: { ui }, joinRoom, updateRoom } = this.props
    let s = await dbonce(`/rooms/${roomName}`)
    if (!s) {
      alert(`${ui.room} ${roomName} ${ui.not_exist}`)
      this.setState({ loading: false })
    } else if (s.playing) {
      alert(`${ui.game_already_started}`)
      this.setState({ loading: false })
    } else if (!!s.players && !!s.players[name]) {
      alert(`${ui.player} ${name} ${ui.already_exist}`)
      this.setState({ loading: false })
    } else {
      await dbset(`/rooms/${roomName}/players/${name}`, -1)
      this.setState({ loading: false, joinedRoom: true })
    }
  }

  leaveRoom = () => {
    console.log('leave room')
    this.setState({ joinedRoom: false })
  }

  render() {
    const { i18n: { ui }, classes } = this.props
    const { name, roomName, loading, joinedRoom } = this.state
    return (
      <div className={classes.root}>
        <Typography variant="display1">{ui.welcome_to_spyfall}</Typography>
        {(loading ? <Loading /> : null)}

        {(joinedRoom
          ? <Room name={name} roomName={roomName} leaveRoom={this.leaveRoom} />
          : (
            <div>
              <Grid spacing={16} container justify="center">
                <Grid item>
                  <TextField
                    id="name"
                    label={ui.enter_your_name}
                    margin="normal"
                    onChange={this.nameChangeHandler}
                    value={name}
                    item
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="room_name"
                    label={ui.enter_room_name}
                    margin="normal"
                    onChange={this.roomNameChangeHandler}
                    value={roomName}
                    item
                  />
                </Grid>
              </Grid>
              <Grid spacing={16} container justify="center">
                <Grid item>
                  <Button
                    variant="raised"
                    color="secondary"
                    onClick={this.newRoom}
                    disabled={!name || !roomName || loading}>
                    {ui.new_room}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.joinRoom}
                    disabled={!name || !roomName || loading}>
                    {ui.join_room}
                  </Button>
                </Grid>
              </Grid>
            </div>
          ))}
        <LangPicker />
      </div>
    )
  }
}

export default Home
