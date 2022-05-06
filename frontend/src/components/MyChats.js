import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import Loader from "./miscellaneous/Loader";
import Swal from 'sweetalert2'

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Occured!',
        text: 'Failed to Load the chats',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <>
      {chats ? (
        <div className="mychats">
          {chats.map((chat) => (
            <div
              onClick={() => setSelectedChat(chat)}
              key={chat._id}
              className="mychats-listitem"
            >
              <div className="mychats-content">
                <p>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : <p><b>Group Name: </b> {chat.chatName}</p>}
                </p>
                {chat.latestMessage && (
                  <p >
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )
      }
    </>
  );
};

export default MyChats;
