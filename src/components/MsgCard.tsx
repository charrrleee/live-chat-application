import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface MsgCardProps {
  msg: Message;
}

const MsgCard: React.FC<MsgCardProps> = (props: MsgCardProps) => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div
      key={props.msg.username}
      className={`d-flex p-3 flex-column m-1 rounded ${
        user.email == props.msg.email
          ? "align-items-end bg-secondary"
          : "align-items-start bg-dark text-white"
      }`}
    >
      <span className="h">{props.msg.text}</span>
      <span>{props.msg.username}</span>
    </div>
  );
};

export default MsgCard;
