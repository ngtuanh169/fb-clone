import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../../../../../../Socket";
import groupApi from "../../../../../../api/groupApi";
import { GroupContext } from "../../../GroupProvider";
import SkeletonLoading from "../../../../../../Components/SkeletonLoading";
import Item from "./Item";
function LayoutBottom({
    payload,
    setPayload,
    setCountRequest = () => {},
    usersList,
    setUsersList = () => {},
}) {
    const socketContext = useContext(SocketContext);
    const { groupData } = useContext(GroupContext);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [callApi, setCallApi] = useState(false);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        const getRequests = async () => {
            try {
                setLoading(true);
                const params = { ...payload, number, groupId: groupData.id };
                const res = await groupApi.getRequestsJoinGroup(params);
                if (res.success && res.count > 0 && res.data) {
                    setUsersList([...usersList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    setCountRequest(res.count);
                } else {
                    setTotalPage(1);
                    setCountRequest(0);
                }
                setCallApi(false);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        callApi && groupData?.id && payload.page <= totalPage && getRequests();
    }, [callApi]);
    useEffect(() => {
        if (payload.page == 1) {
            setUsersList([]);
            setNumber(0);
        }
        setCallApi(true);
    }, [payload]);
    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const offsetHeight = document.documentElement.offsetHeight;
            const scrollTop = document.documentElement.scrollTop;
            if (scrollHeight - 2 < offsetHeight + scrollTop) {
                !loading &&
                    payload.page < totalPage &&
                    setPayload({ ...payload, page: payload.page + 1 });
            }
        };
        !loading && window.addEventListener("scroll", handleScroll);
        return () =>
            !loading && window.removeEventListener("scroll", handleScroll);
    }, [loading]);
    useEffect(() => {
        const handleEvent = (e) => {
            const data = JSON.parse(e.data);
            if (
                data.typeNoti === "requestJoinGroup" &&
                data.groupId == groupData.id
            ) {
                setNumber((prev) => prev + 1);
            }
        };
        socketContext && socketContext.addEventListener("message", handleEvent);
        return () =>
            socketContext &&
            socketContext.removeEventListener("message", handleEvent);
    }, [socketContext]);
    return (
        <div className="flex flex-col items-center w-full ">
            {usersList.length > 0 &&
                usersList.map((item) => (
                    <Item
                        key={item.id}
                        data={item}
                        usersList={usersList}
                        setUsersList={setUsersList}
                        setCountRequest={setCountRequest}
                    />
                ))}
            {loading &&
                Array(2)
                    .fill(0)
                    .map((item, index) => (
                        <div
                            key={index}
                            style={{ boxShadow: "0px 1px 2px 1px #ccc" }}
                            className="flex flex-col w-full sm:w-[600px] lg:w-[844px] mt-5 py-4 px-3 bg-white  rounded-lg "
                        >
                            <div className="flex items-center w-full">
                                <div className="w-10 h-10 mr-3 rounded-full overflow-hidden">
                                    <SkeletonLoading />
                                </div>
                                <div className="w-[200px] h-[30px] rounded-md">
                                    <SkeletonLoading />
                                </div>
                            </div>
                            <div className="flex w-full">
                                <div className="w-10 mr-3"></div>
                                <div className="grow flex flex-col gap-2">
                                    <div className="w-[100px] h-[20px] rounded-md">
                                        <SkeletonLoading />
                                    </div>
                                    <div className="w-[100px] h-[20px] rounded-md">
                                        <SkeletonLoading />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            {!loading && usersList.length == 0 && (
                <span className=" mx-auto mt-5 font-medium text-gray-500">
                    Không có yêu cầu nào
                </span>
            )}
        </div>
    );
}

export default LayoutBottom;
