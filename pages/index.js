import { Component } from 'react'
import App from '../src/components/app'
import Home from '../src/components/home'
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../src/withRoot';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Index extends Component {
  render() {
    return (
      <App>
        <Home />
      </App>
    )
  }
}
export default withRoot(withStyles(styles)(Index))