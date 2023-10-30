import User from "../types/User";
import utils from "../utils/date";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = (props: UserCardProps) => {
  return (
    <div className="p-3 bg-primary">
      <div key={props.user.email + props.user.name}>
        <div>{props.user.name}</div>
        <div>{props.user.email}</div>
        <div>Last update: {utils.formatDate(props.user.lastSeen)}</div>
      </div>
    </div>
  );
};

export default UserCard;
