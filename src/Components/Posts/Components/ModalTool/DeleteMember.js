import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import groupApi from "../../../../api/groupApi";
import { ValueContext } from "../..";
import LoadingCircleLine from "../../../LoadingCircleLine";
import Button from "../../../Button";
import Confirm from "../../../Modal/Confirm";
import { FaUserAltSlash } from "react-icons/fa";
function DeleteMember({ closeModal = () => {} }) {
    const { groupId } = useParams();
    const { postsData } = useContext(ValueContext);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const deletMember = async () => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("userId", postsData.userId);
            params.append("groupId", groupId);
            const res = await groupApi.deleteMember(params);
            if (res.success) {
                closeModal();
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
                    title={"Xoá thành viên"}
                    text={`Bạn muốn xóa ${postsData.userName} khỏi nhóm ${postsData.groupName} `}
                    confirm={deletMember}
                    loading={loading}
                    closeModal={() => setShowModal(false)}
                />
            )}
            <Button
                _className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-200"
                cursorDefault={loading}
                onClick={() =>
                    !loading &&
                    groupId &&
                    postsData.userId &&
                    setShowModal(true)
                }
            >
                {loading ? (
                    <span className="block w-5 h-5">
                        <LoadingCircleLine />
                    </span>
                ) : (
                    <FaUserAltSlash className="text-[20px]" />
                )}
                <span className=" font-medium">Xóa tác giả</span>
            </Button>
        </div>
    );
}

export default DeleteMember;
