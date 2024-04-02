import { useState, useRef, useEffect, useContext } from "react";
import { ScreenSize } from "../../../App";
import Modal from "..";
import { PostsProvider } from "./PostsProvider";
import Posts from "./Posts";
function SendPosts({
    closeModal = () => {},
    addImg,
    postsList = [],
    setPostsList = () => {},
}) {
    const context = useContext(ScreenSize);
    const divRef = useRef();
    const [clientWidth, setClientWidth] = useState(0);
    const [currentComp, setCurrentComp] = useState(undefined);
    useEffect(() => {
        divRef.current && setClientWidth(divRef.current.clientWidth);
    }, [currentComp, context.width]);

    return (
        <PostsProvider>
            <Modal closeModal={closeModal}>
                <div
                    style={{
                        width: clientWidth ? `${clientWidth}px` : "",
                    }}
                    className="flex w-[370px] sm:w-[500px] bg-white mx-auto my-auto rounded-lg shadow-lg overflow-hidden
                        transition-all ease-linear duration-150"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex w-max">
                        <div
                            className={`${
                                !currentComp
                                    ? "w-[370px] sm:w-[500px]"
                                    : "w-0 h-0"
                            } overflow-hidden transition-all duration-150`}
                        >
                            <Posts
                                closeModal={closeModal}
                                addImg={addImg}
                                setCurrentComp={setCurrentComp}
                                postsList={postsList}
                                setPostsList={setPostsList}
                            />
                        </div>
                        <div
                            style={{
                                width:
                                    clientWidth && context.width >= 640
                                        ? `${clientWidth}px`
                                        : "",
                            }}
                            className="w-[370px] sm:w-[500px] overflow-hidden"
                        >
                            <div ref={divRef} className="w-full sm:w-max">
                                {currentComp && (
                                    <currentComp.Comp
                                        setCurrentComp={setCurrentComp}
                                        setClientWidth={setClientWidth}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </PostsProvider>
    );
}

export default SendPosts;
