import { Link } from "react-router-dom";
import Button from "../../../../Components/Button";
import { TfiTime } from "react-icons/tfi";
import { MdClose } from "react-icons/md";
import avt from "../../../../assets/images/avatar/avatar.jpg";
function SearchHistory({ text = "", closeModal = () => {} }) {
    const dataList = [
        {
            id: 1,
            type: "text",
            text: "tu anh",
        },
        {
            id: 2,
            type: "user",
            text: "tu anh",
            userId: 13,
            userName: "Nguyen Tu Anh",
            avt,
            isFriends: true,
        },
        {
            id: 3,
            type: "text",
            text: "aasd",
        },
        {
            id: 4,
            type: "user",
            text: "tu anh",
            userId: 13,
            userName: "Nguyen Tu Anh",
            avt,
            isFriends: true,
        },
        {
            id: 5,
            type: "user",
            text: "tu anh",
            userId: 13,
            userName: "Nguyen Tu Anh",
            avt,
            isFriends: true,
        },
        {
            id: 6,
            type: "user",
            text: "tu anh",
            userId: 13,
            userName: "Nguyen Tu Anh",
            avt,
            isFriends: true,
        },
    ];
    return (
        <div className="w-full flex flex-col pt-1 px-2 pb-2">
            <div className="flex justify-between items-center w-full px-1">
                <span className=" font-semibold">Gần đây</span>
                <Button
                    _className={
                        " text-blue-500 py-1 px-2 rounded-md hover:bg-hover"
                    }
                >
                    <span>Chỉnh sửa</span>
                </Button>
            </div>
            <div className="w-full">
                {dataList.length > 0 &&
                    dataList.map((item) => (
                        <div className=" relative rounded-md overflow-hidden hover:bg-gray-200">
                            <Link
                                key={item.id}
                                to={
                                    item.userId
                                        ? `/profile/${item.userId}`
                                        : `/search/people/${item.text}`
                                }
                                className="flex justify-between items-center w-full p-2"
                                onClick={closeModal}
                            >
                                <div className="flex items-center h-full">
                                    <div className=" w-[40px] h-[40px] rounded-full mr-2 overflow-hidden">
                                        {item.userId ? (
                                            <img
                                                className=" h-full w-full object-cover object-center"
                                                src={avt}
                                                alt=""
                                            />
                                        ) : (
                                            <span className="flex items-center justify-center w-full h-full bg-gray-200">
                                                <TfiTime className="w-[25px] h-[25px] text-gray-500" />
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className=" font-medium">
                                            {item.userId
                                                ? item.userName
                                                : item.text}
                                        </span>
                                        {item.userId && (
                                            <span className=" text-[13px] text-gray-500">
                                                Bạn bè
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            <div className=" absolute flex items-center h-full top-0 right-0">
                                <Button
                                    _className={
                                        "flex items-center justify-center w-[25px] h-[25px] mr-2 rounded-full hover:bg-gray-300"
                                    }
                                >
                                    <MdClose />
                                </Button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default SearchHistory;
