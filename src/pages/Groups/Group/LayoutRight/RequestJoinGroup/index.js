import { useState, useContext } from "react";
import { GroupContext } from "../../GroupProvider";
import LayouTop from "./LayoutTop";
import LayoutBottom from "./LayoutBottom";
function RequestJoinGroup() {
    const { groupData } = useContext(GroupContext);
    const [payload, setPayload] = useState({
        limit: 4,
        page: 1,
        orderBy: "DESC",
    });
    const [countRequest, setCountRequest] = useState(
        groupData.requestJoinGroup
    );
    const [usersList, setUsersList] = useState([]);
    return (
        <div className="flex flex-col w-full">
            <div className="w-full">
                <LayouTop
                    payload={payload}
                    setPayload={setPayload}
                    countRequest={countRequest}
                    setCountRequest={setCountRequest}
                    setUsersList={setUsersList}
                />
            </div>
            <div className="w-full py-5">
                <LayoutBottom
                    payload={payload}
                    setPayload={setPayload}
                    setCountRequest={setCountRequest}
                    usersList={usersList}
                    setUsersList={setUsersList}
                />
            </div>
        </div>
    );
}

export default RequestJoinGroup;
