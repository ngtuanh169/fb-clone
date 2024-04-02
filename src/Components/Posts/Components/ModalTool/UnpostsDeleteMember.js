import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import groupApi from "../../../../api/groupApi";
import { ValueContext } from "../..";
import LoadingCircleLine from "../../../LoadingCircleLine";
import Button from "../../../Button";
import Confirm from "../../../Modal/Confirm";
import { IoTrashOutline } from "react-icons/io5";
function UnpostsDeleteMember({ closeModal = () => {} }) {
    const { groupId } = useParams();
    const { postsData, postsList, setPostsList } = useContext(ValueContext);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const unpostsDeleteMember = async () => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("userId", postsData.userId);
            params.append("postsId", postsData.id);
            params.append("groupId", groupId);
            const res = await groupApi.unpostsDeleteMember(params);
            if (res.success) {
                const newArr =
                    postsList.length > 0 &&
                    postsList.filter((item) => item.id !== postsData.id);
                closeModal();
                setPostsList(newArr);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full">
            {showModal && (
                <Confirm
                    title={"Gỡ bài viết và xóa tác giả"}
                    text={`Bạn muốn gỡ bài viết này và xóa ${postsData.userName} ra khỏi nhóm ${postsData.groupName}`}
                    loading={loading}
                    confirm={unpostsDeleteMember}
                    closeModal={() => setShowModal(false)}
                />
            )}
            <Button
                _className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-200"
                cursorDefault={loading}
                onClick={() =>
                    !loading &&
                    groupId &&
                    postsData.id &&
                    postsData.userId &&
                    setShowModal(true)
                }
            >
                {loading ? (
                    <span className="block w-5 h-5">
                        <LoadingCircleLine />
                    </span>
                ) : (
                    <IoTrashOutline className="text-[20px]" />
                )}
                <span className=" font-medium">Gỡ bài viết và xóa tác giả</span>
            </Button>
        </div>
    );
}

export default UnpostsDeleteMember;
