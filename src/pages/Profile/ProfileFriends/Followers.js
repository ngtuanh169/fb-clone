import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userApi from "../../../api/userApi";
import FriendsList from "./FriendsList";
function Followers({
    callApi,
    setCallApi = () => {},
    loading,
    setLoading = () => {},
    userName = "",
}) {
    const { userId } = useParams();
    const [payload, setPayLoad] = useState({
        limit: 6,
        page: 1,
        userName,
    });
    const [friendsList, setFriendsList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    useEffect(() => {
        const getFirends = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId };
                const res = await userApi.getFollowersByUserId(params);
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
    useEffect(() => {
        setCallApi(false);
        const timeId = setTimeout(() => {
            if (userName.trim() !== payload.userName && !loading) {
                setPayLoad({ ...payload, page: 1, userName: userName.trim() });
                setFriendsList([]);
                setTotalPage(1);
                setCallApi(true);
            }
        }, 1000);
        return () => clearTimeout(timeId);
    }, [userName]);
    return <FriendsList data={friendsList} loading={loading} />;
}

export default Followers;
