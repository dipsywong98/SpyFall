import { Component } from 'react'
import LangPicker from './lang-picker'
import { withi18n } from '../lib/i18n'
import config from '../../config'
import {database} from '../lib/init-firebase'

@withi18n
class Home extends Component {
  state = {
    name:'',
    roomId:null
  }
  nameChangeHandler({target:{value}}){
    this.setState({name:value})
  }
  roomIdChangeHandler({target:{value}}){
    this.setState({roomId:value})
  }
  newGame(){
    console.log('new')
    database.ref('/').update({
      yo:'mama'
    }).then((data)=>{
      console.log('success', data)
    })
  }
  render() {
    const { i18n: { ui } } = this.props
    return (
      <div>
        <h2>{ui.welcome_to_spyfall}</h2>
        <p>{ui.enter_your_name}<input onChange={this.nameChangeHandler}/></p>
        <p>{ui.enter_an_access_code}<input onChange={this.roomIdChangeHandler}/></p>
        <button onClick={this.newGame}>{ui.new_game}</button>
        <button>{ui.join_game}</button>
        <LangPicker />
        {JSON.stringify(config)}
      </div>
    )
  }
}

export default Home
