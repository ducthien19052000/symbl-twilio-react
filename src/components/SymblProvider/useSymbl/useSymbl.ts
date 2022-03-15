
import {useCallback, useState} from 'react';
import SymblWebSocketAPI from "../../../utils/symbl/SymblWebSocketAPI";

declare const window: Window & typeof globalThis &{
    connector:any;
    websocketApi:any
}

export default function useSymbl(onError, onResult, options) {
    const [isStarting, setIsStarting] = useState(false);
    const [connectionId, setConnectionId] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isMute, setIsMuted] = useState(false);
    const [startedTime, setStartedTime] = useState(null);

    const stopSymbl = useCallback(async (connectionId) => {
        console.log('Stop symbl called for connectionId: ', connectionId, window.connector);
        if (window.connector) {
            console.log('Stopping Symbl: ', connectionId);
            try {
                const response = await window.connector.stopSymbl(connectionId)
                if (response && response.connectionId) {
                    console.log('Connection Stopped: ', response.connectionId);
                } else {
                    onError("Symbl couldn't be stopped.");
                }
                setIsConnected(false);
            } catch(err) {
                onError(err);
            }
        }
    }, [onError]);

    const startSymblWebSocketApi = useCallback(
        async (handlers, options) => {
            if (isStarting) {
                
                console.log('Another connection already starting. Returning');
            }
            setIsStarting(true);
            window.websocketApi = new SymblWebSocketAPI('en-US',
                handlers, options);
                // {
                //     participants,
                //     localParticipant,
                //     meetingId,
                //     meetingTitle
                // });
            try {
                await window.websocketApi.openConnectionAndStart();
                setStartedTime(new Date().toISOString());
                setIsConnected(true);
                setIsStarting(false);
            } catch (err) {
                onError(err);
                setIsStarting(false);
            }
        },
        [onError]
    );

    const stopSymblWebSocketApi = useCallback(
        async (callback) => {
            if (window.websocketApi) {
                try {
                    await window.websocketApi.stop(callback)
                    setIsConnected(false);
                } catch (err) {
                    onError(err);
                }
            }
        },
        [onError]
    );

    const muteSymbl = useCallback(
        () => {
            if (window.websocketApi) {
                try {
                    window.websocketApi.mute()
                    setIsMuted(true);
                } catch (err) {
                    onError(err);
                }
            }
        },
        [onError]
    );

    const unMuteSymbl = useCallback(
        () => {
            if (window.websocketApi) {
                try {
                    window.websocketApi.unmute()
                    setIsMuted(false);
                } catch (err) {
                    onError(err);
                }
            }
        },
        [onError]
    );

    return {
        isConnected,
        isStarting,
        connectionId,
        stopSymbl,
        startSymblWebSocketApi,
        stopSymblWebSocketApi,
        muteSymbl,
        isMute,
        unMuteSymbl,
        startedTime
    };
}
