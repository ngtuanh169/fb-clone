import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import groupApi from "../../../../api/groupApi";
import { GroupContext } from "../GroupProvider";
import LoadingCircleLine from "../../../../Components/LoadingCircleLine";
import LayoutTop from "./LayoutTop";
import LayoutBottom from "./LayoutBottom";
import avt from "../../../../assets/images/avatar/avatar.jpg";
import banner from "../../../../assets/images/banner/user_bn.png";

function MemberInfo() {
    const { userId } = useParams();
    const { groupData } = useContext(GroupContext);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getInfoMember = async () => {
            try {
                setLoading(true);
                const params = {
                    userId,
                    groupId: groupData.id,
                };
                const res = await groupApi.getInfoMember(params);
                if (res.success) {
                    setUserData(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        groupData?.id && !loading && getInfoMember();
    }, [userId, groupData?.id]);
    return (
        <div className="w-full">
            {loading || !userData?.userId || !groupData?.id ? (
                <div className="w-5 h-5 mx-auto my-4">
                    <LoadingCircleLine />
                </div>
            ) : (
                <div className="flex flex-col">
                    <LayoutTop data={userData} />
                    <LayoutBottom data={userData} />
                </div>
            )}
        </div>
    );
}

export default MemberInfo;
