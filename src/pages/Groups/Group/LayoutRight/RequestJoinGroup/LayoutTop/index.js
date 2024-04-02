import { useState, useEffect, useContext } from "react";
import { ScreenSize } from "../../../../../../App";
import groupApi from "../../../../../../api/groupApi";
import { GroupContext } from "../../../GroupProvider";
import LoadingCircleLine from "../../../../../../Components/LoadingCircleLine";
import Button from "../../../../../../Components/Button";
import Confirm from "../../../../../../Components/Modal/Confirm";
import ButtonItem from "./ButtonItem";
import { BsSearch } from "react-icons/bs";
function LayouTop({
    payload,
    setPayload = () => {},
    countRequest,
    setCountRequest = () => {},
    setUsersList = () => {},
}) {
    const buttonItem = {
        name: "orderBy",
        options: [
            { id: 1, value: "DESC", name: "Mới nhất trước" },
            { id: 2, value: "ASC", name: "Cũ nhất trước" },
        ],
    };
    const buttonList = [
        {
            title: "Ngày tham gia Facebook",
            name: "userCreatedAt",
            options: [
                { id: 1, value: 90, name: "Chưa đến 3 tháng trước" },
                { id: 2, value: 180, name: "Chưa đến 6 tháng trước" },
                { id: 3, value: 365, name: "Chưa đến 1 năm trước" },
                { id: 4, value: 730, name: "Chưa đến 2 năm trước" },
            ],
        },
        {
            title: "Thời gian yêu cầu",
            name: "requestCreatedAt",
            options: [
                { id: 1, value: 7, name: "Dưới 1 tuần" },
                { id: 2, value: 30, name: "Dưới 1 tháng" },
                { id: 3, value: 90, name: "Dưới 3 tháng" },
                { id: 4, value: 180, name: "Dưới 6 tháng" },
                { id: 5, value: 365, name: "Dưới 1 năm" },
                { id: 6, value: 730, name: "Hơn 1 năm" },
            ],
        },
        {
            title: "Giới tính",
            name: "userSx",
            options: [
                { id: 1, value: "1", name: "Nam" },
                { id: 2, value: "2", name: "Nữ" },
            ],
        },
        {
            title: "Ảnh đại diện",
            name: "userAvt",
            options: [
                { id: 1, value: "Y", name: "Có ảnh đại diện" },
                { id: 2, value: "N", name: "Không có ảnh đại diện" },
            ],
        },
    ];
    const context = useContext(ScreenSize);
    const { groupData, setGroupData } = useContext(GroupContext);
    const [isFocus, setIsFocus] = useState(false);
    const [showModalRefuse, setShowModalRefuse] = useState(false);
    const [showModalAccept, setShowModalAccept] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [text, setText] = useState("");
    const [loadingAccept, setLoadingAccept] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    useEffect(() => {
        for (const key in payload) {
            const check = buttonList.findIndex((item) => key == item.name);
            if (check >= 0) {
                setShowButton(true);
                break;
            }
        }
    }, [payload]);

    useEffect(() => {
        const timeId = setTimeout(() => {
            const name = payload?.userName ? payload.userName : "";
            if (text.trim() !== name && !loadingAccept && !loadingCancel) {
                setPayload({
                    ...payload,
                    page: 1,
                    number: 0,
                    userName: text.trim(),
                });
            }
        }, 1000);
        return () => clearTimeout(timeId);
    }, [text]);

    const acceptRequests = async (payload, countRequest) => {
        try {
            setLoadingAccept(true);
            const count = countRequest;
            const params = {
                ...payload,
                limit: count,
                groupId: groupData.id,
            };
            const res = await groupApi.acceptRequestsByAdmin(params);
            if (res.success) {
                setUsersList([]);
                setCountRequest(0);
                setGroupData({
                    ...groupData,
                    requestJoinGroup: groupData.requestJoinGroup - count,
                    members: groupData.members + count,
                });
            }
            setLoadingAccept(false);
        } catch (error) {
            console.log(error);
        }
    };

    const cancelRequests = async (payload, countRequest) => {
        try {
            setLoadingCancel(true);
            const count = countRequest;
            const params = {
                ...payload,
                limit: count,
                groupId: groupData.id,
            };
            const res = await groupApi.cancelRequestsByAdmin(params);
            setTimeout(() => {
                if (res.success) {
                    setUsersList([]);
                    setCountRequest(0);
                    setGroupData({
                        ...groupData,
                        requestJoinGroup: groupData.requestJoinGroup - count,
                    });
                }
                setLoadingCancel(false);
            }, 5000);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {showModalAccept && (
                <Confirm
                    title={"Phê duyệt tất cả yêu cầu làm thành viên?"}
                    text={`Bạn sắp thêm ${countRequest} người vào nhóm ${groupData.name}`}
                    closeModal={() => setShowModalAccept(false)}
                    confirm={() => acceptRequests(payload, countRequest)}
                />
            )}
            {showModalRefuse && (
                <Confirm
                    title={"Từ chối tất cả yêu cầu làm thành viên?"}
                    text={`Bạn sắp từ chối ${countRequest} yêu cầu làm thành viên`}
                    closeModal={() => setShowModalRefuse(false)}
                    confirm={() => cancelRequests(payload, countRequest)}
                />
            )}
            <div className="w-full pt-6 px-4 pb-4 bg-white">
                <div className="flex flex-col w-full lg:w-[888px] mx-auto">
                    <div className="flex flex-col justify-between w-full mb-4 md:flex-row lg:flex-row ">
                        <div className="flex">
                            <h2 className="flex items-center text-[24px] font-bold">
                                Yêu cầu làm thành viên
                                <span className="block w-1 h-1 mx-2 bg-slate-500 rounded-full"></span>
                                <span className="text-gray-500">
                                    {countRequest}
                                </span>
                                {showButton && (
                                    <span className=" ml-1 font-medium text-gray-500">
                                        kết quả khớp
                                    </span>
                                )}
                            </h2>
                        </div>
                        <div className="flex gap-3 mt-3 md:mt-0">
                            <Button
                                _className={
                                    "flex items-center h-9 px-3 lg:px-10 bg-blue-500 rounded-md hover:bg-blue-600"
                                }
                                cursorDefault={
                                    countRequest <= 0 ||
                                    loadingAccept ||
                                    loadingCancel
                                }
                                onClick={() =>
                                    countRequest > 0 &&
                                    !loadingAccept &&
                                    !loadingCancel &&
                                    setShowModalAccept(true)
                                }
                            >
                                {loadingAccept && (
                                    <span className="block w-5 h-5 mr-1">
                                        <LoadingCircleLine />
                                    </span>
                                )}
                                <span className="text-[15px] text-white font-semibold ">
                                    Phê duyệt tất cả
                                </span>
                            </Button>
                            <Button
                                _className={
                                    "flex items-center h-9 px-3 lg:px-10 bg-gray-200 rounded-md hover:bg-gray-300"
                                }
                                cursorDefault={
                                    countRequest <= 0 ||
                                    loadingAccept ||
                                    loadingCancel
                                }
                                onClick={() =>
                                    countRequest > 0 &&
                                    !loadingAccept &&
                                    !loadingCancel &&
                                    setShowModalRefuse(true)
                                }
                            >
                                {loadingCancel && (
                                    <span className="block w-5 h-5 mr-1">
                                        <LoadingCircleLine />
                                    </span>
                                )}
                                <span className="text-[15px] font-semibold">
                                    Từ chối tất cả
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div className="flex w-full pb-2">
                        <div className="flex-1 py-[6px]  ">
                            <div className="flex-1 flex w-full h-full px-3 bg-gray-200 rounded-full  ">
                                <Button
                                    _className={`h-full transition-all overflow-hidden  ${
                                        isFocus ? "w-0" : "w-[15px]"
                                    }`}
                                >
                                    <label
                                        htmlFor="searchText"
                                        className="flex items-center h-full w-full cursor-pointer"
                                    >
                                        <BsSearch />
                                    </label>
                                </Button>
                                <input
                                    className="flex-1 h-full px-[6px] py-2 bg-transparent outline-none"
                                    type="text"
                                    name={text}
                                    id="searchText"
                                    placeholder="Tìm kiếm theo tên"
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>
                        </div>
                        {context.width >= 414 && (
                            <div className="py-[6px] ml-3">
                                <ButtonItem
                                    itemList={buttonItem}
                                    layoutRight={true}
                                    payload={payload}
                                    setPayload={setPayload}
                                    cursorDefault={
                                        loadingAccept || loadingCancel
                                    }
                                />
                            </div>
                        )}
                    </div>
                    {context.width >= 1024 && (
                        <div className="flex gap-2 w-full py-2 ">
                            <div className="w-max">
                                <Button
                                    _className={`flex items-center px-3 py-2 bg-gray-200 rounded-md   ${
                                        showButton
                                            ? "hover:bg-gray-300"
                                            : "opacity-50 cursor-not-allowed"
                                    }`}
                                    onClick={() => {
                                        !loadingAccept &&
                                            !loadingCancel &&
                                            showButton &&
                                            setPayload({
                                                limit: payload.limit,
                                                page: 1,
                                                number: 0,
                                                orderBy: "DESC",
                                            });
                                        !loadingAccept &&
                                            !loadingCancel &&
                                            showButton &&
                                            setShowButton(false);
                                    }}
                                >
                                    <span className=" font-medium">
                                        Xóa bộ lọc
                                    </span>
                                </Button>
                            </div>
                            {buttonList.length > 0 &&
                                buttonList.map((item, index) => (
                                    <ButtonItem
                                        key={index}
                                        itemList={item}
                                        payload={payload}
                                        setPayload={setPayload}
                                        cursorDefault={
                                            loadingAccept || loadingCancel
                                        }
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default LayouTop;
