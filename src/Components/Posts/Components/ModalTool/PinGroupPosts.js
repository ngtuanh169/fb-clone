import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ValueContext } from "../..";
import groupApi from "../../../../api/groupApi";
import LoadingCircleLine from "../../../LoadingCircleLine";
import Button from "../../../Button";
import { VscPinned } from "react-icons/vsc";
import { TbPinnedOff } from "react-icons/tb";
function PinGroupPosts({ isPinned = false }) {
    const { groupId } = useParams();
    const { postsData } = useContext(ValueContext);
    const [pinned, setPinned] = useState(isPinned);
    const [loading, setLoading] = useState(false);

    const pinGroupPosts = async () => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("postsId", postsData.id);
            params.append("groupId", groupId);
            const res = await groupApi.pinGroupPosts(params);
            if (res.success) {
                setPinned(true);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const unpinGroupPosts = async () => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("postsId", postsData.id);
            params.append("groupId", groupId);
            const res = await groupApi.unpinGroupPosts(params);
            if (res.success) {
                setPinned(false);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className=" w-full">
            <Button
                _className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-200"
                cursorDefault={loading}
                onClick={() => (pinned ? unpinGroupPosts() : pinGroupPosts())}
            >
                {pinned ? (
                    <>
                        {loading ? (
                            <span className="block w-5 h-5 ">
                                <LoadingCircleLine />
                            </span>
                        ) : (
                            <TbPinnedOff className="text-[20px]" />
                        )}
                        <span className=" font-semibold">
                            Bỏ ghim khỏi phần Đáng chú ý
                        </span>
                    </>
                ) : (
                    <>
                        {loading ? (
                            <span className="block w-5 h-5 ">
                                <LoadingCircleLine />
                            </span>
                        ) : (
                            <VscPinned className="text-[20px]" />
                        )}

                        <span className=" font-semibold">
                            Ghim vào phần Đáng chú ý
                        </span>
                    </>
                )}
            </Button>
            <b className="block w-full h-[1px] my-1 bg-gray-300"></b>
        </div>
    );
}

export default PinGroupPosts;
