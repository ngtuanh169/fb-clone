import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userApi from "../../../api/userApi";
import SkeletonLoading from "../../../Components/SkeletonLoading";
import MainCard from "../../../Components/MainCard";
import Search from "../index";
import Item from "./Item";
import avt from "../../../assets/images/avatar/avatar.jpg";
function PeoPleSearch() {
    const { text } = useParams();
    const [userList, setUserList] = useState([]);
    const [payload, setPayload] = useState({
        limit: 6,
        page: 1,
        text: text.trim(),
    });
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const res = await userApi.searchUser(payload);
                if (res.success && res.count > 0 && res.data) {
                    setUserList([...userList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                } else {
                    setTotalPage(0);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        payload.page <= totalPage && getUsers();
    }, [payload]);
    useEffect(() => {
        console.log(text.trim());
        console.log(payload.text);
        console.log(text.trim() !== payload.text);
        if (text.trim() && text.trim() !== payload.text) {
            setTotalPage(1);
            setUserList([]);
            setPayload({ ...payload, page: 1, text });
        }
    }, [text]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const offsetHeight = document.documentElement.offsetHeight;
            const scrollTop = document.documentElement.scrollTop;
            if (scrollHeight - 2 < offsetHeight + scrollTop) {
                !loading && setPayload({ ...payload, page: payload.page + 1 });
            }
        };
        !loading && window.addEventListener("scroll", handleScroll);
        return () =>
            !loading && window.removeEventListener("scroll", handleScroll);
    }, [loading]);
    return (
        <Search>
            <div className="flex flex-col items-center w-full mt-8">
                {userList.length > 0 &&
                    userList.map((item) => <Item key={item.id} data={item} />)}
                {userList.length == 0 && !loading && (
                    <span className="mx-auto my-5 font-medium text-gray-500">
                        Không có kết quả trùng khớp
                    </span>
                )}
                {loading &&
                    Array(3)
                        .fill(0)
                        .map((item, index) => (
                            <div key={index} className="w-full md:w-[680px]">
                                <MainCard>
                                    <div className="flex w-full p-4">
                                        <div className="w-[60px] h-[60px] ">
                                            <SkeletonLoading circle />
                                        </div>
                                        <div className="grow flex flex-col ml-4">
                                            <div className="w-[200px] h-[30px] rounded-md">
                                                <SkeletonLoading />
                                            </div>
                                            <div className="w-[150px] h-[25px] mt-3 rounded-md">
                                                <SkeletonLoading />
                                            </div>
                                        </div>
                                    </div>
                                </MainCard>
                            </div>
                        ))}
            </div>
        </Search>
    );
}

export default PeoPleSearch;
