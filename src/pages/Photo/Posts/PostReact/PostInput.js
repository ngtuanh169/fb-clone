import { useEffect, useRef } from "react";
function PostInput({ avatar, isFocus = false, setIsFocus }) {
    const inputRef = useRef();
    useEffect(() => {
        isFocus && inputRef.current && inputRef.current.focus();
    }, [isFocus]);
    return (
        <div className="w-full flex">
            <img
                className="w-[32px] h-[32px] rounded-full mr-2 "
                src={avatar}
                alt=""
            />
            <input
                ref={inputRef}
                className=" flex-1 rounded-full py-[3px] px-4 bg-gray-200 outline-none"
                type="text"
                placeholder="Viết câu trả lời..."
                onBlur={() => setIsFocus && setIsFocus(false)}
            />
        </div>
    );
}

export default PostInput;
