import { useState, useEffect, useRef, createContext } from "react";
import MessItemTool from "./MessItemTool";
import InfoUser from "./InfoUser";
import TextMess from "./TextMess";
import SendMess from "./SendMess";
export const ContextValue = createContext();
function OpenMessItem({ id, avt, name, active = false }) {
    const divRef = useRef();
    const divScrollRef = useRef();
    const scrollRef = useRef();
    const [isFocus, setIsFocus] = useState(false);
    const [scrollValue, setScrollValue] = useState(0);
    useEffect(() => {
        scrollRef.current &&
            divScrollRef.current &&
            divScrollRef.current.scrollTo(0, scrollRef.current.offsetHeight);
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            setScrollValue(divScrollRef.current.scrollTop);
        };
        divScrollRef.current.addEventListener("scroll", handleScroll);
    }, []);
    return (
        <div
            ref={divRef}
            style={{ boxShadow: "0 1px 3px 2px #ccc" }}
            className="flex flex-col w-[330px] h-[450px]  ml-3 bg-white  rounded-t-lg  "
            onClick={() => setIsFocus(true)}
        >
            <MessItemTool id={id} avt={avt} name={name} active={isFocus} />
            <div
                ref={divScrollRef}
                className="w-full flex-1 overflow-y-scroll overflow-x-hidden"
            >
                <div ref={scrollRef} className="w-full h-max">
                    <ContextValue.Provider value={scrollValue}>
                        <InfoUser />
                        <TextMess id={id} />
                    </ContextValue.Provider>
                </div>
            </div>
            <SendMess onFocus={setIsFocus} active={isFocus} />
        </div>
    );
}

export default OpenMessItem;
