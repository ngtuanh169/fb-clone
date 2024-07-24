import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import postsApi from "../../api/postsApi";
import MainCard from "../../Components/MainCard";
import SkeletonLoading from "../../Components/SkeletonLoading";
import Posts from "../../Components/Posts";
import PostsLoading from "../../Components/PostsLoading";
import ProdileHeader from "./Component/ProfileHeader";
import PersonalInfomation from "./Component/PersonalInfomation";
import Photo from "./Component/Photo";
import Friends from "./Component/Friends";
import InputBox from "../../Components/InputBox";
import Filter from "./Component/Filter";

function Profile() {
    const { postsId, userId } = useParams();
    const user = useSelector((state) => state.user);
    const [postsList, setPostsList] = useState([]);
    const [payload, setPayload] = useState({
        limit: 6,
        page: 1,
        status: userId !== user.userId ? "0" : "",
        userId,
    });
    const [fristId, setFristId] = useState(0);
    const [lastId, setLastId] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPostsList = async () => {
            try {
                setLoading(true);
                const params = { ...payload, fristId, lastId };
                const res = await postsApi.getByUserId(params);
                if (res.success && res.count > 0 && res?.data) {
                    const length = res.data.length;
                    setPostsList([...postsList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
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
        userId &&
            !postsId &&
            !loading &&
            payload.page <= totalPage &&
            getPostsList();
    }, [payload]);

    useEffect(() => {
        if (userId !== payload.userId) {
            setPostsList([]);
            setFristId(0);
            setLastId(0);
            setTotalPage(1);
            setPayload({
                ...payload,
                page: 1,
                userId,
                status: userId !== user.userId ? "0" : "",
            });
        }
    }, [userId]);
    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const offsetHeight = document.documentElement.offsetHeight;
            const scrollTop = document.documentElement.scrollTop;
            console.log(scrollHeight - 2 < offsetHeight + scrollTop);
            if (scrollHeight - 2 < offsetHeight + scrollTop) {
                postsList.length > 0 &&
                    setPayload({ ...payload, page: payload.page + 1 });
            }
        };
        !postsId && !loading && window.addEventListener("scroll", handleScroll);
        return () =>
            !postsId &&
            !loading &&
            window.removeEventListener("scroll", handleScroll);
    }, [loading]);
    return (
        <div className="">
            <ProdileHeader />
            <div className=" flex flex-col lg:flex-row w-full max-w-[500px] lg:w-[1000px] lg:max-w-none h-auto lg:px-0 mx-auto">
                <div className=" w-full lg:w-2/5 min-h-screen h-max ">
                    <PersonalInfomation />
                    <Photo />
                    <Friends />
                    <div className=""></div>
                    <div className="mb-4 lg:mb-0">
                        <span className="block text-[13px] text-gray-500 leading-[15px]">
                            Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn
                            quảng cáo · Cookie · Xem thêm · Meta © 2023
                        </span>
                    </div>
                </div>
                <div className=" w-full lg:w-3/5 lg:pl-4 ">
                    {userId === user.userId && (
                        <InputBox
                            postsList={postsList}
                            setPostList={setPostsList}
                        />
                    )}
                    <Filter />
                    {postsList.length > 0 &&
                        postsList.map((item) => {
                            return <Posts key={item.id} data={item} />;
                        })}
                    {loading && <PostsLoading />}
                    {!loading && postsList.length == 0 && (
                        <div className="w-full text-center mb-4">
                            <span className="font-bold text-[20px] text-center text-gray-500">
                                Không có bài viết
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
