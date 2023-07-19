import { useContext, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClickOutSide } from "../../../../Hooks/useClickOutSide";
import { ScreenSize } from "../../../../App";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsFillCaretDownFill, BsCheck2 } from "react-icons/bs";
import Button from "../../../../Components/Button";
function ProfileNav() {
    const currentUrl = window.location.pathname;
    const { userId } = useParams();
    const nav = [
        { id: 1, pathName: `/profile/${userId}`, name: "Bài viết" },
        { id: 2, pathName: `/profile/${userId}/info`, name: "Giới thiệu" },
        { id: 3, pathName: `/profile/${userId}/friends`, name: "Bạn bè" },
        { id: 4, pathName: `/profile/${userId}/photos`, name: "Ảnh" },
        { id: 5, pathName: `/profile/${userId}/videos`, name: "Video" },
    ];
    const context = useContext(ScreenSize);
    const divRef = useRef();
    const [indexNav, setIndexNav] = useState(0);
    const [showModal, setShowModal] = useState(false);
    useClickOutSide(divRef, () => setShowModal(false));
    useEffect(() => {
        const id = nav.findIndex((item) => item.pathName === currentUrl);
        setIndexNav(id);
    }, [currentUrl]);
    return (
        <div className="relative flex justify-between items-center w-full lg:w-[1000px] mx-auto py-1">
            <div className="  flex">
                {nav.length > 0 &&
                    nav.map((item, index) => {
                        if (context.width < 450 && index < 2) {
                            return (
                                <Button
                                    key={item.id}
                                    to={item.pathName}
                                    _className={` relative p-3 mr-2 rounded-md font-medium ${
                                        currentUrl === item.pathName
                                            ? "text-blue-500"
                                            : "hover:bg-hover"
                                    } `}
                                >
                                    {item.name}
                                    {currentUrl === item.pathName && (
                                        <b className=" absolute left-0 bottom-0 w-full h-[2px] bg-blue-500"></b>
                                    )}
                                </Button>
                            );
                        } else if (context.width >= 450) {
                            return (
                                <Button
                                    key={item.id}
                                    to={item.pathName}
                                    _className={` relative p-3 mr-2 rounded-md font-medium ${
                                        currentUrl === item.pathName
                                            ? "text-blue-500"
                                            : "hover:bg-hover"
                                    } `}
                                >
                                    {item.name}
                                    {currentUrl === item.pathName && (
                                        <b className=" absolute left-0 bottom-0 w-full h-[2px] bg-blue-500"></b>
                                    )}
                                </Button>
                            );
                        }
                    })}
                {context.width < 450 && (
                    <div ref={divRef}>
                        <Button
                            _className={`relative flex items-center p-3 mr-2 rounded-md font-medium ${
                                indexNav > 1 ? "" : "hover:bg-hover"
                            }`}
                            onClick={() => setShowModal(!showModal)}
                        >
                            <span
                                style={{ color: indexNav > 1 ? "blue" : "" }}
                                className=" mr-1"
                            >
                                Xem thêm
                            </span>
                            <BsFillCaretDownFill
                                style={{ color: indexNav > 1 ? "blue" : "" }}
                            />
                            {indexNav > 1 && (
                                <b className=" absolute bottom-0 left-0 block w-full h-[2px] bg-blue-500" />
                            )}
                        </Button>
                        {showModal && (
                            <div
                                style={{ boxShadow: "0 2px 6px 2px #ccc" }}
                                className={`absolute top-[100%] right-[10px] flex flex-col w-[250px] p-2 bg-white rounded-lg z-20`}
                            >
                                {nav.length > 0 &&
                                    nav.map((item, index) => {
                                        if (index >= 2) {
                                            return (
                                                <Button
                                                    key={item.id}
                                                    to={item.pathName}
                                                    _className={
                                                        "flex justify-between w-full p-2 text-left rounded-md hover:bg-hover"
                                                    }
                                                >
                                                    <span className=" font-medium">
                                                        {item.name}
                                                    </span>
                                                    {item.pathName ===
                                                        currentUrl && (
                                                        <BsCheck2 className=" text-blue-500" />
                                                    )}
                                                </Button>
                                            );
                                        }
                                    })}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="">
                <Button
                    _className={
                        "py-2 px-3 bg bg-gray-200 rounded-md hover:bg-gray-300"
                    }
                >
                    <HiDotsHorizontal />
                </Button>
            </div>
        </div>
    );
}

export default ProfileNav;
