import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { formatAvatar } from "../../../Hooks/useFormat";
import groupApi from "../../../api/groupApi";
import LoadingCircleLine from "../../../Components/LoadingCircleLine";
import SkeletonLoading from "../../../Components/SkeletonLoading";
import Button from "../../../Components/Button";
import Navtem from "./NavItem";
import { BiArrowToBottom } from "react-icons/bi";
import img from "../../../assets/images/banner/banner.png";
function LayoutLeft({ closeModal = () => {} }) {
    const user = useSelector((state) => state.user);
    const [payload, setPayload] = useState({ limit: 8, page: 1 });
    const [totalPagae, setTotalPage] = useState(1);
    const [groupsList, setGroupList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getGroups = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId: user.userId };
                const res = await groupApi.get(params);
                if (res.success && res.count > 0) {
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    setGroupList([...groupsList, ...res.data]);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        user.userId && !loading && payload.page <= totalPagae && getGroups();
    }, [payload.page]);
    return (
        <div className="pl-2 ">
            <div className="w-full h-full">
                <div className=" pb-2 border-b border-gray-300">
                    <ul className=" ">
                        <Navtem
                            to={`/profile/${user.userId}`}
                            text={`${user.fName} ${user.lName}`}
                        >
                            <img
                                className=" rounded-full border"
                                src={formatAvatar(user.avatar, user.sx)}
                                alt="avatar"
                            />
                        </Navtem>
                        <Navtem
                            to={"/friends"}
                            text={"Bạn bè"}
                            iconClassName=" bg-friendIcon"
                        />
                        <Navtem
                            to={"/groups"}
                            text={"Nhóm"}
                            iconClassName="bg-groupIcon"
                        />
                        <Navtem
                            to={"/videos"}
                            text={"Watch"}
                            iconClassName="bg-watchIcon"
                        />
                        <Navtem
                            to={"/marketplace"}
                            text={"Marketplace"}
                            iconClassName="bg-marketplaceICon"
                        />
                    </ul>
                </div>
                <div className=" pt-3 ">
                    {groupsList.length > 0 && (
                        <p className=" ml-2 font-semibold text-gray-500">
                            Lối tắt của bạn
                        </p>
                    )}
                    <ul className=" py-3">
                        {groupsList.length > 0 &&
                            groupsList.map((item) => (
                                <Navtem
                                    key={item.id}
                                    to={`/group/${item.id}`}
                                    text={item.name}
                                >
                                    <img
                                        className="w-full h-full object-cover object-center rounded-lg"
                                        src={item.banner ? item.banner : img}
                                        alt="image"
                                    />
                                </Navtem>
                            ))}
                        {loading &&
                            Array(3)
                                .fill(0)
                                .map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center w-full p-2"
                                    >
                                        <span className="bock w-9 h-9 rounded overflow-hidden">
                                            <SkeletonLoading />
                                        </span>
                                        <span className="bock grow h-5 px-3 rounded overflow-hidden">
                                            <SkeletonLoading />
                                        </span>
                                    </div>
                                ))}
                        {payload.page < totalPagae && (
                            <div className="w-full">
                                <Button
                                    _className={
                                        "flex items-center w-full p-2 rounded hover:bg-hover"
                                    }
                                    cursorDefault={loading}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        !loading &&
                                            setPayload({
                                                ...payload,
                                                page: payload.page + 1,
                                            });
                                    }}
                                >
                                    <span className="flex items-center justify-center h-[36px] w-[36px] mr-3 rounded-full bg-gray-300">
                                        {loading ? (
                                            <span className="block w-full h-full p-2">
                                                <LoadingCircleLine />
                                            </span>
                                        ) : (
                                            <BiArrowToBottom />
                                        )}
                                    </span>
                                    <span className="font-semibold">
                                        Xem thêm
                                    </span>
                                </Button>
                            </div>
                        )}
                        <div className="w-full">
                            <span className="block px-2 text-[13px] text-gray-500 leading-[15px]">
                                Quyền riêng tư · Điều khoản · Quảng cáo · Lựa
                                chọn quảng cáo · Cookie · Xem thêm · Meta © 2023
                            </span>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LayoutLeft;
