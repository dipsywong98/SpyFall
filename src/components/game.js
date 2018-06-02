import { Component } from 'react'
import { withi18n } from '../lib/i18n'
import locations from '../lib/locations'
import randInt from '../lib/rand-int'
import Loading from './svg/loading'

@withi18n
class Game extends Component {
  state = { hide: false }
  render() {
    const { i18n, i18n: { ui }, room } = this.props
    const { hide } = this.state
    const roles = i18n.locations.roles[location]
    let role
    if (room.players[this.props.name] === 'spy') role = i18n.locations.roles['spy']
    else role = roles[room.players[this.props.name]]
    return (
      <div>
        <button onClick={() => this.setState({ hide: !hide })}>{ui.show_hide}</button>
        {(hide ? null : <div>
          <h2>
            {ui.the_location}: {i18n.locations[location]}
          </h2>
          <h4>
            {ui.your_role}: {role}
          </h4>
        </div>)}
        {locations.map(({ name })=> (<p>{name}</p>))}
      </div>

    )
  }
}

export default Game
