import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatAvatar, formatNumberK } from "../../../../../Hooks/useFormat";
import { GroupContext } from "../../GroupProvider";
import userApi from "../../../../../api/userApi";
import MainCard from "../../../../../Components/MainCard";
import SkeletonLoading from "../../../../../Components/SkeletonLoading";
import { RxDotFilled } from "react-icons/rx";
function Members() {
    const { groupData } = useContext(GroupContext);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true);
                const params = { userId: groupData.adminId };
                const res = await userApi.getInfo(params);
                if (res.success) {
                    setUserData(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        groupData.adminId && !loading && getUser();
    }, [groupData.adminId]);
    return (
        <MainCard>
            <div className="flex flex-col w-full p-5">
                <div className="flex items-center pb-5 border-b">
                    <span className="font-semibold text-[17px]">
                        Thành viên
                    </span>
                    <RxDotFilled className="text-gray-500" />
                    <span className=" font-medium text-gray-500">
                        {formatNumberK(groupData.members)}
                    </span>
                </div>
                <div className="flex flex-col w-full pt-3">
                    {loading ? (
                        <div className=" h-10 w-10">
                            <SkeletonLoading circle />
                        </div>
                    ) : (
                        <>
                            {!groupData.checkJoined && groupData.status == 1 ? (
                                <Link to={`/profile/1`} className="w-max">
                                    <img
                                        className="h-10 w-10 object-cover object-center rounded-full border"
                                        src={formatAvatar(
                                            userData.avatar,
                                            userData.sx
                                        )}
                                        alt=""
                                    />
                                </Link>
                            ) : (
                                <Link
                                    to={`/group/${groupData.id}/user/1`}
                                    className="w-max"
                                >
                                    <img
                                        className="h-10 w-10 object-cover object-center rounded-full border"
                                        src={formatAvatar(
                                            userData.avatar,
                                            userData.sx
                                        )}
                                        alt=""
                                    />
                                </Link>
                            )}

                            <span className="mt-2 font-normal">
                                {userData.name} là quản trị viên
                            </span>
                        </>
                    )}
                </div>
            </div>
        </MainCard>
    );
}

export default Members;
