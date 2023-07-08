import { useState, useEffect, useRef } from "react";
import { useClickOutSide } from "../../../../Hooks/useClickOutSide";
import MainCard from "../../../../Components/MainCard";
import Button from "../../../../Components/Button";
import { AiOutlineCheck } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
function FormAdress({ closeForm = () => {} }) {
    const modalRef = useRef();
    const [openModal, setOpenModal] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [cityName, setCityName] = useState("");
    useClickOutSide(modalRef, () => setOpenModal(false));
    useEffect(() => {
        const getCityList = async () => {
            const res = await fetch("https://provinces.open-api.vn/api/p/");
            const data = await res.json();
            setCityList(data);
        };
        getCityList();
    }, []);
    return (
        <div className="flex flex-col w-full ">
            <div
                className={`flex flex-col w-full transition-all ease-linear border-[2px] p-[2px] rounded-md `}
            >
                <div
                    className={`relative flex justify-between items-center w-full border rounded-md 
                        transition-all ease-linear p-2 cursor-pointer hover:border-gray-700`}
                    onClick={() => setOpenModal(!openModal)}
                >
                    <span>
                        {cityName ? cityName : "---chọn tỉnh/thành phố---"}
                    </span>
                    <BsFillCaretDownFill />
                    {openModal && (
                        <div
                            ref={modalRef}
                            className=" absolute top-[100%] left-0 w-full h-44 z-30"
                        >
                            <MainCard>
                                <div className="w-full h-[250px] scrollbar-thin scrollbar-thumb-slate-600 scrollbar-thumb-rounded-full">
                                    <div
                                        className="w-full p-1 rounded-md hover:bg-hover"
                                        onClick={() => {
                                            setCityName("");
                                            setOpenModal(false);
                                        }}
                                    >
                                        <span>---chọn tỉnh/thành phố---</span>
                                    </div>
                                    {cityList.length > 0 &&
                                        cityList.map((item) => (
                                            <div
                                                key={item.code}
                                                className={`flex justify-between items-center w-full p-2 mb-1 ${
                                                    cityName === item.name
                                                        ? "bg-hover"
                                                        : ""
                                                } rounded-md hover:bg-hover`}
                                                onClick={() => {
                                                    setCityName(item.name);
                                                    setOpenModal(false);
                                                }}
                                            >
                                                <span>{item.name}</span>
                                                {cityName === item.name && (
                                                    <AiOutlineCheck className=" text-green-400" />
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </MainCard>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full border-b my-3"></div>
            <div className="flex justify-end mt-3">
                <Button
                    _className={
                        "px-3 py-1 rounded-md mr-3 font-medium bg-gray-200 hover:bg-gray-300"
                    }
                    onClick={closeForm}
                >
                    Hủy
                </Button>
                <Button
                    _className={
                        "px-3 py-1 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600"
                    }
                    onClick={closeForm}
                >
                    Lưu
                </Button>
            </div>
        </div>
    );
}

export default FormAdress;
