import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { formatAvatar } from "../../../../Hooks/useFormat";
import friendsApi from "../../../../api/friendsApi";
import LoadingCircleLine from "../../../LoadingCircleLine";
import Button from "../../../Button";
import { FaUserFriends } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
function ModalAddFriends({ text = "", formValues, setFormValues = () => {} }) {
    const user = useSelector((state) => state.user);
    const divRef = useRef();
    const [payload, setPayload] = useState({
        limit: 5,
        page: 1,
        text: text.trim(),
    });
    const [totalPage, setTotalPage] = useState(1);
    const [friendsList, setFriendsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [callApi, setCallApi] = useState(true);
    useEffect(() => {
        const getFriends = async () => {
            try {
                setLoading(true);
                const params = {
                    ...payload,
                    userId: user.userId,
                };
                const res = await friendsApi.getFriends(params);
                if (res.success && res.count > 0) {
                    setPayload({ ...payload, page: payload.page + 1 });
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    setFriendsList([...friendsList, ...res.data]);
                } else {
                    setTotalPage(0);
                }
                setCallApi(false);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        callApi && user.userId && payload.page <= totalPage && getFriends();
    }, [callApi]);
    useEffect(() => {
        setCallApi(false);
        // console.log(text.trim() !== payload.text.trim());
        const timeId = setTimeout(() => {
            if (!loading && text.trim() !== payload.text.trim()) {
                const _text = text.trim();
                setFriendsList([]);
                setPayload({ ...payload, page: 1, text: _text });
                setTotalPage(1);
                setCallApi(true);
            }
        }, 500);
        return () => clearTimeout(timeId);
    }, [text.trim()]);
    useEffect(() => {
        const handleOnScroll = (e) => {
            if (
                e.target.scrollHeight - 2 <
                e.target.offsetHeight + e.target.scrollTop
            ) {
                !loading && setCallApi(true);
            } else {
                !loading && setCallApi(false);
            }
        };
        !loading &&
            divRef.current &&
            divRef.current.addEventListener("scroll", handleOnScroll);
        return () =>
            divRef.current &&
            divRef.current.removeEventListener("scroll", handleOnScroll);
    }, [loading]);

    const handleAddFriend = (id, userName) => {
        id &&
            userName &&
            setFormValues({
                ...formValues,
                addFriends: [...formValues.addFriends, { id, userName }],
            });
    };
    return (
        <div
            style={{
                boxShadow: "rgb(142, 141, 141) 0px 1px 10px",
            }}
            className="group absolute bottom-[110%] left-0 w-full p-2 bg-white rounded-md"
        >
            <div
                ref={divRef}
                className="flex flex-col w-full max-h-[200px] p-2 scrollbar-thin scrollbar-thumb-transparent 
                        scrollbar-thumb-rounded-full group-hover:scrollbar-thumb-gray-400"
            >
                {payload.text == "" && !loading && (
                    <div className="w-full mb-1">
                        <span className=" font-medium"> Gợi ý</span>
                    </div>
                )}
                {friendsList.length == 0 && !loading && (
                    <div className="flex flex-col items-center w-full ">
                        <FaUserFriends className="text-gray-500 text-[25px]" />
                        <span className="text-gray-500">
                            Không bạn bè nào để hiển thị
                        </span>
                    </div>
                )}
                {friendsList.length > 0 &&
                    friendsList.map((item) => {
                        const findId = formValues.addFriends.findIndex(
                            (data) => data?.id == item.id
                        );
                        const added = findId >= 0 ? true : false;
                        return (
                            <Button
                                key={item.id}
                                _className={
                                    "flex items-center w-full p-2 rounded-md hover:bg-gray-200"
                                }
                                onClick={() =>
                                    !added &&
                                    handleAddFriend(item.id, item.userName)
                                }
                            >
                                <img
                                    className="h-10 w-10 border rounded-full"
                                    src={formatAvatar(
                                        item.userAvt,
                                        item.userSx
                                    )}
                                    alt=""
                                />
                                <span className="grow flex flex-col text-left pl-2">
                                    <span className="text-[15px] font-normal">
                                        {item.userName}
                                    </span>
                                    {item.countFriends > 0 && (
                                        <span className="text-[13px] font-normal">
                                            {item.countFriends} bạn bè
                                        </span>
                                    )}
                                </span>
                                {added && (
                                    <span>
                                        <AiOutlineCheck className="text-blue-500" />
                                    </span>
                                )}
                            </Button>
                        );
                    })}
                {loading && (
                    <div className="flex justify-center w-full mt-2 ">
                        <div className="w-5 h-5">
                            <LoadingCircleLine />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalAddFriends;
