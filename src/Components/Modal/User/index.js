import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../redux/actions/user";
import { closeAll } from "../../../redux/actions/conversationsList";
import { formatAvatar } from "../../../Hooks/useFormat";
import Item from "./Item";
import SettingsAndPrivacy from "./SettingsAndPrivacy";
import HelpAndSupport from "./HelpAndSupport";
import DarkMode from "./DarkMode";
import { FiLogOut } from "react-icons/fi";
import { BsQuestionCircleFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
function User({ click = () => {} }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const noti = useSelector((state) => state.messNotification);
    const DivLeftRef = useRef();
    const DivRightRef = useRef();
    const [list, setList] = useState({ Comp: undefined });
    const [heightDivLeft, setHeightDivLeft] = useState(0);
    const [heightDivRight, setHeightDivRight] = useState(0);
    useEffect(() => {
        DivLeftRef.current && setHeightDivLeft(DivLeftRef.current.offsetHeight);
    }, []);
    useEffect(() => {
        list.Comp &&
            DivRightRef.current &&
            setHeightDivRight(DivRightRef.current.offsetHeight);
    }, [list]);

    return (
        <div
            ref={DivLeftRef}
            style={{
                height: list.Comp
                    ? `${heightDivRight > 24 ? heightDivRight : "auto"}px`
                    : `${heightDivLeft ? heightDivLeft : "auto"}px`,
            }}
            className="w-[350px] max-h-[90vh] bg-white transition-height ease-linear duration-150  rounded-lg shadow-lg overflow-hidden "
        >
            <div
                className={`flex transition-transform ease-linear duration-150 ${
                    list.Comp ? "translate-x-[-350px]" : "translate-x-0"
                }`}
            >
                <div className="flex flex-col w-max cursor-default">
                    <div
                        style={{ height: list.Comp ? "24px" : "auto" }}
                        className={`w-[350px]  py-3 px-3`}
                    >
                        <div
                            style={{ boxShadow: "0 2px 12px #ccc" }}
                            className="w-full p-2 rounded-md mb-4 "
                        >
                            <div className=" w-full py-1  ">
                                <Link
                                    className="flex items-center p-2 rounded-md hover:bg-gray-200"
                                    to={`/profile/${user.userId}`}
                                    onClick={click}
                                >
                                    <img
                                        className="w-9 h-9 rounded-full border"
                                        src={formatAvatar(user.avatar, user.sx)}
                                        alt=""
                                    />
                                    <span className="text-[17px] ml-3 font-semibold">
                                        {`${user.fName} ${user.lName}`}
                                    </span>
                                </Link>
                            </div>
                            <div className="px-2">
                                <b className="block h-[2px] w-full bg-gray-300"></b>
                            </div>
                            <div className="flex justify-between items-center w-full px-2 py-1 mt-2 rounded-md cursor-pointer hover:bg-hover">
                                <span className=" text-[15px] font-medium text-blue-500">
                                    Xem tất cả trang cá nhân
                                </span>
                                <span className="flex items-center h-5 px-2 text-[13px] text-white font-semibold bg-red-600 rounded-xl">
                                    22
                                </span>
                            </div>
                        </div>
                        <Item
                            text="Cài đặt & quyền riêng tư"
                            list={true}
                            onClick={() =>
                                setList({ Comp: SettingsAndPrivacy })
                            }
                        >
                            <i className=" bg-urlIcons bg-szIcons w-5 h-5 bg-settingIcon bg-no-repeat inline-block"></i>
                        </Item>
                        <Item
                            text="Trợ giúp & hỗ trợ"
                            list={true}
                            onClick={() => setList({ Comp: HelpAndSupport })}
                        >
                            <BsQuestionCircleFill />
                        </Item>
                        <Item
                            text="Màn hình"
                            list={true}
                            onClick={() => setList({ Comp: DarkMode })}
                        >
                            <FaMoon />
                        </Item>
                        <Item text="Đóng góp ý kiến">
                            <i className=" bg-urlIcons2 bg-szIcons2 w-5 h-5 bg-exclamationMarkIcon bg-no-repeat inline-block"></i>
                        </Item>
                        <Item
                            to={"/login"}
                            text={"Đăng xuất"}
                            onClick={() => {
                                localStorage.removeItem("accessToken");
                                localStorage.removeItem("refreshToken");
                                dispatch(deleteUser());
                                dispatch(closeAll());
                                click();
                            }}
                        >
                            <FiLogOut />
                        </Item>
                        <div className="px-2 pt-1">
                            <span className="block text-[13px] text-gray-500 leading-[15px]">
                                Quyền riêng tư · Điều khoản · Quảng cáo · Lựa
                                chọn quảng cáo · Cookie · Xem thêm · Meta © 2023
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-max cursor-default">
                    <div
                        ref={DivRightRef}
                        className=" flex flex-col w-[350px] h-max bg-white py-3 px-3 "
                    >
                        {list.Comp && (
                            <list.Comp
                                onClick={() => setList({ Comp: undefined })}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
