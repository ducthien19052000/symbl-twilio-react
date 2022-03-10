import MainParticipantInfo from '../MainParticipantInfo/MainParticipantInfo';

import React from 'react';
import useMainSpeaker from '../../hooks/useMainSpeaker/useMainSpeaker';



export default function MainParticipant() {
  const mainParticipant = useMainSpeaker();
 

  return (

    <MainParticipantInfo participant={mainParticipant}>
  
    </MainParticipantInfo>
  );
}
