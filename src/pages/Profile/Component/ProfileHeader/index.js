import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatAvatar, formatBanner } from "../../../../Hooks/useFormat";
import { addMess } from "../../../../redux/actions/openMessList";
import userApi from "../../../../api/userApi";
import { ScreenSize } from "../../../../App";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import Button from "../../../../Components/Button";
import ChangeProfilePicture from "../../../../Components/Modal/ChangeProfilePicture";
import ProfileNav from "../ProfileNav";
import { FaPen, FaUserPlus } from "react-icons/fa";
import { AiFillPlusCircle, AiFillCamera } from "react-icons/ai";
import { BsMessenger } from "react-icons/bs";
import banner from "../../../../assets/images/banner/user_bn.png";
import avt from "../../../../assets/images/avatar/avatar.jpg";
function ProdileHeader() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const context = useContext(ScreenSize);
    const [userData, setUserData] = useState({});
    const [showModalAvatar, setShowModalAvatar] = useState(false);
    const [showModalBanner, setShowModalBanner] = useState(false);
    const [showModalTin, setShowModalTin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            try {
                setIsLoading(true);
                const res = await userApi.getInfo({ userId });
                setUserData(res[0]);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        userId !== user.userId && getUser();
    }, [userId]);
    return (
        <>
            {showModalAvatar && (
                <ChangeProfilePicture
                    title="Cập nhập ảnh đại diện"
                    closeModal={() => setShowModalAvatar(false)}
                />
            )}
            {showModalBanner && (
                <ChangeProfilePicture
                    title="Cập nhập ảnh bìa"
                    closeModal={() => setShowModalBanner(false)}
                />
            )}
            {showModalTin && (
                <ChangeProfilePicture
                    title="Thêm tin"
                    video={true}
                    closeModal={() => setShowModalTin(false)}
                />
            )}
            <div className="w-full flex flex-col mb-4 bg-gradient-to-b from-slate-400 via-white to-white">
                <div className="w-full lg:w-[1100px] my-0 mx-auto">
                    {isLoading ? (
                        <div className="w-full h-[300px] md:h-[350px] lg:rounded-b-lg lg:h-[400px] overflow-hidden">
                            <SkeletonLoading />
                        </div>
                    ) : (
                        <div className=" relative w-full lg:rounded-b-lg overflow-hidden">
                            <Link to={"/photo/1"} className="w-full">
                                <img
                                    className="w-full max-h-[400px] object-cover"
                                    src={formatBanner(
                                        userApi === user.userId
                                            ? user.banner
                                            : userData.banner
                                    )}
                                    alt=""
                                />
                            </Link>
                            {userId === user.userId && (
                                <div className=" absolute bottom-3 right-3 z-10">
                                    <Button
                                        _className={
                                            "flex items-center p-2 bg-gray-300 sm:bg-white rounded-full sm:rounded-md "
                                        }
                                        onClick={() => setShowModalBanner(true)}
                                    >
                                        <AiFillCamera className="text-[22px]" />
                                        {context.width >= 640 && (
                                            <span className="ml-1 font-medium">
                                                Thay đổi ảnh bìa
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex flex-col lg:flex-row w-full lg:w-[1000px] pb-5 lg:py-5 mx-auto border-b">
                        <div className=" relative w-full lg:w-1/5 h-[84px] lg:h-auto  ">
                            <div className=" absolute bottom-0 flex justify-center w-full lg:block">
                                <div className=" relative">
                                    {isLoading ? (
                                        <div className="w-[168px] h-[168px] rounded-full overflow-hidden">
                                            <SkeletonLoading />
                                        </div>
                                    ) : (
                                        <Link to={"/photo/1"}>
                                            <img
                                                className="w-[168px] h-[168px] rounded-full border-[4px] border-white  "
                                                src={formatAvatar(
                                                    user.avatar,
                                                    userData.sx
                                                        ? userData.sx
                                                        : user.sx
                                                )}
                                                alt=""
                                            />
                                        </Link>
                                    )}

                                    {userId === user.userId && (
                                        <Button
                                            _className=" absolute bottom-[5px] right-[10px] flex justify-center items-center w-9 h-9 rounded-full bg-gray-200"
                                            onClick={() =>
                                                setShowModalAvatar(true)
                                            }
                                        >
                                            <AiFillCamera className="w-5 h-5" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full lg:w-2/4 px-4  ">
                            {isLoading ? (
                                <div className="w-full h-full rounded-lg overflow-hidden">
                                    <SkeletonLoading />
                                </div>
                            ) : (
                                <>
                                    <span className="w-full text-[30px] text-center lg:text-left font-bold">
                                        {userId == user.userId
                                            ? `${user.fName} ${user.lName}`
                                            : `${userData.fName} ${userData.lName}`}
                                    </span>
                                    <span className="w-full font-medium text-center lg:text-left text-gray-500">
                                        1,1k bạn bè
                                    </span>
                                    <div className="flex justify-center lg:justify-start w-full mt-1">
                                        <div className="relative flex w-max h-[40px]">
                                            {Array(6)
                                                .fill(0)
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            zIndex: 10 - index,
                                                        }}
                                                        className=" relative w-[35px] h-[40px]"
                                                    >
                                                        <div className="absolute top-0 left-0 h-[40px] w-[40px] rounded-full">
                                                            <img
                                                                className="h-full w-full rounded-full border-[2px] border-white"
                                                                src={avt}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {userId === user.userId ? (
                            <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center lg:justify-end md:items-end w-full lg:w-2/4 md:mt-5 ">
                                <Button
                                    _className={`flex justify-center md:justify-start items-center p-2 mb-2 mx-2 text-white bg-blue-500 rounded-md 
                                    md:mx-0 md:mb-0 md:mr-2 md:mx-2 mt-5 md:mt-0 hover:bg-blue-600`}
                                    onClick={() => setShowModalTin(true)}
                                >
                                    <AiFillPlusCircle />
                                    <span className="ml-2 font-semibold">
                                        Thêm vào tin
                                    </span>
                                </Button>
                                <Button
                                    to={`/profile/${user.userId}/info`}
                                    _className={
                                        "flex justify-center md:justify-start items-center p-2 mx-2 bg-gray-200 rounded-md md:mx-0 hover:bg-gray-300"
                                    }
                                >
                                    <FaPen />
                                    <span className="ml-2 font-semibold">
                                        Chỉnh sửa trang cá nhân
                                    </span>
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-wrap justify-center items-end lg:justify-end w-full lg:w-2/4 md:mt-5 ">
                                <Button
                                    _className={`flex justify-center md:justify-start items-center p-2 px-3 mb-2 mx-2 text-white bg-blue-500 rounded-md 
                                        md:mx-0 md:mb-0 md:mr-2 md:mx-2 mt-5 md:mt-0 hover:bg-blue-600`}
                                >
                                    <FaUserPlus />
                                    <span className="ml-2 font-semibold">
                                        Thêm bạn bè
                                    </span>
                                </Button>
                                <Button
                                    _className={
                                        "flex h-max justify-center md:justify-start items-center p-2 px-3 mb-2 md:mb-0 mx-2 bg-gray-200 rounded-md md:mx-0 hover:bg-gray-300"
                                    }
                                    onClick={() =>
                                        dispatch(
                                            addMess({
                                                userId: user.userId,
                                                othersId: userId,
                                            })
                                        )
                                    }
                                >
                                    <BsMessenger />
                                    <span className="ml-2 font-semibold">
                                        Nhắn tin
                                    </span>
                                </Button>
                            </div>
                        )}
                    </div>
                    <ProfileNav />
                </div>
            </div>
        </>
    );
}

export default ProdileHeader;
