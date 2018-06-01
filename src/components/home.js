import { Component } from 'react'
import LangPicker from './lang-picker'
import { withi18n } from '../lib/i18n'
import config from '../../config'
import { database, dbonce, dbset, dbupdate } from '../lib/init-firebase'
import Room from './room'
import Loading from './svg/loading'

@withi18n
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

  newGame = async () => {
    this.setState({ loading: true })
    const { roomName, name } = this.state
    const { i18n: { ui }, joinRoom, updateRoom } = this.props
    let s = await dbonce(`/rooms/${roomName}`)
    if (!!s) {
      alert(`${ui.room} ${roomName} ${ui.already_exist}`)
      this.setState({ loading: false })
    } else {
      console.log('creating room')
      await dbset(`/rooms/${roomName}`, { location: -1, players: { [name]: -1 } })
      this.setState({ loading: false, joinedRoom: true })
    }
  }

  joinGame = async () => {
    this.setState({ loading: true })
    const { roomName, name } = this.state
    const { i18n: { ui }, joinRoom, updateRoom } = this.props
    let s = await dbonce(`/rooms/${roomName}`)
    if (!s) {
      alert(`${ui.room} ${roomName} ${ui.not_exist}`)
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
    this.setState({joinedRoom: false})
  }

  render() {
    const { i18n: { ui } } = this.props
    const { name, roomName, loading, joinedRoom } = this.state
    return (
      <div>
        <h2>{ui.welcome_to_spyfall}</h2>
        {(loading ? <Loading /> : null)}

        {(joinedRoom
          ? <Room name={name} roomName={roomName} leaveRoom={this.leaveRoom}/>
          : (
            <div>
              <p>{ui.enter_your_name}<input onChange={this.nameChangeHandler} value={name}/></p>
              <p>{ui.enter_room_name}<input onChange={this.roomNameChangeHandler} value={roomName}/></p>
              <button onClick={this.newGame} disabled={!name || !roomName || loading}>{ui.new_game}</button>
              <button onClick={this.joinGame} disabled={!name || !roomName || loading}>{ui.join_game}</button>
            </div>
          ))}
        <p>{JSON.stringify(config)}</p>
        <LangPicker />
      </div>
    )
  }
}

export default Home
