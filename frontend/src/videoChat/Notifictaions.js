import React from 'react'
import { CallState } from '../Context/CallProvider'


const Notifications = () => {
    const { answerCall, call, callAccepted } = CallState();


    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <div>
                    <h1>{call.name} is calling:</h1>
                    <button onClick={answerCall}>ANSWER</button>
                </div>
            )}
        </>
    )
}

export default Notifications