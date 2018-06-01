import { Component } from 'react'
import { database, dbon, dboff } from '../lib/init-firebase'

class Room extends Component {
  state={}
  componentWillMount() {
    const { name, roomName } = this.props
    console.log('will mount')
    dbon(`/rooms/${roomName}`, 'value', room => this.setState({ room }))
  }
  componentWillUnmount() {
    const { name, roomName } = this.props
    console.log('will unmount')
    dboff(`/rooms/${roomName}`, 'value', room => this.setState({ room }))
  }
  render() {
    const { room } = this.state
    return (
      <div>
        {JSON.stringify(room)}
        {/* {room && Object.keys(room.players).join()} */}
      </div>
    )
  }
}

export default Room
