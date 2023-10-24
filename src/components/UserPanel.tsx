import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import app from "../firebase";
import utils from "../utils/date";

interface User {
    name: string;
    email: string;
    lastSeen: string;
}

const UserPanel:React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    const listUsers = async () => {
        console.log("run listUsers")
        const db = getFirestore(app);
        const userCol = collection(db, 'users')
        const snapshot = await getDocs(userCol);
        setUsers(snapshot.docs.map(
            (doc) => { 
                const date = doc.data().lastSeen.toDate()
                const user: User = {
                    name: doc.data().name,
                    email: doc.data().email,
                    lastSeen: utils.formatDate(date),
                };
                console.log(user);
                return user
            }))
    }

    useEffect(() => {
        console.log("run")
        return () => {listUsers()}
    }, [])


    return (
        <div>
            <div>
                <img></img>
                <div>Name TBC</div>
                <div>Last update TBC</div>
            </div>
            {users.map((user, idx) => (
                <div key={idx}>
                    <div>{user.email}</div>
                    <div>{user.email}</div>
                    <div>Last update: {user.lastSeen}</div> 
                </div>
            ))}

        </div>
    );
}

export default UserPanel;