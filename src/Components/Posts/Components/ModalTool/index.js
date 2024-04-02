import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ValueContext } from "../..";
import groupApi from "../../../../api/groupApi";
import LoadingCircleLine from "../../../LoadingCircleLine";
import PinGroupPosts from "./PinGroupPosts";
import UnPosts from "./UnPosts";
import DeleteMember from "./DeleteMember";
import UnpostsDeleteMember from "./UnpostsDeleteMember";
import HidePosts from "./HidePosts";
function ModalTool({ closeModal = () => {} }) {
    const { groupId } = useParams();
    const user = useSelector((state) => state.user);
    const { postsData, adminId } = useContext(ValueContext);
    const [pinned, setPinned] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkPinned = async () => {
            try {
                setLoading(true);
                const params = { postsId: postsData.id, groupId };
                const res = await groupApi.checkPinned(params);
                if (res.success && res.pinned) {
                    setPinned(true);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        groupId && postsData.id && checkPinned();
    }, []);
    useEffect(() => {
        !groupId && setLoading(false);
    }, [groupId]);
    return (
        <div
            style={{ boxShadow: "rgb(204, 204, 204) 0px 1px 3px 2px" }}
            className="flex flex-col w-[320px] p-2 bg-white rounded-md"
        >
            {loading ? (
                <div className="flex items-center justify-center w-full h-[50px]">
                    <div className="w-5 h-5">
                        <LoadingCircleLine />
                    </div>
                </div>
            ) : (
                <>
                    {groupId && user.userId === adminId && (
                        <PinGroupPosts isPinned={pinned} />
                    )}
                    {user.userId === postsData.userId && (
                        <UnPosts closeModal={closeModal} />
                    )}
                    {user.userId !== postsData.userId &&
                        groupId &&
                        user.userId === adminId && (
                            <>
                                <DeleteMember closeModal={closeModal} />
                                <UnpostsDeleteMember closeModal={closeModal} />
                            </>
                        )}
                    {user.userId !== postsData.userId && (
                        <HidePosts closeModal={closeModal} />
                    )}
                </>
            )}
        </div>
    );
}

export default ModalTool;
