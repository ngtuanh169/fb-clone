import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import postsApi from "../../../../api/postsApi";
import { ValueContext } from "../..";
import LoadingCircleLine from "../../../LoadingCircleLine";
import Button from "../../../Button";
import Confirm from "../../../Modal/Confirm";
import { TbBookOff } from "react-icons/tb";
function UnPosts({ closeModal = () => {} }) {
    const { groupId } = useParams();
    const { postsData, postsList, setPostsList } = useContext(ValueContext);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const unposts = async () => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("postsId", postsData.id);
            params.append("groupId", groupId);
            const res = await postsApi.unposts(params);
            if (res.success) {
                closeModal();
                const newArr =
                    postsList.length > 0 &&
                    postsList.filter((item) => item.id !== postsData.id);
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
                    title={"Gỡ bài viết"}
                    text={`Bạn muốn gỡ bài viết này khỏi nhóm ${postsData.groupName} `}
                    confirm={unposts}
                    loading={loading}
                    closeModal={() => setShowModal(false)}
                />
            )}
            <Button
                _className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-200"
                cursorDefault={loading}
                onClick={() => !loading && postsData.id && setShowModal(true)}
            >
                {loading ? (
                    <span className="block w-5 h-5">
                        <LoadingCircleLine />
                    </span>
                ) : (
                    <TbBookOff className="text-[20px]" />
                )}
                <span className=" font-medium">Gỡ bài viết</span>
            </Button>
        </div>
    );
}

export default UnPosts;
