import { useState, useEffect, useContext } from "react";
import { ScreenSize } from "../../../App";
import Modal from "../index";
import MainCard from "../../MainCard";
import Button from "../../Button";
import FilterDate from "./FilterDate";
import { MdClose } from "react-icons/md";
function FilterPosts({ closeModal = () => {} }) {
    const context = useContext(ScreenSize);
    const [filter, setFilter] = useState({ year: 0, month: 0, day: 0 });

    const currentYear = new Date().getFullYear();

    const yearList = Array(20)
        .fill(0)
        .map((item, index) => currentYear - index);

    const monthList = Array(12)
        .fill(0)
        .map((item, index) => index + 1);

    const dayList = Array(filter.month === 2 ? 28 : 30)
        .fill(0)
        .map((item, index) => index + 1);

    useEffect(() => {
        if (filter.month === 2 && filter.day > 28) {
            setFilter({ ...filter, day: 28 });
        }
    }, [filter.month]);
    return (
        <Modal closeModal={closeModal}>
            <div className="w-full max-w-[540px] px-2 m-auto">
                <MainCard>
                    <div className=" relative w-full text-center px-2 py-3 border-b">
                        <span className="text-[20px] font-bold">
                            Bộ lọc bài viết
                        </span>
                        <Button
                            _className={
                                "absolute top-[10px] right-[10px] flex justify-center items-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300"
                            }
                            onClick={closeModal}
                        >
                            <MdClose className=" text-[22px] text-gray-500" />
                        </Button>
                    </div>
                    <div className="flex items-center w-full p-3">
                        <span className="mr-3">Đi đến:</span>
                        <FilterDate
                            text={"Năm"}
                            listItem={yearList}
                            filter={filter}
                            setFilter={setFilter}
                            nameFilter={"year"}
                        />
                        <FilterDate
                            text={"Tháng"}
                            listItem={monthList}
                            filter={filter}
                            setFilter={setFilter}
                            nameFilter={"month"}
                            abRight={context.width >= 640 ? false : true}
                        />
                        <FilterDate
                            text={"Ngày"}
                            listItem={dayList}
                            filter={filter}
                            setFilter={setFilter}
                            nameFilter={"day"}
                            abRight={context.width >= 640 ? false : true}
                        />
                    </div>
                    <div className="flex justify-end p-3">
                        <Button
                            _className={
                                "py-2 px-3 mr-2 rounded-md bg-gray-200 hover:bg-gray-300"
                            }
                            onClick={closeModal}
                        >
                            <span className=" font-semibold">Đóng</span>
                        </Button>
                        <Button
                            _className={
                                "py-2 px-8 rounded-md bg-blue-500 hover:bg-blue-600"
                            }
                            onClick={closeModal}
                        >
                            <span className="text-white font-semibold">
                                Xong
                            </span>
                        </Button>
                    </div>
                </MainCard>
            </div>
        </Modal>
    );
}

export default FilterPosts;
