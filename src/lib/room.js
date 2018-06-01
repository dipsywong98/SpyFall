import { connect } from 'react-redux'
import { joinRoom } from './store'

const mapStateToProps = ({ room }) => ({ room })

const mapDispatchToProps = (dispatch, ownProps) => ({
  joinRoom: (...args) => dispatch(joinRoom(...args))
})

const withRoom = WrapComponent => {
  return connect(mapStateToProps, mapDispatchToProps)(WrapComponent)
}

export {
  withRoom
}