import { useState, useRef, useContext } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatNumberK } from "../../../../../Hooks/useFormat";
import { useClickOutSide } from "../../../../../Hooks/useClickOutSide";
import { GroupContext } from "../../GroupProvider";
import groupApi from "../../../../../api/groupApi";
import SkeletonLoading from "../../../../../Components/SkeletonLoading";
import LoadingCircleLine from "../../../../../Components/LoadingCircleLine";
import AddMembers from "../../Components/AddMembers";
import Button from "../../../../../Components/Button";
import Confirm from "../../../../../Components/Modal/Confirm";
import { GiEarthAmerica } from "react-icons/gi";
import { BiDotsHorizontalRounded, BiPlus } from "react-icons/bi";
import { BsFillCaretDownFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdHome } from "react-icons/md";
function LayoutTop() {
    const { groupId } = useParams();
    const user = useSelector((state) => state.user);
    const modalRef = useRef();
    const { groupData, setGroupData, loading } = useContext(GroupContext);
    const [showModal, setShowModal] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useClickOutSide(modalRef, () => setShowModal(false));

    const outGroup = async () => {
        try {
            setIsLoading(true);
            const res = await groupApi.outGroup({ groupId });
            if (res.success) {
                setGroupData({ ...groupData, checkJoined: false });
                setShowModalConfirm(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {showModalConfirm && (
                <Confirm
                    title={"Xác nhận rời nhóm"}
                    text={
                        "Nếu bỏ theo dõi, bạn sẽ không nhận được thông báo hay nhìn thấy bài viết trong nhóm trên Bảng feed của mình nữa. "
                    }
                    confirm={() => outGroup()}
                    loading={isLoading}
                    closeModal={() => setShowModalConfirm(false)}
                />
            )}
            {showModalAdd && (
                <AddMembers closeModal={() => setShowModalAdd(false)} />
            )}

            <div className="flex flex-col p-4">
                <div className="flex mb-3">
                    <div className="">
                        {loading ? (
                            <div className="h-12 w-12 rounded-md overflow-hidden">
                                <SkeletonLoading />
                            </div>
                        ) : (
                            <img
                                className="h-12 w-12 object-cover object-center rounded-md border border-gray-400"
                                src={groupData.banner}
                                alt=""
                            />
                        )}
                    </div>
                    <div className="flex-1 flex flex-col ml-3">
                        <div className="">
                            {loading ? (
                                <div className="w-full h-6">
                                    <SkeletonLoading />
                                </div>
                            ) : (
                                <span className=" text-[16px] font-semibold line-clamp-2 text-ellipsis">
                                    {groupData.name}
                                </span>
                            )}
                        </div>
                        {loading ? (
                            <div className="w-[70%] h-6 mt-1">
                                <SkeletonLoading />
                            </div>
                        ) : (
                            <div className="flex items-center text-gray-500 ">
                                {groupData.status == 0 ? (
                                    <GiEarthAmerica />
                                ) : (
                                    <FaLock />
                                )}

                                <ul className="flex items-center ml-1">
                                    <li className=" text-[13px] ">
                                        <span>
                                            {groupData.status == 0
                                                ? "Nhóm công khai"
                                                : "Nhóm riêng tư"}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="block px-1">·</span>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/group/${groupData.id}/members`}
                                        >
                                            <span className="text-[13px] font-medium hover:underline">
                                                {formatNumberK(
                                                    groupData.members
                                                )}{" "}
                                                thành viên
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                {groupData.checkJoined && (
                    <div className="flex justify-between w-full h-9 mb-3">
                        {groupData.adminId !== user.userId ? (
                            <div
                                ref={modalRef}
                                className=" relative w-[80%] h-full"
                            >
                                <Button
                                    _className={
                                        "flex justify-center items-center w-full h-full font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
                                    }
                                    onClick={() => setShowModal(!showModal)}
                                >
                                    <i className=" block h-4 w-4 bg-urlIcons5 bg-szIcons5 bg-joinedTheGroup"></i>
                                    <span className="mx-2 text-[14px]">
                                        Đã tham gia nhóm
                                    </span>
                                    <BsFillCaretDownFill className="pt-1" />
                                </Button>
                                <div
                                    style={{
                                        visibility: showModal
                                            ? "visible"
                                            : "hidden",
                                        opacity: showModal ? "100" : "0",
                                    }}
                                    className="absolute top-[115%] left-0 w-full transition-all ease-linear duration-150"
                                >
                                    <div
                                        style={{ boxShadow: "0 0 5px #828282" }}
                                        className=" flex flex-col w-full bg-white rounded-md p-2 "
                                    >
                                        <span
                                            className="flex items-center gap-2 w-full px-2 py-1 rounded-md font-semibold cursor-pointer hover:bg-hover"
                                            onClick={() =>
                                                setShowModalConfirm(true)
                                            }
                                        >
                                            <FiLogOut />
                                            <span>Rời nhóm</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                ref={modalRef}
                                className=" relative w-[80%] h-full"
                            >
                                <Button
                                    _className={`flex justify-center items-center w-full h-full text-white font-semibold bg-blue-600
                                             rounded-md hover:bg-blue-700`}
                                    onClick={() =>
                                        setShowModalAdd(!showModalAdd)
                                    }
                                >
                                    <BiPlus className="mr-1" />
                                    <span className=" text-[14px]">Mời</span>
                                </Button>
                            </div>
                        )}
                        <div className="flex-1 ml-3 h-full">
                            <Button
                                _className={
                                    "flex justify-center items-center w-full h-full py-2 bg-gray-200 rounded-md cursor-default"
                                }
                            >
                                <BiDotsHorizontalRounded />
                            </Button>
                        </div>
                    </div>
                )}
                {!loading && (
                    <div className="h-full">
                        <Button _className={"w-full"}>
                            <NavLink
                                to={`/group/${groupId}`}
                                className={({ isActive }) =>
                                    `flex items-center w-full h-11 px-2 rounded-md ${
                                        isActive
                                            ? "text-blue-500 bg-blue-50"
                                            : "bg-gray-200"
                                    }   `
                                }
                                end
                            >
                                <MdHome className="h-6 w-6" />
                                <span className="ml-2 font-semibold">
                                    Trang chủ nhóm
                                </span>
                            </NavLink>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

export default LayoutTop;
