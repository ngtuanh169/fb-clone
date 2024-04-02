import { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ScreenSize } from "../../../../../../../App";
import groupApi from "../../../../../../../api/groupApi";
import SkeletonLoading from "../../../../../../../Components/SkeletonLoading";
import Button from "../../../../../../../Components/Button";
import PostsItem from "./PostsItem";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
function PostsList() {
    const { groupId } = useParams();
    const context = useContext(ScreenSize);
    const divRef = useRef();
    const itemRef = useRef();
    const slRef = useRef();
    const [itemWidth, setItemWidth] = useState(0);
    const [slWidth, setSlWidth] = useState(0);
    const [divWidth, setDivWidth] = useState(0);
    const [number, setNumber] = useState(0);
    const [showButtonPrev, setShowButtonPrev] = useState(false);
    const [showButtonNext, setShowButtonNext] = useState(false);

    const [payload, setPayload] = useState({ limit: 2, page: 1, groupId });
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [firstId, setFirstId] = useState(0);
    const [lastId, setLastId] = useState(0);
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        itemRef.current && setItemWidth(itemRef.current.offsetWidth);
        slRef.current && setSlWidth(slRef.current.offsetWidth);
        divRef.current && setDivWidth(divRef.current.offsetWidth - 16);
    }, [context.width, loading]);

    useEffect(() => {
        number < 0 ? setShowButtonPrev(true) : setShowButtonPrev(false);
        if (number <= divWidth - slWidth && payload.page >= totalPage) {
            setShowButtonNext(false);
        } else {
            setShowButtonNext(true);
        }
    }, [number, slWidth, divWidth]);

    useEffect(() => {
        if (!loading && number === divWidth - slWidth && slWidth > divWidth) {
            setPayload({ ...payload, page: payload.page + 1 });
        }
    }, [number, loading]);

    useEffect(() => {
        const getPostsList = async () => {
            try {
                setLoading(true);
                const params = { ...payload, firstId, lastId };
                const res = await groupApi.getPinnedPosts(params);
                if (res.success && res.count > 0) {
                    const length = res.data.length;
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    payload.page === 1 && setFirstId(res.data[0].id);
                    setLastId(res.data[length - 1].id);
                    setPostsList([...postsList, ...res.data]);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        !loading && groupId && payload.page <= totalPage && getPostsList();
    }, [payload]);

    const handlePrev = (itemWidth, number) => {
        if (number + itemWidth >= 0) {
            setNumber(0);
            return;
        }
        setNumber(number + itemWidth);
    };

    const handleNext = (itemWidth, slWidth, divWidth, number) => {
        if (number - itemWidth <= divWidth - slWidth) {
            setNumber(divWidth - slWidth);
            return;
        }
        setNumber(number - itemWidth);
    };

    return (
        <div ref={divRef} className="relative w-full overflow-hidden py-2 px-2">
            {showButtonPrev && (
                <div className=" absolute left-4 top-[50%] z-50 ">
                    <Button
                        _className={
                            "flex justify-center items-center w-12 h-12 rounded-full overflow-hidden bg-gray-200 drop-shadow-shadow012 hover:bg-gray-300"
                        }
                        onClick={() => handlePrev(itemWidth, number)}
                    >
                        <BsChevronLeft className="w-6 h-6" />
                    </Button>
                </div>
            )}
            {showButtonNext && (
                <div className=" absolute right-4 top-[50%] z-50 ">
                    <Button
                        _className={
                            "flex justify-center items-center w-12 h-12 rounded-full overflow-hidden bg-gray-200 drop-shadow-shadow012 hover:bg-gray-300"
                        }
                        onClick={() =>
                            handleNext(itemWidth, slWidth, divWidth, number)
                        }
                    >
                        <BsChevronRight className="w-6 h-6" />
                    </Button>
                </div>
            )}
            <div
                ref={slRef}
                style={{ transform: `translateX(${number}px)` }}
                className="flex gap-4 w-max bg-white transition-transform ease-linear duration-150"
            >
                {postsList.length > 0 &&
                    postsList.map((item) => (
                        <div key={item.id} ref={itemRef} className="">
                            <PostsItem data={item} />
                        </div>
                    ))}
                {loading &&
                    Array(2)
                        .fill(0)
                        .map((item, index) => (
                            <div
                                key={index}
                                style={{ boxShadow: " 0 0 10px #ccc" }}
                                className="flex gap-2 w-[250px] sm:w-[300px] h-[350px] rounded-lg p-3"
                            >
                                <div className="w-10 h-10">
                                    <SkeletonLoading circle />
                                </div>
                                <div className="flex flex-col justify-center gap-2 h-10">
                                    <div className="w-[100px] h-[15px] rounded-md overflow-hidden">
                                        <SkeletonLoading />
                                    </div>
                                    <div className="w-[80px] h-[10px] rounded-md overflow-hidden">
                                        <SkeletonLoading />
                                    </div>
                                </div>
                            </div>
                        ))}
            </div>
            {!loading && postsList.length === 0 && (
                <span className="block w-full text-center font-medium text-gray-500">
                    Không có dữ liệu phù hợp
                </span>
            )}
        </div>
    );
}

export default PostsList;
