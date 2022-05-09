import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from 'simple-peer'

const CallContext = createContext();

const socket = io('http://localhost:5000');

const CallProvider = ({ children }) => {

    const [working, setWorking] = useState("working")
    const [cstream, setCStream] = useState(null)
    const [me, setMe] = useState('')
    const [call, setCall] = useState({})
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState('')

    // const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        //     .then((currentStream) => {
        //         setStream(currentStream)
        //         myVideo.current.srcObject = currentStream
        //     })

        socket.on('me', (id) => setMe(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, [])


    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, cstream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, cstream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    };


    return (
        <CallContext.Provider value={{
            call,
            callAccepted,
            // myVideo,
            userVideo,
            cstream,
            setCStream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
            working
        }}>
            {children}
        </CallContext.Provider>
    )
}

export const CallState = () => {
    return useContext(CallContext);
};

export default CallProvider;
