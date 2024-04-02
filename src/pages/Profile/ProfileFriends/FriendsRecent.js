import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import friendsApi from "../../../api/friendsApi";
import FriendsList from "./FriendsList";
function FriendsRecent({ loading, setLoading = () => {}, userName = "" }) {
    const { userId } = useParams();
    const [payload, setPayLoad] = useState({
        limit: 6,
        userName,
    });
    const [friendsList, setFriendsList] = useState([]);

    useEffect(() => {
        const getFirends = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId };
                const res = await friendsApi.getFriendsRecent(params);
                if (res.success) {
                    setFriendsList([...res.data]);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getFirends();
    }, [userId, payload]);
    useEffect(() => {
        const timeId = setTimeout(() => {
            if (userName.trim() !== payload.userName && !loading) {
                setPayLoad({ ...payload, userName: userName.trim() });
                setFriendsList([]);
            }
        }, 1000);
        return () => clearTimeout(timeId);
    }, [userName]);
    return <FriendsList data={friendsList} loading={loading} />;
}

export default FriendsRecent;
