import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import friendsApi from "../../../api/friendsApi";
import FriendsList from "./FriendsList";
function FriendsCurrentCity({
    callApi,
    setCallApi = () => {},
    loading,
    setLoading = () => {},
}) {
    const { userId } = useParams();
    const [payload, setPayLoad] = useState({
        limit: 6,
        page: 1,
    });
    const [friendsList, setFriendsList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    useEffect(() => {
        const getFirends = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId };
                const res = await friendsApi.getFriendsCurrentCity(params);
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
        callApi && payload.page <= totalPage && getFirends();
    }, [callApi]);

    return <FriendsList data={friendsList} loading={loading} />;
}

export default FriendsCurrentCity;
