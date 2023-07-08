import { useEffect } from "react";
import MainCard from "../../MainCard";
import Button from "../../Button";
import CommentPost from "../../Modal/Notification/NotifyItem/CommentPost";
import FriendRequest from "../../Modal/Notification/NotifyItem/FriendRequest";
import LikedPost from "../../Modal/Notification/NotifyItem/LikedPost";
import RequestJoinGroup from "../../Modal/Notification/NotifyItem/RequestJoinGroup";
import { RiCloseLine } from "react-icons/ri";
function Item({ data, notiList = [], setNotiList = () => {} }) {
    let Comp = CommentPost;
    switch (data.type) {
        case "friendRequest":
            Comp = FriendRequest;
            break;
        case "likePost":
            Comp = LikedPost;
            break;
        case "commentPost":
            Comp = CommentPost;
            break;
        case "RequestJoinGroup":
            Comp = RequestJoinGroup;
            break;
    }
    useEffect(() => {
        const timeId = setTimeout(() => {
            removeNoti(data.id);
        }, 3000);
        return () => clearTimeout(timeId);
    });
    const removeNoti = (id) => {
        const newArray = notiList.filter((item) => item.id !== id);
        setNotiList([...newArray]);
    };
    return (
        <div className="w-max h-max ">
            <div
                style={{ boxShadow: "0 1px 3px 2px #ccc" }}
                className=" w-[328px] mt-2 bg-white animate-openNewNoti rounded-lg"
            >
                {/* <MainCard> */}
                <div className="flex flex-col w-full p-2 ">
                    <div className="flex justify-between w-ful px-2">
                        <div className="">
                            <span className=" font-medium">Thông báo mới</span>
                        </div>
                        <div className="flex items-center h-full">
                            <Button
                                _className={
                                    "flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full overflow-hidden hover:bg-gray-300"
                                }
                                onClick={() => removeNoti(data.id)}
                            >
                                <RiCloseLine className="text-[15px]" />
                            </Button>
                        </div>
                    </div>
                    <Comp data={data} newNoti={true} />
                </div>
                {/* </MainCard> */}
            </div>
        </div>
    );
}

export default Item;
