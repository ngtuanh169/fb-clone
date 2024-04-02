import { useState, useEffect, useContext } from "react";
import userApi from "../../../../../../api/userApi";
import SkeletonLoading from "../../../../../../Components/SkeletonLoading";
import { GroupContext } from "../../../GroupProvider";
import Member from "../Member";
function AdminGroup() {
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
                    setUserData({ ...res.data, admin: true });
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        groupData.adminId && !loading && getUser();
    }, [groupData.adminId]);
    return (
        <div className="flex flex-col py-4 border-b">
            <div className="w-full">
                <span className=" font-medium">
                    Quản trị viên & người kiểm duyệt
                </span>
                <span className=" px-1 font-medium">·</span>
                <span>1</span>
            </div>
            {!loading && userData?.id && (
                <div className="w-full mt-4">
                    <Member data={userData} />
                </div>
            )}
            {loading && (
                <div className="flex items-center gap-2 mt-4">
                    <div className="h-[60px] w-[60px] ">
                        <SkeletonLoading circle />
                    </div>
                    <div className="h-[30px] w-[200px] rounded-md">
                        <SkeletonLoading />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminGroup;
