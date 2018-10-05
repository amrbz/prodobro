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

import axios from 'axios';

import Record from 'components/Record/Loadable';

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
import Hearing from '@material-ui/icons/RecordVoiceOver';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';
import MyRecordsIcon from '@material-ui/icons/RecordVoiceOver';
import ExploreIcon from '@material-ui/icons/Search';
import StaredIcon from '@material-ui/icons/Star';
import FavIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import AboutIcon from '@material-ui/icons/Info';
import MoreIcon from '@material-ui/icons/MoreVert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectIndex from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  updateStatus,
  updateCountdownValue,
  updateTimeLeftValue,
  updateStreamingTime,
  updateTextField,
  sendMessage,
  toggleDrawer,
  toggleCallBackDialog,
  toggleCallback,
  toggleHelpOthersDialog,
  onFileDrop,
  toggleFileDialog,
} from './actions';

const styles = theme => ({
  root: {},
  danger: {
    backgroundColor: grey[100],
    height: '100vh',
    textAlign: 'center',
  },
  chat: {
    backgroundColor: grey[50],
    height: '100vh',
  },
  countdown: {
    margin: theme.spacing.unit * 2,
    color: red[500],
    marginTop: '35%',
    marginBottom: theme.spacing.unit * 6,
  },
  countdownDescr: {
    marginBottom: theme.spacing.unit * 4,
  },
  cancelButton: {
    // color: grey[50],
    fontSize: 24,
    fontWeight: 400,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: red[700],
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  streamIcon: {
    marginRight: 20,
  },
  chatMain: {
    display: 'flex',
    height: `calc(100vh - 56px)`,
    width: '100%',
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
  paper: {
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
  menu: {
    // width: '100%',
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: theme.mixins.toolbar,
  records: {
    backgroundColor: grey[200],
    height: '100vh',
  },
  recordsContainer: {
    padding: 10,
    height: `calc(100vh - 56px)`,
    overflowY: 'auto',
  },
  timepicker: {
    marginRight: 20,
  },
  paperSearch: {
    padding: '0 20px 10px 20px',
    marginBottom: 10,
  },
  paperFirstOne: {
    padding: 20,
  },
  settingsContainer: {
    padding: 10,
    height: `calc(100vh - 56px)`,
    overflowY: 'auto',
  },
  paperSettings: {
    padding: 20,
  },
  input: {
    display: 'none',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  componentDidMount() {
    const interval = setInterval(() => {
      const { countdown, timeLeft, streamingTime, status } = this.props.index;
      if (status === 'countdown') {
        if (countdown > 0) {
          this.props.updateCountdownValue(countdown - 10);
          this.props.updateTimeLeftValue(timeLeft - 1);
        } else {
          this.props.updateStatus('streaming');
        }
      } else if (status === 'streaming') {
        this.props.updateStreamingTime(streamingTime + 1);
      } else if (status === 'myRecords') {
        clearInterval(interval);
      }
    }, 1000);
  }

  onDrop(e) {
    // this.setState({
    //   open: true,
    //   uploading: false,
    //   filesToUpload: {
    //     list: e.target.files
    //   },
    //   title: e.target.files[0].name.slice(0, this.state.titleLimit)
    // })
    const title = e.target.files[0].name.slice(0, 70);
    const filesList = e.target.files;

    console.log(title, filesList);
    

    this.props.onFileDrop(title, filesList);
  }

  uploadFiles() {
    const { index } = this.props;
    const files = index.files.list;
    // const files = e.target.files[0]

    const formData = new FormData();
    formData.append('address', index.wavesAddress);
    formData.append('pageId', index.pageId);
    formData.append('title', index.fileTitle);
    formData.append('descr', '');
    for (let i = 0; i < files.length; i += 1) {
      formData.append(files[i].name, files[i]);
    }

    // this.setState({
    //   uploading: true,
    //   uploadingNoFiles: false,
    //   uploadProgress: 0,
    //   errors: {
    //     list: []
    //   }
    // });

    // const ths = this;
    const formConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      // onUploadProgress: function(progressEvent) {
      //   let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      //   ths.setState({
      //     uploadProgress: percentCompleted,
      //   })
      // }
    };
    
    axios
      .post('http://127.0.0.1:7010/api/v1.0/files', formData, formConfig)
      .then(res => {
        if (res.status === 201) {
          this.props.toggleFileDialog();
          this.props.updateTextField('avatarUrl', index.resAvatarUrl)
        }
      })
      .catch(e => {
        console.error(e.message);
      });
  }

  render() {
    const { classes, index } = this.props;
    const exploreList = index.explore.list.filter(el => {
      const asd = el.tags.map(item => {
        const re = new RegExp(index.searchInput, 'g');
        return item.match(re) !== null;
      });
      return asd.indexOf(true) >= 0;
    });
    return (
      <div className={classes.root}>
        <SwipeableDrawer
          open={index.showDrawer}
          onClose={this.props.toggleDrawer}
          onOpen={this.props.toggleDrawer}
        >
          <div className={classes.menu}>
            <List component="nav">
              <div className={classes.toolbar} />
              <Divider />
              <ListItem
                button
                onClick={() => {
                  this.props.updateStatus('myRecords');
                  this.props.toggleDrawer();
                }}
              >
                <ListItemIcon>
                  <MyRecordsIcon />
                </ListItemIcon>
                <ListItemText primary="Мои записи" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  this.props.updateStatus('research');
                  this.props.toggleDrawer();
                }}
              >
                <ListItemIcon>
                  <ExploreIcon />
                </ListItemIcon>
                <ListItemText primary="Исследовать" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FavIcon />
                </ListItemIcon>
                <ListItemText primary="Сохранено" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <StaredIcon />
                </ListItemIcon>
                <ListItemText primary="Награды" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  this.props.updateStatus('settings');
                  this.props.toggleDrawer();
                }}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Настройки" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AboutIcon />
                </ListItemIcon>
                <ListItemText primary="О программе" />
              </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
        <Dialog
          open={index.showCallbackDialog}
          onClose={this.props.toggleCallBackDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Когда тебе удобнее поговорить?"}</DialogTitle>
          <DialogContent>
            <TextField
              id="time"
              label="Не раньше"
              type="time"
              defaultValue="16:30"
              className={classes.timepicker}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <TextField
              id="time"
              label="Не позже"
              type="time"
              defaultValue="19:30"
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.props.toggleCallBackDialog();
              }}
              color="primary"
            >
              Отмена
            </Button>
            <Button
              onClick={() => {
                this.props.toggleCallback();
                this.props.toggleCallBackDialog();
              }}
              color="primary"
              autoFocus
            >
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
        {index.status === 'countdown' && (
          <div className={classes.danger}>
            <div className={classes.timeout}>
              <CircularProgress
                size={160}
                thickness={2}
                className={classes.countdown}
                variant="static"
                value={index.countdown}
              />
            </div>
            <Typography color="textPrimary">Запуск тревожной кнопки</Typography>
            <Typography
              className={classes.countdownDescr}
              color="textSecondary"
            >
              {index.timeLeft.toString().length < 2
                ? `0:0${index.timeLeft}`
                : `0:${index.timeLeft}`}
            </Typography>
            <div>
              <Button
                size="large"
                className={classes.cancelButton}
                variant="contained"
                // color=""
                onClick={() => {
                  this.props.updateStatus('myRecords');
                }}
              >
                Все в порядке
              </Button>
            </div>
          </div>
        )}
        {index.status === 'streaming' && (
          <div className={classes.chat}>
            <Dialog
              open={index.showHelpOthersDialog}
              onClose={this.props.toggleHelpOthersDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Сделать запись публичной?
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Возможно это поможет кому-то решиться на звонок
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    this.toggleHelpOthersDialog();
                    this.props.updateStatus('myRecords');
                  }}
                  color="primary"
                >
                  Нет
                </Button>
                <Button
                  onClick={() => {
                    this.props.toggleHelpOthersDialog();
                    this.props.updateStatus('myRecords');
                  }}
                  color="primary"
                  autoFocus
                >
                  Да, я согласен
                </Button>
              </DialogActions>
            </Dialog>
            <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                <Hearing className={classes.streamIcon} />
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.grow}
                >
                  {`${(index.streamingTime - (index.streamingTime % 60)) /
                    60}:${
                    (index.streamingTime % 60).toString().length < 2
                      ? `0${index.streamingTime % 60}`
                      : index.streamingTime % 60
                  }`}
                </Typography>
                <Button
                  color="inherit"
                  onClick={() => this.props.toggleHelpOthersDialog()}
                >
                  Завершить
                </Button>
              </Toolbar>
            </AppBar>
            <div className={classes.chatMain}>
              <div className={classes.chatContent}>
                {index.chat.list.map((item, indexIter) => (
                  <Paper
                    className={classNames(
                      classes.paper,
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
          </div>
        )}
        {index.status === 'myRecords' && (
          <div className={classes.records}>
            <AppBar position="static">
              <Toolbar>
                <IconButton color="inherit">
                  <MenuIcon
                    onClick={() => this.props.toggleDrawer()}
                    className={classes.menuButton}
                  />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.grow}
                >
                  Мои записи
                </Typography>
                <IconButton color="inherit">
                  {index.callBack ? (
                    <PhoneCallbackIcon
                      onClick={() => this.props.toggleCallback()}
                    />
                  ) : (
                    <PhoneIcon onClick={() => this.props.toggleCallBackDialog()} />
                  )}
                </IconButton>
              </Toolbar>
            </AppBar>
            <div className={classes.recordsContainer}>
              <Record
                title="10 сентября 2018"
                duration="4 мин 21 сек"
                visible
                stared={false}
              />
              <Record
                title="12 июня 2018"
                duration="7 мин 34 сек"
                visible={false}
                stared
              />
              <Record
                title="9 марта 2018"
                duration="6 мин 05 сек"
                visible={false}
                stared={false}
              />
            </div>
          </div>
        )}
        {index.status === 'research' && (
          <div className={classes.records}>
            <AppBar position="static">
              <Toolbar>
                <IconButton color="inherit">
                  <MenuIcon
                    onClick={() => this.props.toggleDrawer()}
                    className={classes.menuButton}
                  />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.grow}
                >
                  Ты не один
                </Typography>
                <IconButton color="inherit">
                  <MoreIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <div className={classes.recordsContainer}>
              <Paper className={classes.paperSearch}>
                <TextField
                  label="Поиск"
                  fullWidth
                  margin="normal"
                  value={index.searchInput}
                  onChange={e => {
                    this.props.updateTextField('searchInput', e.target.value);
                  }}
                />
              </Paper>
              {exploreList.length > 0 ? (
                exploreList.map((item, indexIter) => (
                  <Record
                    title={item.title}
                    duration={item.duration}
                    tags={item.tags}
                    visible
                    stared={false}
                    key={`record_${indexIter}`}
                  />
                ))
              ) : (
                <Paper className={classes.paperFirstOne}>
                  <Typography paragraph>
                    Подобного запроса пока не было. Поговори об этом, не бойся
                    быть первым.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => this.props.toggleCallBackDialog()}
                  >
                    Заказать звонок
                  </Button>
                </Paper>
              )}
            </div>
          </div>
        )}
        {index.status === 'settings' && (
          <div>
            <Dialog
              open={index.showFilesDialg}
              // onClose={this.handleClose}
              // aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Аватар</DialogTitle>
              <DialogContent>
                <DialogContentText>{index.fileTitle}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  // onClick={(e) => this.setState({open: false})}
                  onClick={this.props.toggleFileDialog}
                  color="primary"
                >
                  Отмена
                </Button>
                <Button onClick={this.uploadFiles} color="primary">
                  Загрузить
                </Button>
              </DialogActions>
            </Dialog>
            <AppBar position="static">
              <Toolbar>
                <IconButton color="inherit">
                  <MenuIcon
                    onClick={() => this.props.toggleDrawer()}
                    className={classes.menuButton}
                  />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.grow}
                >
                  Настройки
                </Typography>
                <IconButton color="inherit">
                  <MoreIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <div className={classes.settingsContainer}>
              <Paper className={classes.paperSettings}>
                {
                  index.avatarUrl ? (
                    <img src={index.avatarUrl} width="100%" alt="asd" />
                  ) : (
                    <img src={index.defaultAvatarUrl} width="100%" alt="asd" />
                  )
                }
                {/* <input
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  ref="fileUpload"
                  onChange={this.onDrop}
                /> */}
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={this.onDrop}
                />
                <label htmlFor="icon-button-file">
                  <Button
                    variant="raised"
                    color="secondary"
                    fullWidth
                    className={classes.button}
                    component="span"
                  >
                    Обновить <CloudUploadIcon />
                  </Button>
                </label>
                {/* <label htmlFor="contained-button-file">
                  <Button
                    containerElement="contained-button-file"
                    variant="raised"
                    color="secondary"
                    fullWidth
                    onClick={() => {
                      console.log('asdzxc');
                    }}
                  >
                    Обновить
                    <CloudUploadIcon className={classes.rightIcon} />
                  </Button>
                </label> */}
              </Paper>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object,
  index: PropTypes.object,
  updateStatus: PropTypes.func,
  updateCountdownValue: PropTypes.func,
  updateTimeLeftValue: PropTypes.func,
  updateStreamingTime: PropTypes.func,
  updateTextField: PropTypes.func,
  sendMessage: PropTypes.func,
  toggleDrawer: PropTypes.func,
  toggleCallBackDialog: PropTypes.func,
  toggleCallback: PropTypes.func,
  toggleHelpOthersDialog: PropTypes.func,
  onFileDrop: PropTypes.func,
  toggleFileDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  index: makeSelectIndex(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateStatus: status => dispatch(updateStatus(status)),
    updateCountdownValue: value => dispatch(updateCountdownValue(value)),
    updateTimeLeftValue: value => dispatch(updateTimeLeftValue(value)),
    updateStreamingTime: value => dispatch(updateStreamingTime(value)),
    updateTextField: (fieldName, fieldValue) =>
      dispatch(updateTextField(fieldName, fieldValue)),
    sendMessage: () => dispatch(sendMessage()),
    toggleDrawer: () => dispatch(toggleDrawer()),
    toggleCallBackDialog: () => dispatch(toggleCallBackDialog()),
    toggleCallback: () => dispatch(toggleCallback()),
    toggleHelpOthersDialog: () => dispatch(toggleHelpOthersDialog()),
    onFileDrop: (title, files) => dispatch(onFileDrop(title, files)),
    toggleFileDialog: () => dispatch(toggleFileDialog()),
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
