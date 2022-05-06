import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {

  return (
    <div>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div >
  );
};

export default Chatbox;
