import { Button } from '@mui/material';
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CallState } from '../Context/CallProvider'
import '../Styles/GlobalStyleSheet.css'

const Options = ({ children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = CallState();
    const [idToCall, setIdToCall] = useState('')
    console.log('calling', idToCall)
    return (
        <div className='options'>
            <div className='option-boxes'>
                <div className='option-box'>
                    <h1>Account Info</h1>
                    {console.log('id', me)}
                    <input className='option-input' value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='option-box'>
                    <h1>Make A Call</h1>
                    <input className='option-input' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
                </div>
            </div>


            <div className='call-feat'>
                {
                    callAccepted && !callEnded ? (
                        <button className='hangbutton' onClick={leaveCall}>Hang Up</button>
                    ) : (
                        <button className='callbtn' onClick={() => callUser(idToCall)}>Call</button>
                    )
                }

                {children}
            </div>

        </div>
    )
}

export default Options