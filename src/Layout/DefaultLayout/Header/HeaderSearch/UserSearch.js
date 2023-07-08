import { Link } from "react-router-dom";
import Button from "../../../../Components/Button";
import avt from "../../../../assets/images/avatar/avatar.jpg";
import { TbSearch } from "react-icons/tb";
function UserSearch({ text = "", closeModal = () => {} }) {
    const dataList = [{ id: 1, text }];
    return (
        <div className="w-full flex flex-col pt-1 pb-2 px-2">
            {/* <div className="flex justify-between items-center px-1 ">
                <span className=" font-semibold">Kết quả tìm kiếm</span>
                <Link
                    to={`/search/people/${text}`}
                    className=" text-blue-500 py-1 px-2 rounded-md hover:bg-hover"
                >
                    <span onClick={closeModal}>Xem tất cả</span>
                </Link>
            </div> */}
            <div className="flex flex-col w-full">
                {Array(6)
                    .fill(0)
                    .map((item, index) => (
                        <Link key={index} to={"/profile/1"}>
                            <div
                                className="w-full flex items-center p-2 rounded-md hover:bg-hover"
                                onClick={closeModal}
                            >
                                <img
                                    key={index}
                                    className="w-[40px] h-[40px] rounded-full mr-2"
                                    src={avt}
                                    alt=""
                                />
                                <div className="flex flex-col">
                                    <span className=" font-medium">
                                        Nguyen Tu Anh
                                    </span>
                                    <span className=" text-[13px] text-gray-500">
                                        Bạn bè
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                <Link to={`/search/people/${text}`}>
                    <div
                        className="w-full flex items-center p-2 rounded-md hover:bg-hover"
                        onClick={closeModal}
                    >
                        <div className=" ">
                            <Button
                                _className={
                                    "flex items-center justify-center w-[40px] h-[40px] rounded-full mr-2 bg-blue-500 rounded-full"
                                }
                            >
                                <TbSearch className="text-white text-[16px]" />
                            </Button>
                        </div>
                        <div className="flex text-blue-500">
                            <span className=" flex line-clamp-1">
                                <span className=" ">Tìm kiếm</span>
                                <span className=" ml-1 font-medium">
                                    {text}
                                </span>
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default UserSearch;
