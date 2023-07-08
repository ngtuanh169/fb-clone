import { useState, useEffect, useRef } from "react";
import Button from "../../Button";
import { BiSearchAlt2 } from "react-icons/bi";
function SearchSubLayout({ nameInput = "" }) {
    const inputRef = useRef();
    const [isFocus, setIsFocus] = useState(false);
    useEffect(() => {
        isFocus && inputRef.current && inputRef.current.focus();
    }, [isFocus]);
    return (
        <div className="w-full px-2 ">
            <div className="flex items-center bg-gray-100 rounded-full py-1 px-2">
                <Button
                    _className={"p-1 ml-1"}
                    onClick={() => setIsFocus(true)}
                >
                    <BiSearchAlt2 />
                </Button>
                <input
                    ref={inputRef}
                    className="flex-1 w-full py-1 bg-transparent outline-none"
                    type="text"
                    placeholder={nameInput}
                    onBlur={() => setIsFocus(false)}
                />
            </div>
        </div>
    );
}

export default SearchSubLayout;
