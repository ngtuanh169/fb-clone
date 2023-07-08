import { useState, useEffect, useRef } from "react";
import MainCard from "../../../../../../../Components/MainCard";
import Button from "../../../../../../../Components/Button";
import image from "../../../../../../../assets/images/banner/user_bn.png";
function Image() {
    const divRef = useRef();
    const [clientWidth, setClientWidth] = useState(0);
    useEffect(() => {
        divRef.current && setClientWidth(divRef.current.clientWidth);
    }, []);
    return (
        <div className="w-full">
            <MainCard>
                <div className=" px-4 pt-4 pb-2">
                    <span className="text-[18px] font-bold ">Ảnh gần đây</span>
                </div>
                <div className="px-4 py-2">
                    <div className="w-full grid grid-cols-3 gap-1 rounded-md overflow-hidden">
                        {Array(6)
                            .fill(0)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    ref={divRef}
                                    style={{ height: `${clientWidth}px` }}
                                    className="w-full cursor-pointer hover:opacity-90"
                                >
                                    <img
                                        className="w-full h-full object-cover "
                                        src={image}
                                        alt=""
                                    />
                                </div>
                            ))}
                    </div>
                </div>
                <div className="w-full px-4 pt-2 pb-4">
                    <Button
                        _className={
                            "w-full p-2 text-center bg-gray-200 rounded-md hover:bg-gray-300"
                        }
                    >
                        <span className=" font-medium">Xem tất cả</span>
                    </Button>
                </div>
            </MainCard>
        </div>
    );
}

export default Image;
