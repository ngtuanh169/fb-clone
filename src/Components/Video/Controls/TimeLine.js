function TimeLine() {
    return (
        <div className="flex items-center w-full">
            <div className="flex text-white text-[13px]">
                <span className=" font-medium">1:12</span>
                <span className=" px-1">/</span>
                <span className=" ">3:55</span>
            </div>
            <div className="flex-1 h-1 ml-2 bg-gray-300">
                <div className=" relative w-[60%] h-full bg-blue-500">
                    <div className=" absolute right-[-6px] top-[-4px] h-3 w-3 rounded-full bg-white"></div>
                </div>
            </div>
        </div>
    );
}

export default TimeLine;
