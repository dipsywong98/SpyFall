import { Component } from 'react'
import { withi18n } from '../lib/i18n'
import locations from '../lib/locations'
import randInt from '../lib/rand-int'
import Loading from './svg/loading'

@withi18n
class Game extends Component {
  state = { hide: false }
  render() {
    const { i18n, i18n: { ui }, room, endGame } = this.props
    const { hide } = this.state
    const roles = i18n.locations.roles[location]
    let role
    if (room.players[this.props.name] === 'spy') role = i18n.locations.roles['spy']
    else role = i18n.locations.roles[room.location][room.players[this.props.name]]
    return (
      <div>
        <button onClick={() => this.setState({ hide: !hide })}>{ui.show_hide}</button>
        {(hide ? null : (room.players[this.props.name] === 'spy'
          ? <div>
            <h2>
              {ui.you_are_the_spy}
            </h2>
          </div>
          : <div>
            <h2>
              {ui.you_are_not_the_spy}
            </h2>
            <h4>
              <p>{ui.the_location} : {i18n.locations[room.location]}</p>
              <p>{ui.your_role} : {role}</p>
            </h4>
          </div>))}
          <button onClick={endGame}>{ui.end_game}</button>
        {/* {locations.map(({ name })=> (<p>{name}</p>))} */}
      </div>

    )
  }
}

export default Game
