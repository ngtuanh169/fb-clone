import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../../Hooks/useFormat";
import friendsApi from "../../../../api/friendsApi";
import profileIntroductionApi from "../../../../api/profileIntroductionApi";
import MainCard from "../../../../Components/MainCard";
import Button from "../../../../Components/Button";

import signal from "../../../../assets/images/imgIcon/signal.png";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function PersonalInfomation() {
    const user = useSelector((state) => state.user);
    const { userId } = useParams();
    const [followers, setFollowers] = useState(0);
    const [introductionList, setIntroductionList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const countFollowers = async () => {
            setLoading(true);
            const params = { userId };
            const res = await friendsApi.countFriendsRequest(params);
            if (res.success) {
                setFollowers(res.count);
            }
        };
        userId && countFollowers();
    }, [userId]);
    useEffect(() => {
        const getProfileIntroduction = async () => {
            try {
                const params = { userId };
                const res = await profileIntroductionApi.get(params);
                if (res?.length > 0) {
                    setIntroductionList(res);
                }
            } catch (error) {
                console.log(error);
            }
        };
        userId && getProfileIntroduction();
    }, [userId]);
    return (
        <MainCard>
            <div className="p-3">
                <div className="">
                    <h2 className="text-[20px] font-bold">Giới thiệu</h2>
                </div>
                {introductionList.length > 0 &&
                    introductionList.map(
                        (item) =>
                            item.codeName && (
                                <div
                                    key={item.id}
                                    className=" flex items-center mt-4"
                                >
                                    <img
                                        className="w-[20px] h-[20px] opacity-50"
                                        src={item.linkIcon}
                                        alt=""
                                    />
                                    <span className="ml-3">{`${item.content} ${item.codeName}`}</span>
                                </div>
                            )
                    )}
                {followers > 0 && (
                    <div className=" flex items-center mt-4">
                        <img
                            className="w-[20px] h-[20px] opacity-50"
                            src={signal}
                            alt=""
                        />
                        <span className="ml-3">
                            <span>Có</span>
                            <Link
                                to={`/profile/${userId}/friends`}
                                className="mx-1 font-medium hover:underline"
                            >
                                {`${formatNumber(followers)} người`}
                            </Link>
                            <span>theo dõi</span>
                        </span>
                    </div>
                )}
                {user.userId == userId && (
                    <div className="w-full mt-4">
                        <Button
                            to={`/profile/${userId}/info`}
                            _className={
                                "flex justify-center w-full p-2 font-semibold bg-gray-200 rounded-lg hover:bg-gray-300"
                            }
                        >
                            <span>Chỉnh sửa chi tiết</span>
                        </Button>
                    </div>
                )}
            </div>
        </MainCard>
    );
}

export default PersonalInfomation;
