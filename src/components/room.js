import { Component } from 'react'
import { database, dbon, dboff, dbset } from '../lib/init-firebase'
import { withi18n } from '../lib/i18n'

@withi18n
class Room extends Component {
  state = {}
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
    alert('will unmount')
  }
  render() {
    const { i18n: { ui }, leaveRoom } = this.props
    const { room } = this.state
    return (
      <div>
        {JSON.stringify(room)}
        {/* {room && Object.keys(room.players).join()} */}
        <button onClick={leaveRoom}>{ui.leave_room}</button>
      </div>
    )
  }
}

export default Room
