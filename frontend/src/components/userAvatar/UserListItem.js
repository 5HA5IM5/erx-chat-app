
import Zoom from 'react-reveal/Zoom';

const UserListItem = ({ handleFunction, user }) => {

  return (
    <>
      <Zoom>
        <div className="UserListItem" onClick={handleFunction}>
          <a href="https://twitter.com/twcloudchen" class="circle">
            <img height="128" width="128" src="http://www.gravatar.com/avatar/9017a5f22556ae0eb7fb0710711ec125?s=128" alt="Cloud Chen" />
          </a>
          <div className="UserListItem-desc">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
      </Zoom>


    </>

  );
};

export default UserListItem;
