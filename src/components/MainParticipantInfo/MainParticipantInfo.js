import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gridArea: 'participantList',
    height: '100vh'
  },
  isVideoSwitchedOff: {
    '& video': {
      filter: 'blur(4px) grayscale(1) brightness(0.5)',
    },
  },
  identity: {
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '0.1em 0.3em',
    margin: '1em',
    fontSize: '1.2em',
    display: 'inline-flex',
    '& svg': {
      marginLeft: '0.3em',
    },
  },
  infoContainer: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    padding: '0.4em',
    width: '100%',
  },
});

export default function MainParticipantInfo({ participant = {}, children }) {
  const classes = useStyles();


  
  return (
    <div
      data-cy-main-participant
      className={clsx(classes.container)}
    >
      <div className={classes.infoContainer}>
        <h4 className={classes.identity}>
          {participant.identity}
        </h4>
      </div>
      {children}
    </div>
  );
}
