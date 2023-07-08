import { useState } from "react";
import Button from "../Button";
import Item from "./Item";
import avt from "../../assets/images/avatar/avatar.jpg";
function NewNotification({ chidren }) {
    const dataFriendRequest = {
        id: 1,
        type: "friendRequest",
        userId: 231,
        userName: "Nguyen Tu Anh",
        avt,
        time: 1685716211822,
    };
    const dataLikePost = {
        id: 2,
        type: "likePost",
        userId: 231,
        userName: "Nguyen Tu Anh",
        avt,
        time: 1685716211822,
        postsId: 12,
        textPosts:
            "Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr xu",
    };
    const dataCommentPost = {
        id: 3,
        type: "commentPost",
        userId: 231,
        userName: "Nguyen Tu Anh",
        avt,
        time: 1685716211822,
        postsId: 12,
        textPosts:
            "Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr xu",
    };
    const dataCommentPostGroup = {
        id: 4,
        type: "commentPost",
        userId: 231,
        userName: "Nguyen Tu Anh",
        avt,
        time: 1685716211822,
        groupId: 123,
        groupName: "Ninja School Online Sv5 Katana",
        postsId: 12,
        textPosts:
            "Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr xu",
    };
    const dataLikePostGroup = {
        id: 5,
        type: "likePost",
        userId: 231,
        userName: "Nguyen Tu Anh",
        avt,
        time: 1685716211822,
        groupId: 123,
        groupName: "Ninja School Online Sv5 Katana",
        postsId: 12,
        textPosts:
            "Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr xu",
    };
    const dataRequestJoinGroup = {
        id: 9,
        users: [{ id: 23, name: "Tạ Hoàng Đức" }],
        avt: avt,
        time: "1680586641002",
        type: "RequestJoinGroup",
        groupId: 123,
        groupName: "Ninja School Online Sv5 Katana",
        group: true,
    };

    const [notiList, setNotiList] = useState([]);
    const addNoti = (data) => {
        const idNoti = new Date().getTime();
        setNotiList([...notiList, { idNoti, ...data }]);
    };

    return (
        <div className=" fixed bottom-3 left-3 flex flex-col justify-end z-50">
            <div className="flex">
                <Button
                    _className={
                        "bg-blue-500 text-white font-medium p-2 rounded-md mr-2"
                    }
                    onClick={() => addNoti(dataFriendRequest)}
                >
                    friendRequest
                </Button>
                <Button
                    _className={
                        "bg-gray-500 text-white font-medium p-2 rounded-md mr-2"
                    }
                    onClick={() => addNoti(dataLikePost)}
                >
                    likePost
                </Button>
                {/* <Button
                    _className={
                        "bg-green-500 text-white font-medium p-2 mr-2 rounded-md"
                    }
                    onClick={() => addNoti(dataCommentPost)}
                >
                    commentPost
                </Button>
                <Button
                    _className={
                        "bg-green-500 text-white font-medium p-2 mr-2 rounded-md"
                    }
                    onClick={() => addNoti(dataCommentPostGroup)}
                >
                    commentPostGroup
                </Button>
                <Button
                    _className={
                        "bg-green-500 text-white font-medium p-2 rounded-md"
                    }
                    onClick={() => addNoti(dataLikePostGroup)}
                >
                    likePostGroup
                </Button>
                <Button
                    _className={
                        "bg-green-500 text-white font-medium p-2 ml-2 rounded-md"
                    }
                    onClick={() => addNoti(dataRequestJoinGroup)}
                >
                    joinGroup
                </Button> */}
            </div>
            {notiList.length > 0 &&
                notiList.map((item) => (
                    <Item
                        key={item.idNoti}
                        data={item}
                        notiList={notiList}
                        setNotiList={setNotiList}
                    />
                ))}
        </div>
    );
}

export default NewNotification;
