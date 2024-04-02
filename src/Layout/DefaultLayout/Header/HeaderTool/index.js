import { useState, useRef, useContext, useEffect } from "react";
import { ScreenSize } from "../../../../App";
import { useSelector, useDispatch } from "react-redux";
import { formatAvatar } from "../../../../Hooks/useFormat";
import { useClickOutSide } from "../../../../Hooks/useClickOutSide";
import { SocketContext } from "../../../../Socket";
import conversationsApi from "../../../../api/conversationsApi";
import notificationApi from "../../../../api/notificationApi";
import {
    add_idList,
    delete_all,
} from "../../../../redux/actions/messNotification";
import ToolItem from "./ToolItem";
import Messenger from "../../../../Components/Modal/Messenger";
import Notification from "../../../../Components/Modal/Notification";
import User from "../../../../Components/Modal/User";
import { CgMenuGridO } from "react-icons/cg";
import { BsMessenger, BsBellFill } from "react-icons/bs";
function HeaderTool() {
    const user = useSelector((state) => state.user);
    const messNotification = useSelector((state) => state.messNotification);
    const dispatch = useDispatch();
    const socketContext = useContext(SocketContext);
    const context = useContext(ScreenSize);
    const modalRef = useRef();
    const modalNotifyRef = useRef();
    const modalUserRef = useRef();

    const [showMess, setShowMess] = useState(false);
    const [showModalNotify, setShowModalNotify] = useState(false);
    const [showModalUser, setShowModalUser] = useState(false);
    const [countNotification, setCountNotification] = useState(0);

    useClickOutSide(modalRef, () => setShowMess(false));
    useClickOutSide(modalNotifyRef, () => setShowModalNotify(false));
    useClickOutSide(modalUserRef, () => setShowModalUser(false));
    useEffect(() => {
        const handleOnMessage = (e) => {
            const data = JSON.parse(e.data);
            data.type === "notification" &&
                setCountNotification((prev) => prev + 1);
        };
        socketContext &&
            socketContext.addEventListener("message", handleOnMessage);
        return () =>
            socketContext &&
            socketContext.removeEventListener("message", handleOnMessage);
    }, [socketContext]);
    useEffect(() => {
        const getUnwatched = async () => {
            const res = await conversationsApi.unwatched({
                userId: user.userId,
            });
            dispatch(add_idList(res));
        };
        getUnwatched();
    }, []);
    useEffect(() => {
        const updateWatched = async () => {
            const params = new FormData();
            params.append("userId", user.userId);
            const res = await conversationsApi.updateWatched(params);
            console.log(res);
            if (res[0].status === "success") {
                dispatch(delete_all());
            }
        };
        showMess && messNotification.length > 0 && updateWatched();
    }, [showMess]);
    useEffect(() => {
        const countNotifyUnread = async () => {
            try {
                const res = await notificationApi.countNotifyUnread({
                    userId: user.userId,
                });
                if (res.success) {
                    setCountNotification(res.count);
                }
            } catch (error) {
                console.log(error);
            }
        };
        countNotifyUnread();
    }, []);
    return (
        <div className=" md:w-[180px] lg:w-[350px] relative px-4">
            <ul className="flex justify-end h-full">
                {context.width >= 1024 && (
                    <ToolItem>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full">
                            <CgMenuGridO className="text-[25px] " />
                        </div>
                    </ToolItem>
                )}
                <div ref={modalRef} className="flex items-center h-full">
                    <ToolItem
                        backGroudColor={showMess ? "bg-blue-100" : false}
                        onClick={() => setShowMess(!showMess)}
                        notiMumber={messNotification.length}
                    >
                        <div className="flex justify-center items-center h-10 w-10 rounded-full overflow-hidden">
                            <div className="flex justify-center items-center h-10 w-10 rounded-full">
                                <BsMessenger
                                    className={showMess ? " text-blue-500" : ""}
                                />
                            </div>
                        </div>
                    </ToolItem>
                    {showMess && (
                        <div className=" absolute max-h-[90vh] w-max top-[58px] right-[5px]">
                            <Messenger closeModal={() => setShowMess(false)} />
                        </div>
                    )}
                </div>

                <ToolItem
                    _ref={modalNotifyRef}
                    onClick={() => {
                        !showModalNotify && setCountNotification(0);
                        setShowModalNotify(!showModalNotify);
                    }}
                    notiMumber={countNotification}
                    backGroudColor={showModalNotify ? "bg-blue-100" : false}
                >
                    <div className="flex justify-center items-center h-10 w-10 rounded-full">
                        <BsBellFill
                            className={showModalNotify ? " text-blue-500" : ""}
                        />
                        {showModalNotify && (
                            <div
                                className=" absolute top-[105%] right-[5px] cursor-default "
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Notification
                                    closeModal={() => setShowModalNotify(false)}
                                />
                            </div>
                        )}
                    </div>
                </ToolItem>
                <ToolItem>
                    <div
                        ref={modalUserRef}
                        className="flex justify-center items-center h-10 w-10 rounded-full border"
                    >
                        <img
                            className="h-full w-full object-cover object-center hover:opacity-90"
                            src={formatAvatar(user.avatar, user.sx)}
                            alt="avatar"
                            onClick={() => setShowModalUser(!showModalUser)}
                        />
                        {showModalUser && (
                            <div className=" absolute top-[105%] right-[5px] ">
                                <User click={() => setShowModalUser(false)} />
                            </div>
                        )}
                    </div>
                </ToolItem>
            </ul>
        </div>
    );
}

export default HeaderTool;
