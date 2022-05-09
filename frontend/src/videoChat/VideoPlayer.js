import React, { useRef, useEffect } from 'react'
import { CallState } from '../Context/CallProvider'
import '../Styles/GlobalStyleSheet.css'

const VideoPlayer = () => {
    const { name, callAccepted, userVideo, callEnded, cstream, setCStream, call } = CallState();
    const myVideo = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setCStream(currentStream)
                myVideo.current.srcObject = currentStream
            })
    }, [])

    return (
        <div className='videoPlayer'>
            {cstream && (
                <div className='videostream'>
                    <h1>{name || 'Name'}</h1>
                    <video playsInline ref={myVideo} autoPlay className='videoPlayer-video' />
                </div>
            )}
            {callAccepted && !callEnded && (
                <div className='videostream'>
                    <h1>{call.name || 'Name'}</h1>
                    <video playsInline muted ref={userVideo} autoPlay className='videoPlayer-video' />
                </div>
            )}

        </div>
    )
}

export default VideoPlayer