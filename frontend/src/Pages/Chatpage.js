import { useState, useEffect } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import '../Styles/GlobalStyleSheet.css'
import Header from "../components/miscellaneous/Header";
import Fade from 'react-reveal/Fade';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChatIcon from '@mui/icons-material/Chat';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import DuoIcon from '@mui/icons-material/Duo';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import GroupsIcon from '@mui/icons-material/Groups';
import Loader from "../components/miscellaneous/Loader";
import GroupChatModal from "../components/miscellaneous/GroupChatModal";
import Chat from "@mui/icons-material/Chat";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [newusers, setNewUsers] = useState(false);
  const [mychats, setMychats] = useState(true);
  const { user } = ChatState();

  useEffect(() => {
    const refresher = () => {
      window.location.reload()
    }

    if (user === null) {
      refresher()
    }
    return () => {
      if (user === undefined) {
        refresher()
      }
    }
  }, [])

  return (
    <>
      {user ?
        <div className="chatpage-top">
          <Header />

          <div className="chatpage">
            <div className="chatpage-sidenav">
              <div className="chatpage-sidenav-icons">
                <NotificationsActiveIcon />
                <ChatIcon />

                {
                  user.isAdmin === true ?
                    <GroupChatModal>
                      <GroupsIcon />
                    </GroupChatModal>
                    : ""
                }
                <WifiCalling3Icon />
                <DuoIcon />
                <FileCopyIcon />
                <MoreHorizIcon />
              </div>

            </div>
            <div className="chatpage-left">
              <div className="chatpage-tab-link">
                <button className={`chatpage-left-tab-link ${newusers && 'chatpage-active'}`} onClick={() => (setNewUsers(true) & setMychats(false))}>USERS</button>
                <button className={`chatpage-left-tab-link  ${mychats && 'chatpage-active'}`} onClick={() => (setMychats(true) & setNewUsers(false))} >MY CHATS</button>
              </div>
              <span className={`${newusers ? ' show' : 'hide'}`}>
                <Fade>
                  {user && <SideDrawer />}
                </Fade>
              </span>
              <span className={`${mychats ? ' show' : 'hide'}`}>
                <Fade>
                  {user && <MyChats fetchAgain={fetchAgain} />}
                </Fade>
              </span>
            </div>

            <div className="chatpage-right">
              {user && (
                <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
              )}
            </div>
          </div>
        </div>
        :
        <Loader />
      }

    </>
  );
};

export default Chatpage;
