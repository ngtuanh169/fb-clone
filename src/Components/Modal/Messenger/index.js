import { useState } from "react";
import { Link } from "react-router-dom";
import MessTool from "./MessTool";
import MessList from "./MessList";
import MessWaiting from "./MessWaiting";
function Messenger({ closeModal = () => {} }) {
    const [showMessWaiting, setShowMessWaiting] = useState(false);
    return (
        <div
            className="flex flex-col w-[350px] bg-white  rounded-md shadow-lg cursor-default overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className={`flex w-max transition-transform delay-75 translate-x-[${
                    showMessWaiting ? "-350px" : "0"
                }]`}
            >
                <div className="w-[350px] h-full ">
                    <MessTool />
                    <MessList
                        closeModal={closeModal}
                        showMessWaiting={() => setShowMessWaiting(true)}
                    />
                </div>

                {showMessWaiting && (
                    <div className="w-[350px] h-full">
                        <MessWaiting
                            closeModal={closeModal}
                            showMessWaiting={() => setShowMessWaiting(false)}
                        />
                    </div>
                )}
            </div>
            <div className=" border-t px-4 py-2 text-center">
                <Link to={"/"}>
                    <span className="text-[14px] text-blue-500 font-medium hover:underline">
                        Xem tất cả trong Messenger
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default Messenger;
