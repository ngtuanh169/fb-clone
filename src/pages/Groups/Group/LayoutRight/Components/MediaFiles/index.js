import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import MainCard from "../../../../../../Components/MainCard";
import Button from "../../../../../../Components/Button";
import { NavContext } from "../../../NavProvider";
import Files from "../../Files";
import image from "../../../../../../assets/images/avatar/avatar.jpg";
function MediaFiles() {
    const context = useContext(NavContext);
    const divRef = useRef();
    const [clientWidth, setClientWidth] = useState(0);
    useEffect(() => {
        divRef.current && setClientWidth(divRef.current.clientWidth);
    }, []);
    return (
        <div className="w-full">
            <MainCard>
                <div className=" font-medium px-4 pt-4 pb-2">
                    <span>File phương tiện mới chia sẻ</span>
                </div>
                <div className="px-4 py-2">
                    <div className="w-full grid grid-cols-2 gap-1 rounded-md overflow-hidden">
                        {Array(4)
                            .fill(0)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    ref={divRef}
                                    style={{ height: `${clientWidth}px` }}
                                    className="w-full hover:opacity-90"
                                >
                                    <Link to={"/photo/1"}>
                                        <img
                                            className="w-full h-full object-cover "
                                            src={image}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="w-full px-4 pb-4 pt-2">
                    <Button
                        _className={
                            "w-full p-2 text-center bg-gray-200 rounded-md hover:bg-gray-300"
                        }
                        onClick={() =>
                            context.setCurrentNav({
                                id: 5,
                                name: "files",
                                Comp: Files,
                            })
                        }
                    >
                        <span className=" font-medium">Xem tất cả</span>
                    </Button>
                </div>
            </MainCard>
        </div>
    );
}

export default MediaFiles;
