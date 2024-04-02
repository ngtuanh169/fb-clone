import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import groupApi from "../../../api/groupApi";
const GroupContext = createContext();
function GroupProvider({ children }) {
    const { groupId } = useParams();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [groupData, setGroupData] = useState({});
    useEffect(() => {
        const getGroupInfo = async () => {
            try {
                setLoading(true);
                const params = { userId: user.userId, groupId };
                const res = await groupApi.getGroupInfo(params);
                if (res.success) {
                    setGroupData(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        user.userId && groupId && getGroupInfo();
    }, [groupId, user.userId]);
    return (
        <GroupContext.Provider value={{ groupData, setGroupData, loading }}>
            {children}
        </GroupContext.Provider>
    );
}

export { GroupProvider, GroupContext };
