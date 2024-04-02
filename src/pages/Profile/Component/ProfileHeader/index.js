import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import userApi from "../../../../api/userApi";
import ProfileNav from "../ProfileNav";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";
function ProdileHeader() {
    const { userId } = useParams();
    const user = useSelector((state) => state.user);
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            try {
                setIsLoading(true);
                const res = await userApi.getInfo({ userId });
                if (res.success && res?.data) {
                    setUserData(res.data);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        userId !== user.userId && getUser();
    }, [userId]);
    return (
        <div className="w-full flex flex-col mb-4 bg-gradient-to-b from-slate-400 via-white to-white">
            <div className="w-full max-w-full lg:w-[1100px] my-0 mx-auto">
                <HeaderTop isLoading={isLoading} userData={userData} />
                <HeaderBottom isLoading={isLoading} userData={userData} />
                <ProfileNav />
            </div>
        </div>
    );
}

export default ProdileHeader;
