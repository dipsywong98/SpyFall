import { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, List, ListItem, ListItemText, Input, Paper, Button, Collapse, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { dbon, dbupdate } from '../lib/init-firebase'
import Send from './svg/send'

const styles = theme => ({
  frame: {
    position: 'absolute',
    bottom: '0px',
    right: theme.spacing.unit * 4,
    width: '250px',
    zIndex: '99'
  },
  inner: {
    padding: theme.spacing.unit,
    border: `solid 2px ${theme.palette.primary.light}`,
    height: '350px'
  },
  messageContainer: {

  },
  inputWrap: {
    borderTop: ''
  }
})

@withStyles(styles)
class ChatRoom extends Component {
  state = {
    messages: [],
    message: '',
    collapse: true
  }
  componentWillMount() {
    const { channel } = this.props
    dbon(`${channel}/chat`, 'value', value => this.setState({ messages: value || [] }))
  }
  handleInput = ({ target: { value } }) => {
    this.setState({ message: value })
  }
  handleSend = () => {
    const { channel, name } = this.props
    let { messages, message } = this.state
    messages.push({ time: Date.now(), name: name || 'anonymous', message })
    this.setState({ messages, message: '' })
    console.log(channel, messages)
    dbupdate(`${channel}/chat`, messages)
  }
  render() {
    const { classes } = this.props
    const chatRoomTitle = this.props.chatRoomTitle || 'chatroom'
    const { message, messages, collapse } = this.state
    return (
      <Grid container direction='column' className={classes.frame}>
        <Paper elevation={16}>
          <Grid item>
            <Button onClick={() => this.setState({ collapse: !collapse })} variant='raised' color='primary' style={{ width: '100%' }}>
              {chatRoomTitle}
            </Button>
          </Grid>
          <Grid item>
            <Collapse in={collapse}>
              <Grid container direction='column' className={classes.inner} justify='flex-end'>
                <Grid item className={classes.messageContainer}>
                  <List>
                    {messages.map(({ name, message }) => (
                      <ListItem>
                        <ListItemText children={name + ': '} /><ListItemText children={message} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item className={classes.inputWrap}>
                  <Input
                    placeholder="New Message"
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                    onChange={this.handleInput}
                    value={message}
                  />
                  <IconButton color='primary' onClick={this.handleSend}>
                    <Send />
                  </IconButton >
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Paper>
      </Grid>
    )
  }
}

ChatRoom.propTypes = {
  channel: PropTypes.string.isRequired
}

export default ChatRoom