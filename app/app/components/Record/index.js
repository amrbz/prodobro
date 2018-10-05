/**
 *
 * Record
 *
 */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';

import PlayIcon from '@material-ui/icons/PlayArrow';
import StarIcon from '@material-ui/icons/Favorite';
import StarEmptyIcon from '@material-ui/icons/FavoriteBorder';
import ChatIcon from '@material-ui/icons/QuestionAnswer';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  root: {},
  record: {
    marginBottom: 10,
  },
  tag: {
    marginRight: 10,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

/* eslint-disable react/prefer-stateless-function */
class Record extends React.PureComponent {
  render() {
    const { classes, title, duration, visible, stared, tags } = this.props;
    return (
      <div className={classes.record}>
        <Card>
          <CardContent>
            <Typography variant="headline">{title}</Typography>
            <Typography variant="subheading" paragraph>{duration}</Typography>
            <Typography variant="subheading" gutterBottom>
              {tags &&
                tags.map((item, index) => (
                  <span className={classes.tag} key={`tag_${index}`}>
                    {`#${item}`}
                  </span>
                ))}
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton>
              <PlayIcon className={classes.playIcon} />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>{stared ? <StarIcon /> : <StarEmptyIcon />}</IconButton>
            <IconButton>
              {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Record.propTypes = {
  title: PropTypes.string,
  duration: PropTypes.string,
  visible: PropTypes.bool,
  stared: PropTypes.bool,
};

export default compose(
  withStyles(styles),
  // withReducer,
  // withSaga,
  // withConnect,
)(Record);
