import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
function FileItem({ avt }) {
    const divRef = useRef();
    const [clientWidth, setClientWidth] = useState(0);
    useEffect(() => {
        divRef.current && setClientWidth(divRef.current.clientWidth);
    }, []);
    return (
        <div
            ref={divRef}
            style={{ height: `${clientWidth}px` }}
            className="w-full border"
        >
            <Link to={"/photo/1"} className="block w-full h-full">
                <img className="w-full h-full object-cover" src={avt} alt="" />
            </Link>
        </div>
    );
}

export default FileItem;
