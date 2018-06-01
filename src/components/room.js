import { Component } from 'react'
import { database, dbon, dboff, dbset, dbupdate } from '../lib/init-firebase'
import { withi18n } from '../lib/i18n'
import locations from '../lib/locations'
import randInt from '../lib/rand-int'

@withi18n
class Room extends Component {
  state = {
    room: null,
    game: null
  }
  componentWillMount = () => {
    const { name, roomName } = this.props
    console.log('will mount')
    dbon(`/rooms/${roomName}`, 'value', room => this.setState({ room }))
    window.addEventListener("beforeunload",this.componentWillUnmount)
  }
  componentWillUnmount = () => {
    const { room } = this.state
    const { name, roomName } = this.props
    dboff(`/rooms/${roomName}`, 'value', room => this.setState({ room }))
    if (!!room && !!room.players && Object.keys(room.players).length > 1){
      console.log(`rm /rooms/${roomName}/players/${name}`)
      dbset(`/rooms/${roomName}/players/${name}`, null)
    }
    else{
      console.log(`rm /rooms/${roomName}`)
      dbset(`/rooms/${roomName}`, null)
    }
    window.removeEventListener("beforeunload",this.componentWillUnmount)
  }
  startGame = async () => {
    const {roomName} = this.props
    let {room:{players}} = this.state
    const locationId = randInt(0,locations.length)
    dbupdate(`rooms/${roomName}`,{location: locationId, playing: true, startTime: Date.now()})
    let roles = locations[locationId].roles.slice()
    const defaultRole = roles[roles.length-1]
    let notAssigned = Object.keys(players)
    while(notAssigned.length>0){
      let role = defaultRole
      if(roles.length>0){
        role = roles.splice(randInt(0,roles.length))[0]
      }
      let player
      player = notAssigned.splice(randInt(0,notAssigned.length))[0]
      players[player] = role
      console.log(`${player}->${role}`)
    }
    players[notAssigned[0]] = 'spy'
    dbset(`rooms/${roomName}/players`,players)

  }
  render() {
    const { i18n: { ui }, leaveRoom } = this.props
    const { room } = this.state
    return (
      <div>
        {JSON.stringify(room)}
        {/* {room && Object.keys(room.players).join()} */}
        <button onClick={leaveRoom}>{ui.leave_room}</button>
        <button onClick={this.startGame}>{ui.start_game}</button>
      </div>
    )
  }
}

export default Room
