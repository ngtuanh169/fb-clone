import { useState } from "react";
import ProfileNav from "../ProfileNav";
import Button from "../../../../Components/Button";
import ChangeAvatar from "../../../../Components/Modal/ChangeAvatar";
import { FaPen } from "react-icons/fa";
import { AiFillPlusCircle, AiFillCamera } from "react-icons/ai";
import banner from "../../../../assets/images/banner/user_bn.png";
import avt from "../../../../assets/images/avatar/avatar.jpg";
function ProdileHeader() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {showModal && (
                <ChangeAvatar closeModal={() => setShowModal(false)} />
            )}
            <div className="w-full flex flex-col mb-4 bg-gradient-to-b from-slate-400 via-white to-white">
                <div className="w-full lg:w-[1100px] my-0 mx-auto">
                    <div className="w-full rounded-b-lg overflow-hidden">
                        <img
                            className="w-full max-h-[400px] object-cover"
                            src={banner}
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row w-full lg:w-[1000px] pb-5 lg:py-5 mx-auto border-b">
                        <div className=" relative w-full lg:w-1/5 h-[84px] lg:h-auto  ">
                            <div className=" absolute bottom-0 flex justify-center w-full lg:block">
                                <div className=" relative">
                                    <img
                                        className="w-[168px] h-[168px] rounded-full border-[4px] border-white  "
                                        src={avt}
                                        alt=""
                                    />
                                    <Button
                                        _className=" absolute bottom-[5px] right-[10px] flex justify-center items-center w-9 h-9 rounded-full bg-gray-200"
                                        onClick={() => setShowModal(true)}
                                    >
                                        <AiFillCamera className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full lg:w-2/4 px-4  ">
                            <span className="w-full text-[30px] text-center lg:text-left font-bold">
                                Nguyen Tu Anh
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
                                                style={{ zIndex: 10 - index }}
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
                        </div>
                        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center lg:justify-end md:items-end w-full lg:w-2/4 md:mt-5 ">
                            <Button
                                _className={`flex justify-center md:justify-start items-center p-2 mb-2 mx-2 text-white bg-blue-500 rounded-md 
                                    md:mx-0 md:mb-0 md:mr-2 md:mx-2 mt-5 md:mt-0 hover:bg-blue-600`}
                            >
                                <AiFillPlusCircle />
                                <span className="ml-2 font-semibold">
                                    Thêm vào tin
                                </span>
                            </Button>
                            <Button
                                to={"/profile/1/info"}
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
                    </div>
                    <ProfileNav />
                </div>
            </div>
        </>
    );
}

export default ProdileHeader;
