import { Link } from "react-router-dom";
import MainCard from "../../../../../../../Components/MainCard";
import { HiUserGroup } from "react-icons/hi";
function Introduce() {
    const date = new Date(1681821128145);
    return (
        <div className="w-full">
            <MainCard>
                <div className="flex flex-col p-4">
                    <div className="">
                        <span className="text-[18px] font-bold">
                            Giới thiệu
                        </span>
                    </div>
                    <div className="flex items-center mt-3  ">
                        <div className="">
                            <HiUserGroup className="text-[22px] text-gray-500" />
                        </div>
                        <div className="flex-1 ml-3 text-[15px] ">
                            <span>Thành viên của</span>
                            <Link
                                to={"/"}
                                className="mx-1 font-medium hover:underline"
                            >
                                Giao Lưu - Blue Sky
                            </Link>
                            <span>{`từ ${date.getDate()} tháng ${
                                date.getMonth() + 1
                            }, ${date.getFullYear()}`}</span>
                        </div>
                    </div>
                </div>
            </MainCard>
        </div>
    );
}

export default Introduce;
