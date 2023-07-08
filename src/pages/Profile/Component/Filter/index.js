import { useState } from "react";
import MainCard from "../../../../Components/MainCard";
import Button from "../../../../Components/Button";
import FilterPosts from "../../../../Components/Modal/FilterPosts";
import { HiFilter } from "react-icons/hi";
function Filter() {
    const [openModal, setOpenModal] = useState(false);
    return (
        <MainCard>
            <div className="flex items-center justify-between p-3">
                <span className="text-[18px] lg:text-[20px] font-bold">
                    Bài viết
                </span>
                <Button
                    _className={
                        "flex items-center py-1 px-3 rounded-md bg-gray-200 hover:bg-gray-300"
                    }
                    onClick={() => setOpenModal(true)}
                >
                    <HiFilter />
                    <span className="ml-1 font-semibold">Bộ lọc</span>
                </Button>
            </div>
            {openModal && (
                <FilterPosts closeModal={() => setOpenModal(false)} />
            )}
        </MainCard>
    );
}

export default Filter;
