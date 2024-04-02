import SubLayoutLeft from "../../Components/SubLayoutLeft";
import SearchSubLayout from "../../Components/Modal/SearchSubLayout";
function Marketplace() {
    return (
        <div className="flex">
            <div className="flex flex-col lg:flex-row w-full">
                <div className="">
                    <SubLayoutLeft name={"Watch"}>
                        <div className="mb-2 lg:mb-0">
                            <SearchSubLayout nameInput="Nhập tìm kiếm" />
                        </div>
                    </SubLayoutLeft>
                </div>
                <div className="flex-1 pt-5  ">
                    <div className="w-full sm:w-[550px] lg:w-[820px] mx-auto text-center">
                        <span className=" font-medium text-gray-500">
                            Không có dữ liệu
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Marketplace;
