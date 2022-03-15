import React, {useEffect, useState} from 'react';
import {styled} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import './App.css';
import Room from "./components/Room/Room";
import useRoomState from "./hooks/useRoomState/useRoomState";
import {useAppState} from "./state";
import useVideoContext from "./hooks/useVideoContext/useVideoContext";
import MenuBar from "./components/MenuBar/MenuBar";
import ClosedCaptions from "./components/ClosedCaptions/ClosedCaptions";
import {SymblProvider} from "./components/SymblProvider";
import Controls from "./components/Controls/Controls";

const Container = styled('div')({
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
});

const Main = styled('main')({
    overflow: 'hidden',
});

function App() {
    const {roomState, room} = useRoomState();
    let {URLRoomName, UserName} = useParams();
    const [roomName, setRoomName] = useState(URLRoomName);
    const [userName, setUserName] = useState(UserName);
    const {getToken} = useAppState();
    const {connect} = useVideoContext();

    const [hasStarted, setHasStarted] = useState(false);
    const [isStarting, setIsStarting] = useState(false);

    useEffect(() => {
        if (roomState === 'disconnected' && !hasStarted && !isStarting) {
            if (!(roomName && userName) && (room && room.name && room.localParticipant && room.localParticipant.identity)) {
                !roomName && setRoomName(room.name);
                !userName && setUserName(room.localParticipant.identity);
            }
            if (roomName && userName) {
                setIsStarting(true)
                getToken(userName, roomName).then(token => {
                    connect(token)
                    setIsStarting(false);
                    setHasStarted(true);
                });
            }
        }
    }, [roomName, userName, room]);


    return (
        <Container>
            <MenuBar />
            <Main>
                {roomState !== 'disconnected'&& (
                    <SymblProvider roomName={roomName}>
                        <Room/>
                        <ClosedCaptions />
                        <Controls/>
                    </SymblProvider>
                )}
            </Main>
        </Container>
    );
}

export default App;
