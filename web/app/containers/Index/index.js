/**
 *
 * Index
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import {
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Paper,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { red, grey, green } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import AccountIcon from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectIndex from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  updateUrl,
  updateKidsUrl,
} from './actions';

const styles = theme => ({
  root: {},
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  main: {
    display: 'flex',
    padding: 40,
  },
  paper: {
    width: 280,
    height: 280,
    marginRight: 40,
    marginLeft: 40,
    borderRadius: '50%',
    padding: 10,
    backgroundColor: grey[200],
    position: 'relative',
    top: 20,
  },
  innerDiv: {
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden',
    borderRadius: '50%',
    border: `10px solid ${grey[100]}`,
    position: 'ralative',
    outline: 0,
    backgroundColor: '#fff',
  },
  pulseDiv: {
    width: 320,
    height: 320,
    overflowX: 'hidden',
    overflowY: 'hidden',
    borderRadius: '50%',
    // border: `10px solid ${red[100]}`,
    position: 'absolute',
    left: 20,
    top: 0,
    outline: 0,
    backgroundColor: red[200],
    animation: 'pulse 1s ease-out',
    animationIterationCount: 'infinite',
  },
  img: {
    transition: 'all .2s ease-in-out',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.1)',
      animation: 'none',
    },
    animation: 'shake 1s',
    animationIterationCount: 'infinite',
  },
  streamContainer: {
    display: 'flex',
    width: '100%',
    height: `calc(100vh - 200px)`,
  },
  imgContainer: {
    flexBasis: 500,
    position: 'relative',
  },
  chatContainer: {
    flexGrow: 1,
    border: `1px solid ${grey[300]}`,
    backgroundColor: grey[100],
    display: 'flex',
    height: `100%`,
    flexDirection: 'column',
  },
  chatContent: {
    flexGrow: 1,
    padding: '10px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflowY: 'auto',
  },
  chatActions: {
    // width: '100%',
    backgroundColor: grey[200],
    padding: '10px',
    display: 'flex',
    alignItems: 'flex-start',
  },
  chatInput: {
    flexGrow: 1,
    marginRight: 10,
  },
  chatButton: {
    marginTop: 10,
  },
  paperMsg: {
    margin: '0 0 10px 0',
    padding: '5px 10px',
    maxWidth: '60%',
  },
  msgIn: {
    marginRight: 'auto',
  },
  msgOut: {
    backgroundColor: green[100],
    marginLeft: 'auto',
  },
  supers: {
    flexGrow: 1,
    padding: '0 40px',
  },
  paperSuper: {
    padding: 20,
    marginBottom: 20,
  },
  superActions: {
    width: '100%',
    padding: '20px 0 0 0',
    textAlign: 'right',
  }
});

/* eslint-disable react/prefer-stateless-function */
export class Index extends React.PureComponent {
  componentDidMount() {
    setTimeout(() => this.props.updateKidsUrl(), 10000);
  }

  render() {
    const { classes, index } = this.props;
    
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              Prodobro
            </Typography>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <AccountIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.main}>
          {index.url ? (
            <div className={classes.streamContainer}>
              <div className={classes.imgContainer}>
                <div className={classes.pulseDiv} />
                <Paper className={classes.paper}>
                  <div className={classes.innerDiv}>
                    <img
                      src={index.url}
                      width="100%"
                      height="100%"
                      alt="sample"
                    />
                  </div>
                </Paper>
              </div>
              <div className={classes.chatContainer}>
                <div className={classes.chatContent}>
                  {index.chat.list.map((item, indexIter) => (
                    <Paper
                      className={classNames(
                        classes.paperMsg,
                        item[0] ? classes.msgIn : classes.msgOut,
                      )}
                      key={`msg_${indexIter}`}
                      elevation={2}
                    >
                      <Typography>{item[0] || item[1]}</Typography>
                    </Paper>
                  ))}
                </div>
                <div className={classes.chatActions}>
                  <TextField
                    // variant="outlined"
                    // id="standard-multiline-flexible"
                    // label="Multiline"
                    multiline
                    rowsMax="4"
                    value={index.chatInput}
                    className={classes.chatInput}
                    onChange={e => {
                      this.props.updateTextField('chatInput', e.target.value);
                    }}
                    // className={classes.textField}
                    margin="normal"
                  />
                  <IconButton
                    onClick={() => this.props.sendMessage()}
                    variant="outlined"
                    className={classes.chatButton}
                    disabled={index.chatInput === ''}
                  >
                    <SendIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.supers}>
                <Paper className={classes.paperSuper}>
                  <Typography paragraph variant="title">
                    Районный учстковый
                  </Typography>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Сообщение"
                    multiline
                    rowsMax="4"
                    value={index.policeMsg}
                    fullWidth
                    // onChange={this.handleChange('multiline')}
                    // className={classes.textField}
                    margin="normal"
                    // helperText="hello"
                    variant="outlined"
                  />
                  <div className={classes.superActions}>
                    <Button
                      variant="raised"
                      color="primary"
                      onClick={() => {

                      }}
                    >
                      Отправить
                    </Button>
                  </div>
                </Paper>

                <Paper className={classes.paperSuper}>
                  <Typography paragraph variant="title">
                    Диспетчер скорой помощи
                  </Typography>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Сообщение"
                    multiline
                    rowsMax="4"
                    value={index.ambulanceMsg}
                    fullWidth
                    // onChange={this.handleChange('multiline')}
                    // className={classes.textField}
                    margin="normal"
                    // helperText="hello"
                    variant="outlined"
                  />
                  <div className={classes.superActions}>
                    <Button
                      variant="raised"
                      color="primary"
                      onClick={() => {

                      }}
                    >
                      Отправить
                    </Button>
                  </div>
                </Paper>
              </div>
            </div>
          ) : (
            index.kids.list.map(item => (
              <Paper className={classes.paper} key={item.url}>
                <div className={classes.innerDiv}>
                  <img
                    src={item.url}
                    width="100%"
                    height="100%"
                    className={classes.img}
                    alt="sample"
                    data-url={item.url}
                    onClick={e => {
                      this.props.updateUrl(e.target.dataset.url);
                    }}
                  />
                </div>
              </Paper>
            ))
          )}
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object,
  updateUrl: PropTypes.func,
  updateKidsUrl: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  index: makeSelectIndex(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateUrl: url => dispatch(updateUrl(url)),
    updateKidsUrl: () => dispatch(updateKidsUrl()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'index', reducer });
const withSaga = injectSaga({ key: 'index', saga });

export default compose(
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect,
)(Index);
