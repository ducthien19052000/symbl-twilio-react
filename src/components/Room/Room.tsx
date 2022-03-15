import React from 'react';

import {styled} from '@material-ui/core/styles';
import MainParticipant from '../MainParticipant/MainParticipant';
import useSymblContext from "../../hooks/useSymblContext/useSymblContext";
import CircularProgress from "@material-ui/core/CircularProgress";

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
 
}));

export default function Room() {
  const { isStarting } = useSymblContext();
  return (
    <Container >
      { isStarting ? <CircularProgress /> : undefined}
      <MainParticipant />
    </Container>
  );
}
