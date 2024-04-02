import { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ScreenSize } from "../../../../App";
import { formatAvatar, formatNumber } from "../../../../Hooks/useFormat";
import { SocketContext } from "../../../../Socket";
import friendsApi from "../../../../api/friendsApi";
import invitationJoinGroupApi from "../../../../api/invitationJoinGroupApi";
import Modal from "../../../../Components/Modal/index";
import MainCard from "../../../../Components/MainCard";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import LoadingCircleLine from "../../../../Components/LoadingCircleLine";
import Button from "../../../../Components/Button";
import { MdClose, MdOutlineSearch } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
function AddMembers({ closeModal = () => {} }) {
    const user = useSelector((state) => state.user);
    const screenSize = useContext(ScreenSize);
    const socketContext = useContext(SocketContext);
    const { groupId } = useParams();
    const divRef = useRef();
    const [name, setName] = useState("");
    const [friendsList, setFriendsList] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [payload, setPayload] = useState({
        limit: 15,
        page: 1,
        name,
    });
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    useEffect(() => {
        const getFriends = async () => {
            try {
                setLoading(true);
                const params = { ...payload, groupId };
                const res = await friendsApi.getFriendsNotInGroup(params);
                if (res.success && res.count > 0) {
                    setFriendsList([...friendsList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                } else {
                    setTotalPage(0);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        groupId && !loading && payload.page <= totalPage && getFriends();
    }, [payload]);

    useEffect(() => {
        const timeId = setTimeout(() => {
            if (name.trim() !== payload.name) {
                setFriendsList([]);
                setTotalPage(1);
                setPayload({ ...payload, page: 1, name: name.trim() });
            }
        }, 700);
        return () => clearTimeout(timeId);
    }, [name]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = divRef.current.scrollHeight;
            const offsetHeight = divRef.current.offsetHeight;
            const scrollTop = divRef.current.scrollTop;
            if (scrollHeight - 2 < offsetHeight + scrollTop) {
                !loading && setPayload({ ...payload, page: payload.page + 1 });
            }
        };
        !loading &&
            divRef.current &&
            divRef.current.addEventListener("scroll", handleScroll);
        return () =>
            !loading &&
            divRef.current &&
            divRef.current.removeEventListener("scroll", handleScroll);
    }, [loading]);

    const handleAddFriend = (data) => {
        const checkId = selectedFriends.findIndex(
            (item) => item?.userId === data.userId
        );
        if (checkId < 0) {
            setSelectedFriends([...selectedFriends, data]);
        } else {
            const newArr = selectedFriends.filter(
                (item) => item.userId !== data.userId
            );
            setSelectedFriends(newArr);
        }
    };

    const deleteSelected = (userId) => {
        const newArr = selectedFriends.filter((item) => item.userId !== userId);
        setSelectedFriends(newArr);
    };

    const sendInvitations = async (usersList) => {
        console.log(usersList);
        try {
            setLoading1(true);
            const arr = usersList.map((item) => item.userId);
            const params = new FormData();
            params.append("friendsList", JSON.stringify(arr));
            params.append("groupId", groupId);
            const res = await invitationJoinGroupApi.add(params);
            if (res.success) {
                if (res.data.sendUsersList.length > 0) {
                    const sendData = {
                        senderId: user.userId,
                        senderName: `${user.fName} ${user.lName}`,
                        senderAvt: user.avatar,
                        senderSx: user.sx,
                        receiverId: res.data.sendUsersList,
                        type: res.data.type,
                        typeNoti: res.data.typeNoti,
                        content: res.data.content,
                        groupId: res.data.groupId,
                        groupName: res.data.groupName,
                        time: res.data.time,
                    };
                    socketContext &&
                        socketContext.send(JSON.stringify(sendData));
                }
                closeModal();
            }
            setLoading1(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Modal closeModal={closeModal}>
            <div className=" w-full px-2 md:w-[700px] m-auto md:px-0">
                <MainCard>
                    <div className="flex flex-col w-full">
                        <div className=" relative flex items-center justify-center w-full h-[60px] border">
                            <span className="text-[20px] font-bold">
                                Mời bạn bè tham gia nhóm này
                            </span>
                            <div className=" absolute top-0 right-[12px] flex items-center h-full">
                                <Button
                                    _className={`flex items-center justify-center w-9 h-9 rounded-full 
                                        bg-gray-200 hover:bg-gray-300`}
                                    onClick={closeModal}
                                >
                                    <MdClose className="text-[20px]" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex w-full ">
                            <div className="flex flex-col gap-2 w-full md:w-2/3 px-2 pt-2 h-[250px]">
                                <div className="w-full ">
                                    <div className="flex w-full pr-2 rounded-full bg-gray-100">
                                        <label
                                            className="flex items-center justify-center w-9 h-9"
                                            htmlFor="text"
                                        >
                                            <MdOutlineSearch className="text-[16px] text-gray-500" />
                                        </label>
                                        <input
                                            className="grow bg-transparent outline-none"
                                            id="text"
                                            type="text"
                                            placeholder="Tìm kiếm bạn bè theo tên"
                                            value={name}
                                            onChange={(e) =>
                                                !loading &&
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div
                                    ref={divRef}
                                    className=" grow flex flex-col w-full scrollbar-thin scrollbar-thumb-gray-300
                                     scrollbar-thumb-rounded-full"
                                >
                                    {!name.trim() && (
                                        <span className="px-2 pb-2 font-semibold text-[17px]">
                                            Gợi ý
                                        </span>
                                    )}
                                    {friendsList.length > 0 &&
                                        friendsList.map((item) => {
                                            let selected = undefined;
                                            if (selectedFriends.length > 0) {
                                                selected = selectedFriends.find(
                                                    (el) =>
                                                        el?.userId ===
                                                        item.userId
                                                );
                                            }
                                            return (
                                                <div
                                                    key={item.userId}
                                                    className="flex justify-between items-center w-full p-2 rounded-md
                                                         cursor-pointer hover:bg-gray-200"
                                                    onClick={() =>
                                                        handleAddFriend(item)
                                                    }
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className=" relative w-10 h-10">
                                                            <img
                                                                className=" w-full h-full rounded-full object-cover object-center border"
                                                                src={formatAvatar(
                                                                    item.userAvt,
                                                                    item.userSx
                                                                )}
                                                                alt=""
                                                            />
                                                            {item.online && (
                                                                <span
                                                                    className=" absolute bottom-0 right-0 block w-3 h-3 rounded-full
                                                                         bg-green-500 border-2 border-white"
                                                                ></span>
                                                            )}
                                                        </div>
                                                        <span className=" font-medium">
                                                            {item.userName}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={`flex items-center justify-center w-5 h-5 rounded border-2
                                                             ${
                                                                 selected
                                                                     ? "border-blue-500 bg-blue-500"
                                                                     : "border-gray-500"
                                                             }`}
                                                    >
                                                        {selected && (
                                                            <BsCheckLg className="text-white text-[11px]" />
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    {!loading && friendsList.length === 0 && (
                                        <span className=" font-medium text-gray-500 m-auto">
                                            Không tìm thấy bạn bè phù hợp
                                        </span>
                                    )}
                                    {loading &&
                                        Array(3)
                                            .fill(0)
                                            .map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 w-full p-2"
                                                >
                                                    <div className="w-10 h-10">
                                                        <SkeletonLoading
                                                            circle
                                                        />
                                                    </div>
                                                    <div className=" w-[150px] h-[30px] rounded-md overflow-hidden">
                                                        <SkeletonLoading />
                                                    </div>
                                                </div>
                                            ))}
                                </div>
                            </div>
                            {screenSize.width >= 768 && (
                                <div className="flex flex-col gap-2 w-full md:w-1/3 h-[250px] p-2 bg-gray-100">
                                    <span className=" mb-2 font-semibold text-[13px] text-gray-500 uppercase	">
                                        {`Đã chọn ${formatNumber(
                                            selectedFriends.length
                                        )} người bạn`}
                                    </span>
                                    <div
                                        className="grow flex flex-col gap-4 w-full scrollbar-thin scrollbar-thumb-gray-300
                                     scrollbar-thumb-rounded-full"
                                    >
                                        {selectedFriends.length > 0 &&
                                            selectedFriends.map((item) => (
                                                <div
                                                    key={item.userId}
                                                    className="flex justify-between items-center gap-2 w-full"
                                                    onClick={() =>
                                                        deleteSelected(
                                                            item.userId
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className=" relative w-10 h-10">
                                                            <img
                                                                className="w-full h-full object-cover object-center rounded-full border"
                                                                src={formatAvatar(
                                                                    item.userAvt,
                                                                    item.userSx
                                                                )}
                                                                alt=""
                                                            />
                                                            {item.online && (
                                                                <span className=" absolute right-0 bottom-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                                            )}
                                                        </div>

                                                        <span className=" font-medium ">
                                                            {item.userName}
                                                        </span>
                                                    </div>
                                                    <Button _className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-300">
                                                        <MdClose />
                                                    </Button>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-2 w-full p-3 border-t-2">
                            <Button
                                _className={`p-2 rounded-md hover:bg-gray-200`}
                                onClick={closeModal}
                            >
                                <span className=" font-medium text-blue-500">
                                    Hủy
                                </span>
                            </Button>
                            <Button
                                _className={`flex gap-2 p-2 rounded-md ${
                                    selectedFriends.length > 0
                                        ? "bg-blue-500 text-white hover:bg-blue-600"
                                        : "bg-gray-200 text-gray-300"
                                }`}
                                cursorDefault={
                                    selectedFriends.length === 0 || loading1
                                }
                                onClick={() =>
                                    selectedFriends.length > 0 &&
                                    !loading1 &&
                                    sendInvitations(selectedFriends)
                                }
                            >
                                {loading1 && (
                                    <span className="block w-5 h-5">
                                        <LoadingCircleLine />
                                    </span>
                                )}
                                <span className={`font-semibold `}>
                                    Gửi lời mời
                                </span>
                            </Button>
                        </div>
                    </div>
                </MainCard>
            </div>
        </Modal>
    );
}

export default AddMembers;
