import { useState, useEffect, useContext } from "react";
import { ScreenSize } from "../../../../../../App";
import Button from "../../../../../../Components/Button";
import Confirm from "../../../../../../Components/Modal/Confirm";
import ButtonItem from "./ButtonItem";
import { BsSearch } from "react-icons/bs";
function LayouTop() {
    const buttonItem = {
        name: "time",
        options: [
            { id: 1, name: "Mới nhất trước" },
            { id: 2, name: "Cũ nhất trước" },
        ],
    };
    const buttonList = [
        {
            title: "Ngày tham gia Facebook",
            name: "joinDate",
            options: [
                { id: 1, name: "Chưa đến 3 tháng trước" },
                { id: 2, name: "Chưa đến 6 tháng trước" },
                { id: 3, name: "Chưa đến 1 năm trước" },
                { id: 4, name: "Chưa đến 2 năm trước" },
            ],
        },
        {
            title: "Thời gian yêu cầu",
            name: "requestTime",
            options: [
                { id: 1, name: "Dưới 1 tuần" },
                { id: 2, name: "Dưới 1 tháng" },
                { id: 3, name: "Dưới 3 tháng" },
                { id: 4, name: "Dưới 6 tháng" },
                { id: 5, name: "Dưới 1 năm" },
                { id: 6, name: "Hơn 1 năm" },
            ],
        },
        {
            title: "Giới tính",
            name: "sx",
            options: [
                { id: 1, name: "Nam" },
                { id: 2, name: "Nữ" },
            ],
        },
        {
            title: "Ảnh đại diện",
            name: "avatar",
            options: [
                { id: 1, name: "Có ảnh đại diện" },
                { id: 2, name: "Không có ảnh đại diện" },
            ],
        },
    ];
    const initValue = {
        time: "",
    };
    const initValues = {
        joinDate: "",
        requestTime: "",
        sx: "",
        avatar: "",
    };
    const context = useContext(ScreenSize);
    const [isFocus, setIsFocus] = useState(false);
    const [showModalRefuse, setShowModalRefuse] = useState(false);
    const [showModalAccept, setShowModalAccept] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [searchValue, setSearchValue] = useState(initValue);
    const [searchValues, setSearchValues] = useState(initValues);
    const changeValue = (name, value) => {
        setSearchValue({ time: value });
    };
    const changeValues = (name, value) => {
        setSearchValues({ ...searchValues, [name]: value });
    };
    useEffect(() => {
        for (const key in searchValues) {
            if (searchValues[key]) {
                setShowButton(true);
                break;
            }
        }
    }, [searchValues]);

    return (
        <>
            {showModalAccept && (
                <Confirm
                    title={"Phê duyệt tất cả yêu cầu làm thành viên?"}
                    text={
                        "Bạn sắp thêm 8 người vào Ninja School Online sv Katana ( dailynso.com)"
                    }
                    closeModal={() => setShowModalAccept(false)}
                    confirm={() => setShowModalAccept(false)}
                />
            )}
            {showModalRefuse && (
                <Confirm
                    title={"Từ chối tất cả yêu cầu làm thành viên?"}
                    text={"Bạn sắp từ chối 8 yêu cầu làm thành viên"}
                    closeModal={() => setShowModalRefuse(false)}
                    confirm={() => setShowModalRefuse(false)}
                />
            )}
            <div className="w-full h-[190px] pt-6 px-4 pb-4 bg-white">
                <div className="flex flex-col w-full lg:w-[888px] mx-auto">
                    <div className="flex flex-col justify-between w-full mb-4 md:flex-row lg:flex-row ">
                        <div className="flex">
                            <h2 className="flex items-center text-[24px] font-bold">
                                Yêu cầu làm thành viên
                                <span className="block w-1 h-1 mx-2 bg-slate-500 rounded-full"></span>
                                <span className="text-gray-500">8</span>
                            </h2>
                        </div>
                        <div className="flex gap-3 mt-3 md:mt-0">
                            <Button
                                _className={
                                    "flex items-center h-9 px-3 lg:px-10 bg-blue-500 rounded-md hover:bg-blue-600"
                                }
                                onClick={() => setShowModalAccept(true)}
                            >
                                <span className="text-[15px] text-white font-semibold ">
                                    Phê duyệt tất cả
                                </span>
                            </Button>
                            <Button
                                _className={
                                    "flex items-center h-9 px-3 lg:px-10 bg-gray-200 rounded-md hover:bg-gray-300"
                                }
                                onClick={() => setShowModalRefuse(true)}
                            >
                                <span className="text-[15px] font-semibold">
                                    Từ chối tất cả
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div className="flex w-full pb-2">
                        <div className="flex-1 py-[6px]  ">
                            <div className="flex-1 flex w-full h-full px-3 bg-gray-200 rounded-full  ">
                                <Button
                                    _className={`h-full transition-all overflow-hidden  ${
                                        isFocus ? "w-0" : "w-[15px]"
                                    }`}
                                >
                                    <label
                                        htmlFor="searchText"
                                        className="flex items-center h-full w-full cursor-pointer"
                                    >
                                        <BsSearch />
                                    </label>
                                </Button>
                                <input
                                    className="flex-1 h-full px-[6px] py-2 bg-transparent outline-none"
                                    type="text"
                                    name=""
                                    id="searchText"
                                    placeholder="Tìm kiếm theo tên"
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                />
                            </div>
                        </div>
                        {context.width >= 414 && (
                            <div className="py-[6px] ml-3">
                                <ButtonItem
                                    itemList={buttonItem}
                                    layoutRight={true}
                                    searchValues={searchValue}
                                    changeValue={changeValue}
                                />
                            </div>
                        )}
                    </div>
                    {context.width >= 1024 && (
                        <div className="flex gap-2 w-full py-2 ">
                            <div className="w-max">
                                <Button
                                    _className={`flex items-center px-3 py-2 bg-gray-200 rounded-md   ${
                                        showButton
                                            ? "hover:bg-gray-300"
                                            : "opacity-50 cursor-not-allowed"
                                    }`}
                                    onClick={() => {
                                        showButton &&
                                            setSearchValues(initValues);
                                        showButton && setShowButton(false);
                                    }}
                                >
                                    <span className=" font-medium">
                                        Xóa bộ lọc
                                    </span>
                                </Button>
                            </div>
                            {buttonList.length > 0 &&
                                buttonList.map((item, index) => (
                                    <ButtonItem
                                        key={index}
                                        itemList={item}
                                        searchValues={searchValues}
                                        changeValue={changeValues}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default LayouTop;
