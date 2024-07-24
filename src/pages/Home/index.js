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
                    <div className="fixed top-0 group h-screen pt-[74px] lg:w-[300px] 2xl:w-[350px] z-20 ">
                        <div
                            className="h-full scrollbar-thin scrollbar-thumb-transparent scrollbar-thumb-rounded-full
                                 group-hover:scrollbar-thumb-slate-300"
                        >
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
                    <div className="fixed top-0 right-0 group h-screen lg:w-[300px] 2xl:w-[350px] pt-[74px] boder z-20 ">
                        <div
                            className="h-full scrollbar-thin scrollbar-thumb-transparent scrollbar-thumb-rounded-full
                                 group-hover:scrollbar-thumb-slate-300"
                        >
                            <LayoutRight />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
