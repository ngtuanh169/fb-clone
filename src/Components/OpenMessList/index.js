import { useContext } from "react";
import { useSelector } from "react-redux";
import { ScreenSize } from "../../App";
import OpenMessItem from "./OpenMessItem";
function OpenMessList() {
    const context = useContext(ScreenSize);
    const listMess = useSelector((state) => state.openMessList);
    return (
        <div
            className={` fixed flex bottom-0 ${
                context.width < 450 ? "right-[10px]" : "right-[100px]"
            } z-[55]`}
        >
            {listMess.length > 0 &&
                listMess.map((item, index) => {
                    if (index < 1) {
                        return (
                            <OpenMessItem
                                key={index}
                                id={item.id}
                                data={item}
                                active={index < 3}
                            />
                        );
                    }
                })}
        </div>
    );
}

export default OpenMessList;
