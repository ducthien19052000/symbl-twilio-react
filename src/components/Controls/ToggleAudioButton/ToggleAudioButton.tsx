import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import React from 'react';
import useSymblContext from "../../../hooks/useSymblContext/useSymblContext";


const useStyles = makeStyles((theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
);

export default function ToggleAudioButton(props) {
  const classes = useStyles();

  const {muteSymbl, unMuteSymbl, isMute} = useSymblContext();
  return (
    <Tooltip
      title={isMute ? 'Mute Audio' : 'Unmute Audio'}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab className={classes.fab} onClick={() => { 
        if (isMute) {
          unMuteSymbl();
        } else {
          muteSymbl();
        }
      }} disabled={props.disabled} data-cy-audio-toggle>
        {isMute ? <MicOff/> : <Mic /> }
      </Fab>
    </Tooltip>
  );
}
