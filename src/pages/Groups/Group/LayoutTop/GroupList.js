import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatNumber } from "../../../../Hooks/useFormat";
import groupApi from "../../../../api/groupApi";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import Button from "../../../../Components/Button";
import { ImEarth } from "react-icons/im";
import { FaLock } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
function GroupList() {
    const { groupId } = useParams();
    const parentRef = useRef();
    const childrenRef = useRef();
    const [payload, setPayload] = useState({ limit: 6, page: 1, groupId });
    const [groupList, setGroupList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [translate, setTranslate] = useState(0);
    const [parentWidth, setParentWidth] = useState(0);
    const [childrenWidth, setChildrenWidth] = useState(0);
    const [buttonLeft, setButtonLeft] = useState(false);
    const [buttonRight, setButtonRight] = useState(false);

    useEffect(() => {
        const getGroupList = async () => {
            try {
                setLoading(true);
                const res = await groupApi.getAll(payload);
                res.success && setGroupList(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        groupId && !loading && getGroupList();
    }, []);

    useEffect(() => {
        if (parentRef.current.offsetWidth < childrenRef.current.offsetWidth) {
            setButtonRight(true);
        }
        setParentWidth(parentRef.current.offsetWidth);
        setChildrenWidth(childrenRef.current.offsetWidth);
    }, [groupList.length]);

    const translateLeft = (parentWidth, childrenWidth, translate) => {
        if (translate - 220 < 0) {
            setTranslate(0);
            setButtonLeft(false);
        } else {
            setTranslate(translate - 220);
        }
        setButtonRight(true);
    };

    const translateRight = (parentWidth, childrenWidth, translate) => {
        if (parentWidth + translate + 220 >= childrenWidth) {
            setTranslate(childrenWidth - parentWidth);
            setButtonRight(false);
        } else {
            setTranslate(translate + 220);
        }
        setButtonLeft(true);
    };
    return (
        <div
            ref={parentRef}
            style={{ boxShadow: "0px 1px 2px 0px #ccc" }}
            className=" relative w-full mb-3 border rounded-lg overflow-hidden"
        >
            {!loading && buttonLeft && (
                <div className=" absolute top-[113px] left-0 z-20">
                    <Button
                        _className={`flex items-center justify-center w-12 h-12 bg-white border shadow-md
                            rounded-full hover:bg-gray-100`}
                        onClick={() =>
                            translateLeft(parentWidth, childrenWidth, translate)
                        }
                    >
                        <FiChevronLeft className="text-[24px]" />
                    </Button>
                </div>
            )}
            {!loading && buttonRight && (
                <div className=" absolute top-[113px] right-0 z-20">
                    <Button
                        _className={`flex items-center justify-center w-12 h-12 bg-white border shadow-md 
                            rounded-full hover:bg-gray-100`}
                        onClick={() =>
                            translateRight(
                                parentWidth,
                                childrenWidth,
                                translate
                            )
                        }
                    >
                        <FiChevronRight className="text-[24px]" />
                    </Button>
                </div>
            )}
            <div className="w-full p-2">
                <span className=" font-semibold text-[17px]">Nhóm khác</span>
            </div>
            <div
                ref={childrenRef}
                style={{ transform: `translateX(-${translate}px)` }}
                className="flex w-max min-w-full px-2 pb-2 transition-all"
            >
                <div className=" flex gap-2 w-full">
                    {groupList.length > 0 &&
                        groupList.map((item) => (
                            <div
                                style={{ boxShadow: "0px 1px 2px 0px #ccc" }}
                                key={item.id}
                                className="flex flex-col w-[220px] rounded-lg overflow-hidden"
                            >
                                <div className="w-full h-[90px]">
                                    <img
                                        className="w-full h-full object-cover object-center"
                                        src={item.banner}
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col justify-between w-full p-2">
                                    <div className="flex flex-col w-full h-[80px]">
                                        <Link
                                            to={`/group/${item.id}`}
                                            className=" hover:underline"
                                        >
                                            <span className=" font-semibold text-[17px] line-clamp-2 break-words">
                                                {item.name}
                                            </span>
                                        </Link>
                                        <div className="flex flex-wrap gap-1 items-center w-full">
                                            {item.members > 0 && (
                                                <>
                                                    <span className=" font-normal text-gray-500 text-[13px] leading-[13px]">{`${formatNumber(
                                                        item.members
                                                    )} thành viên`}</span>
                                                    <span>
                                                        <BsDot />
                                                    </span>
                                                </>
                                            )}
                                            <span className="flex gap-1 w-max font-normal text-gray-500 text-[13px] leading-[13px]">
                                                <span>
                                                    {item.statusId === "0" ? (
                                                        <ImEarth />
                                                    ) : (
                                                        <FaLock />
                                                    )}
                                                </span>
                                                <span>{item.statusName}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        to={`/group/${item.id}`}
                                        _className={`flex justify-center items-center w-full p-2 bg-blue-500 rounded-md hover:bg-blue-600`}
                                    >
                                        <span className=" font-medium text-white">
                                            Truy cập
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    {groupList.length === 0 && !loading && (
                        <span className=" font-medium text-gray-500 mx-auto p-2">
                            Không có dữ liệu phù hợp
                        </span>
                    )}
                    {loading &&
                        Array(5)
                            .fill(0)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col w-[220px] rounded-lg overflow-hidden"
                                >
                                    <div className="w-full h-[90px]">
                                        <SkeletonLoading />
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );
}

export default GroupList;
