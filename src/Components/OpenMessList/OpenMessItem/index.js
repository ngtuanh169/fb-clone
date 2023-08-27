import { useState, useEffect, useRef, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import conversationsApi from "../../../api/conversationsApi";
import userApi from "../../../api/userApi";
import { updateMess } from "../../../redux/actions/openMessList";
import MessItemTool from "./MessItemTool";
import InfoUser from "./InfoUser";
import TextMess from "./TextMess";
import SendMess from "./SendMess";
export const ContextValue = createContext();
function OpenMessItem({ id, data = {}, active = false }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const divRef = useRef();
    const divScrollRef = useRef();
    const scrollRef = useRef();
    const [isFocus, setIsFocus] = useState(false);
    const [scrollValue, setScrollValue] = useState(0);
    const [textMessList, setTextMessList] = useState([]);
    useEffect(() => {
        const handleScroll = () => {
            setScrollValue(divScrollRef.current.scrollTop);
        };
        divScrollRef.current &&
            divScrollRef.current.addEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
        const addConversations = async () => {
            try {
                const params = new FormData();
                params.append("userId", user.userId);
                params.append("othersId", data.othersId);
                const res = await conversationsApi.add(params);
                if (res[0].status === "success") {
                    dispatch(
                        updateMess({
                            id,
                            conversationsId: res[0].conversationsId,
                            // watched: res[0].watched,
                        })
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };
        !data.conversationsId && addConversations();
    }, [data.conversationsId]);
    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await userApi.getInfo({ userId: data.othersId });
                if (res[0].status === "success") {
                    dispatch(
                        updateMess({
                            id,
                            othersName: `${res[0].fName} ${res[0].lName}`,
                            othersAvt: res[0].avatar,
                            othersSx: res[0].sx,
                        })
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };
        !data.othersName && getInfo();
    }, [data.othersId]);
    return (
        <div
            ref={divRef}
            style={{ boxShadow: "0 1px 3px 2px #ccc" }}
            className="flex flex-col w-[330px] h-[450px]  ml-3 bg-white  rounded-t-lg  "
        >
            <MessItemTool data={data} active={isFocus} />
            <div
                ref={divScrollRef}
                className="flex-1 flex flex-col-reverse  w-full overflow-y-scroll overflow-x-hidden"
            >
                <div ref={scrollRef} className="flex flex-col w-full">
                    <ContextValue.Provider value={scrollValue}>
                        <div className="w-full">
                            <InfoUser data={data} />
                        </div>
                        <div className="w-full ">
                            {data.othersName && (
                                <TextMess
                                    data={data}
                                    textMessList={textMessList}
                                    setTextMessList={setTextMessList}
                                    isFocus={isFocus}
                                />
                            )}
                        </div>
                    </ContextValue.Provider>
                </div>
            </div>
            <SendMess
                onFocus={setIsFocus}
                active={isFocus}
                data={data}
                textMessList={textMessList}
                setTextMessList={setTextMessList}
            />
        </div>
    );
}

export default OpenMessItem;
