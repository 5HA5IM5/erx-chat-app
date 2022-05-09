import React from 'react'
import VideoPlayer from './VideoPlayer'
import Options from './Options'
import Notifications from './Notifictaions'
import { Link } from 'react-router-dom'
import CallProvider, { CallState } from '../Context/CallProvider'
import '../Styles/GlobalStyleSheet.css'

const VideoChat = () => {
    return (
        <div className='videoChat'>
            <VideoPlayer />
            <Options>
                <Notifications />
            </Options>
            <Link to={"/chats"}>
                <button>Back</button>
            </Link>
        </div>
    )
}

export default VideoChat