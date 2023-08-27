import { useContext } from "react";
import { ScreenSize } from "../../App";
import LayoutLeft from "./LayoutLeft";
import LayoutContent from "./LayoutContent";
import LayoutRight from "./LayoutRight";
function Home() {
    const context = useContext(ScreenSize);
    return (
        <div className="flex justify-bettween w-full ">
            {context.width >= 1150 && (
                <div className="lg:w-[300px] 2xl:w-[350px]">
                    <div
                        className={`a h-screen lg:w-[300px] 2xl:w-[350px] pt-6 fixed top-0 z-20 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full`}
                    >
                        <div className="pt-[50px]">
                            <LayoutLeft />
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 w-full pt-6 flex justify-center">
                <LayoutContent />
            </div>
            {context.width >= 1024 && (
                <div className="lg:w-[300px] 2xl:w-[350px]">
                    <div className="a lg:w-[300px] 2xl:w-[350px] h-screen pt-6 fixed boder top-0 right-0 z-20 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full">
                        <div className="pt-[50px]">
                            <LayoutRight />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
