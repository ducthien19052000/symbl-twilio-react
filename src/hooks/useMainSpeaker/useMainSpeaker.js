import useVideoContext from '../useVideoContext/useVideoContext';
import useDominantSpeaker from '../useDominantSpeaker/useDominantSpeaker';


import useSelectedParticipant from '../../components/VideoProvider/useSelectedParticipant/useSelectedParticipant';

export default function useMainSpeaker() {
  const [selectedParticipant] = useSelectedParticipant();
  const dominantSpeaker = useDominantSpeaker();

  const {
    room: { localParticipant },
  } = useVideoContext();

  // The participant that is returned is displayed in the main video area. Changing the order of the following
  // variables will change the how the main speaker is determined.
  return selectedParticipant || dominantSpeaker || localParticipant;
}
