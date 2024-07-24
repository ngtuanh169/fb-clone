import { useState, useRef, useContext, useEffect } from "react";
import { useClickOutSide } from "../../../Hooks/useClickOutSide";
import { ValueContext } from "..";
import SkeletonLoading from "../../SkeletonLoading";
import Button from "../../Button";
import Comment from "./Comment";
import { AiFillCaretDown } from "react-icons/ai";
import commentApi from "../../../api/commentApi";
function PostsReact() {
    const options = [
        {
            id: 1,
            name: "Nổi bật nhất",
            des: "Hiển thị những bình luận có lượt cao nhất trước tiên ",
            orderBy: "HOT",
        },
        {
            id: 2,
            name: "Mới nhất",
            des: "Hiển thị bình luận từ mới nhất đến cũ nhất",
            orderBy: "DESC",
        },
    ];
    const divRef = useRef();
    const { postsData, setPostsData, commentsList, setCommentsList } =
        useContext(ValueContext);
    const [optionId, setOptionId] = useState(options[0].id);
    const [showOptions, setShowOptions] = useState(false);
    const [payload, setPayload] = useState({
        limit: 6,
        page: 1,
        postsId: postsData.id,
        parentId: 0,
        orderBy: options[0].orderBy,
    });
    const [fristId, setFristId] = useState(0);
    const [lastId, setLastId] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [totalComment, setTotalComment] = useState(postsData.countComments);
    const [loading, setLoading] = useState(false);

    useClickOutSide(divRef, () => setShowOptions(false));
    useEffect(() => {
        const getComments = async () => {
            try {
                setLoading(true);
                const params = { ...payload, fristId, lastId };
                const res = await commentApi.get(params);
                if (res.success && res.count > 0 && res?.data) {
                    const length = res.data.length;
                    const newArray =
                        payload.orderBy == "ASC"
                            ? commentsList.filter((item) => !item?.fake)
                            : commentsList;
                    setCommentsList([...newArray, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    setTotalComment(res.countAll);
                    payload.page == 1 && setFristId(res.data[0].id);
                    setLastId(res.data[length - 1].id);
                } else {
                    setTotalPage(0);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        !loading && payload.page <= totalPage && getComments();
    }, [payload]);
    useEffect(() => {
        postsData.countComments !== totalComment &&
            setPostsData({ ...postsData, countComments: totalComment });
    }, [totalComment]);
    useEffect(() => {
        if (options[optionId - 1].orderBy !== payload.orderBy) {
            setFristId(0);
            setLastId(0);
            setCommentsList([]);
            setTotalPage(1);
            setPayload({
                ...payload,
                page: 1,
                orderBy: options[optionId - 1].orderBy,
            });
            setShowOptions(false);
        }
    }, [optionId]);
    return (
        <div className="w-full">
            {commentsList.length > 0 && (
                <div className="W-full px-2">
                    <div className=" w-full flex justify-end ">
                        <div ref={divRef} className="relative w-max pb-1">
                            <Button
                                onClick={() => setShowOptions(!showOptions)}
                            >
                                <span className="flex items-center font-medium text-[15px] text-gray-600">
                                    {options[optionId - 1].name}
                                    <AiFillCaretDown className="ml-1" />
                                </span>
                            </Button>
                            {showOptions && (
                                <div
                                    style={{
                                        boxShadow: "0px 1px 2px #ccc",
                                    }}
                                    className=" absolute bottom-[105%] right-0 w-[280px] p-2 bg-white rounded-lg z-20"
                                >
                                    <div className="flex flex-col w-full">
                                        {options.length > 0 &&
                                            options.map((item) => (
                                                <Button
                                                    key={item.id}
                                                    _className={`flex flex-col w-full p-2 text-left rounded-md ${
                                                        item.id === optionId
                                                            ? "bg-gray-200"
                                                            : "hover:bg-gray-300"
                                                    }`}
                                                    cursorDefault={loading}
                                                    onClick={() =>
                                                        !loading &&
                                                        setOptionId(item.id)
                                                    }
                                                >
                                                    <span className=" font-medium text-[15px]">
                                                        {item.name}
                                                    </span>
                                                    <span className=" font-normal text-[12px] text-gray-500">
                                                        {item.des}
                                                    </span>
                                                </Button>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full flex flex-col gap-2">
                {commentsList.length > 0 &&
                    commentsList.map((item) => (
                        <Comment key={item.id} data={item} />
                    ))}
                {loading &&
                    Array(3)
                        .fill(0)
                        .map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 w-full mt-2"
                            >
                                <div className="w-10 h-10">
                                    <SkeletonLoading circle />
                                </div>
                                <div className="w-[250px] h-[30px] rounded-md overflow-hidden">
                                    <SkeletonLoading circle />
                                </div>
                            </div>
                        ))}
            </div>
            {payload.page < totalPage && !loading && (
                <div className="w-full p-2">
                    <Button
                        onClick={() =>
                            setPayload({ ...payload, page: payload.page + 1 })
                        }
                    >
                        <span className="font-medium text-[15px] text-gray-600 hover:underline">
                            Xem thêm bình luận
                        </span>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default PostsReact;
