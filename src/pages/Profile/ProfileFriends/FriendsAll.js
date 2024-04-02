import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import friendsApi from "../../../api/friendsApi";
import FriendsList from "./FriendsList";
function FriendsAll({
    callApi,
    setCallApi = () => {},
    loading,
    setLoading = () => {},
    userName = "",
}) {
    const { userId } = useParams();
    const [payload, setPayLoad] = useState({
        limit: 9,
        page: 1,
        text: userName,
    });
    const [friendsList, setFriendsList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        const getFirends = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId };
                const res = await friendsApi.getFriends(params);
                if (res.success && res.count > 0) {
                    setFriendsList([...friendsList, ...res.data]);
                    setPayLoad({ ...payload, page: payload.page + 1 });
                    setTotalPage(Math.ceil(res.count / payload.limit));
                } else {
                    setTotalPage(0);
                }
                setCallApi(false);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        if (callApi && payload.page <= totalPage) getFirends();
    }, [callApi]);
    useEffect(() => {
        setCallApi(false);
        const timeId = setTimeout(() => {
            if (userName.trim() !== payload.text && !loading) {
                setPayLoad({ ...payload, page: 1, text: userName.trim() });
                setFriendsList([]);
                setTotalPage(1);
                setCallApi(true);
            }
        }, 1000);
        return () => clearTimeout(timeId);
    }, [userName]);
    return <FriendsList data={friendsList} loading={loading} />;
}

export default FriendsAll;
