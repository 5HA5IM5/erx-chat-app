import Loader from '../miscellaneous/Loader'
import { useState } from "react";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import Swal from 'sweetalert2';

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    chats,
    setChats,
  } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      Swal.fire({
        icon: "warning",
        title: 'Oops...',
        text: 'Please Enter something in search',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      console.log(data)
      setSearchResult(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: 'Oops...',
        text: 'Failed to Load the Search Results',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: 'Error fetching the cha',
        text: error.message,
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  };

  return (
    <>
      <div className="sidedrawer">
        <div className="sidedrawer-search">
          <input
            type="text"
            value={search}
            class="searchTerm"
            placeholder="Search User..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit" c
            class="searchButton"
            onClick={handleSearch}>
            <i class="fa fa-search"></i>
          </button>
        </div>

      </div>

      <div className='sidedrawer-list-user'>
        {loading ? (
          <Loader />
        ) : (
          searchResult.length === 0 ? <p>No User Found</p> :
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
        )}

        {loadingChat && <Loader ml="auto" d="flex" />}

      </div>
    </>
  );
}

export default SideDrawer;
