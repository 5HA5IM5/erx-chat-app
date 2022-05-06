import React from 'react'
import '../../Styles/GlobalStyleSheet.css'
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuDivider
} from "@chakra-ui/menu";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { WrapItem } from '@chakra-ui/react';
import { useHistory } from "react-router-dom";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import erxlogo from '../../erx-logo.png'
const Header = () => {
    const {
        setSelectedChat,
        user,
        notification,
        setNotification,
    } = ChatState();

    const history = useHistory();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    return (
        <div className='header'>
            <img
                alt="erx-logo"
                className="header-logo"
                src={erxlogo} />
            <div className='header-corner-tab'>
                <Menu>
                    <MenuButton p={1}>
                        <NotificationBadge
                            count={notification.length}
                            effect={Effect.SCALE}
                        />
                        <BellIcon fontSize="2xl" m={1} color="white" />
                    </MenuButton>
                    <MenuList pl={2}>
                        {!notification.length && "No New Messages"}
                        {notification.map((notif) => (
                            <MenuItem
                                key={notif._id}
                                onClick={() => {
                                    setSelectedChat(notif.chat);
                                    setNotification(notification.filter((n) => n !== notif));
                                }}
                            >
                                {notif.chat.isGroupChat
                                    ? `New Message in ${notif.chat.chatName}`
                                    : `New Message from ${getSender(user, notif.chat.users)}`}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton>
                        <WrapItem>
                            <Avatar size='md' name='Dan Abrahmov' src='http://www.gravatar.com/avatar/9017a5f22556ae0eb7fb0710711ec125?s=128' />
                        </WrapItem>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>My Profile</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div >
    )
}

export default Header