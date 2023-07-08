import { useContext } from "react";
import { useSelector } from "react-redux";
import { ScreenSize } from "../../App";
import MessItem from "./MessItem";
function SmallMessList() {
    const context = useContext(ScreenSize);
    const messList = useSelector((state) => state.openMessList);
    return (
        <>
            {context.width >= 450 && (
                <div className=" fixed bottom-[80px] right-[25px] flex flex-col justify-end z-[55]">
                    {messList.length > 1 &&
                        messList.map((item, index) => {
                            if (index > 0 && index <= 4) {
                                return (
                                    <div
                                        key={item.id}
                                        className=" relative mt-3"
                                    >
                                        <MessItem
                                            id={item.id}
                                            avt={item.avt}
                                            name={item.name}
                                        />
                                        {index === 4 && messList.length > 5 && (
                                            <div className=" absolute top-0 left-0 group">
                                                <div className=" relative  h-full w-full">
                                                    <img
                                                        className="h-[50px] w-[50px] rounded-full"
                                                        src={messList[5].avt}
                                                        alt=""
                                                    />
                                                    <div
                                                        className=" absolute top-0 left-0 flex items-center justify-center
                                                 h-full w-full rounded-full bg-matteBlack2"
                                                    >
                                                        <span className=" font-medium text-white">{`+ ${
                                                            messList.length - 5
                                                        }`}</span>
                                                    </div>
                                                    <div
                                                        className=" absolute right-[100%] bottom-0 flex justify-center items-end 
                                                        invisible opacity-0 group-hover:visible group-hover:opacity-100"
                                                    >
                                                        <span className="flex flex-col min-w-[150px] w-max h-full p-3 rounded-lg drop-shadow-custom1 font-semibold bg-white ">
                                                            {messList.length >
                                                                6 &&
                                                                messList.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        if (
                                                                            index >=
                                                                            5
                                                                        ) {
                                                                            return (
                                                                                <span
                                                                                    key={
                                                                                        item.id
                                                                                    }
                                                                                >
                                                                                    {item.name +
                                                                                        item.id}
                                                                                </span>
                                                                            );
                                                                        }
                                                                    }
                                                                )}
                                                        </span>

                                                        <span className="w-0 h-0 mb-3 border-l-[15px] border-y-[10px] border-b-transparent border-t-transparent border-l-white drop-shadow-custom2 z-50"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return;
                        })}
                </div>
            )}
        </>
    );
}

export default SmallMessList;
