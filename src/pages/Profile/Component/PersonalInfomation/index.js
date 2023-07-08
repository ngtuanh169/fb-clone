import { formatNumber } from "../../../../Hooks/useFormat";
import MainCard from "../../../../Components/MainCard";
import Button from "../../../../Components/Button";

import job from "../../../../assets/images/imgIcon/job.png";
import education from "../../../../assets/images/imgIcon/education.png";
import home from "../../../../assets/images/imgIcon/home.png";
import heart from "../../../../assets/images/imgIcon/heart.png";
import signal from "../../../../assets/images/imgIcon/signal.png";

function PersonalInfomation() {
    const listInfo = [
        { id: 1, icon: job, text: "Trường Đại học Công nghiệp Hà Nội" },
        { id: 2, icon: education, text: "Đã học tại THPT Hồng Thái" },
        { id: 3, icon: home, text: "Sống tại Hà Nội" },
        { id: 4, icon: heart, text: "Độc thân" },
        {
            id: 5,
            icon: signal,
            text: `Có ${formatNumber(1204)} người theo dõi`,
        },
    ];
    return (
        <MainCard>
            <div className="p-3">
                <div className="">
                    <h2 className="text-[20px] font-bold">Giới thiệu</h2>
                </div>
                {listInfo.length > 0 &&
                    listInfo.map((item) => (
                        <div key={item.id} className=" flex items-center mt-4">
                            <img
                                className="w-[20px] h-[20px] opacity-50"
                                src={item.icon}
                                alt=""
                            />
                            <span className="ml-3">{item.text}</span>
                        </div>
                    ))}
                <div className="w-full mt-4">
                    <Button
                        to={"/profile/info/overview"}
                        _className={
                            "flex justify-center w-full p-2 font-semibold bg-gray-200 rounded-lg hover:bg-gray-300"
                        }
                    >
                        <span>Chỉnh sửa chi tiết</span>
                    </Button>
                </div>
            </div>
        </MainCard>
    );
}

export default PersonalInfomation;
