import { useState, useContext, useRef } from "react";
import { useClickOutSide } from "../../../../Hooks/useClickOutSide";
import { ScreenSize } from "../../../../App";
import Button from "../../../../Components/Button";
import NavItem from "./NavItem";
import { BsFillCaretDownFill, BsCheck2 } from "react-icons/bs";
function FriendsListNav({
    navList = [],
    currentNav,
    setCurrentNav = () => {},
    setCallApi = () => {},
}) {
    const context = useContext(ScreenSize);
    const divRef = useRef();
    const [showModal, setShowModal] = useState(false);
    useClickOutSide(divRef, () => setShowModal(false));
    return (
        <div className=" relative flex my-2">
            {navList.length > 0 &&
                navList.map((item, index) => {
                    if (index === 0 && context.width < 768) {
                        return (
                            <NavItem
                                key={item.id}
                                item={item}
                                currentNav={currentNav}
                                setCurrentNav={setCurrentNav}
                                setCallApi={setCallApi}
                            />
                        );
                    } else if (context.width >= 768) {
                        return (
                            <NavItem
                                key={item.id}
                                item={item}
                                currentNav={currentNav}
                                setCurrentNav={setCurrentNav}
                                setCallApi={setCallApi}
                            />
                        );
                    }
                })}
            {context.width < 768 && (
                <div ref={divRef}>
                    <Button
                        _className={`relative flex items-center p-4 ${
                            currentNav.id > 1
                                ? "text-blue-500"
                                : "text-gray-500 hover:bg-hover"
                        } rounded-md `}
                        onClick={() => setShowModal(!showModal)}
                    >
                        <span className=" mr-1 font-medium ">Xem thêm</span>
                        <BsFillCaretDownFill />
                        {currentNav.id > 1 && (
                            <b className=" absolute bottom-0 left-0 w-full h-[2px] bg-blue-500" />
                        )}
                    </Button>
                    {showModal && (
                        <div
                            style={{ boxShadow: "0 2px 6px 2px #ccc" }}
                            className=" absolute top-[100%] left-0 flex flex-col w-[300px] p-2 rounded-lg bg-white z-20"
                        >
                            {navList.length > 1 &&
                                navList.map((item, index) => {
                                    if (index > 0) {
                                        return (
                                            <Button
                                                key={item.id}
                                                _className={
                                                    "flex item-center justify-between w-full p-2 text-left rounded-md hover:bg-hover"
                                                }
                                                onClick={() => {
                                                    setCurrentNav(item);
                                                    setShowModal(false);
                                                    setCallApi(true);
                                                }}
                                            >
                                                <span
                                                    className={`font-medium ${
                                                        item.id ===
                                                        currentNav.id
                                                            ? "text-blue-500"
                                                            : "text-gray-500"
                                                    } `}
                                                >
                                                    {item.name}
                                                </span>
                                                {item.id === currentNav.id && (
                                                    <BsCheck2 className="text-blue-500" />
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
    );
}

export default FriendsListNav;
