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
      className={`d-flex p-3 flex-column ${
        user.email == props.msg.email ? "align-items-end " : "align-items-start"
      }`}
    >
      <span>{props.msg.username}</span>
      <span>{props.msg.text}</span>
    </div>
  );
};

export default MsgCard;
