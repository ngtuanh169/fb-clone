import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
function HeaderSearch() {
    return (
        <div className=" h-full w-3/12 flex items-center">
            <div className=" h-max mr-2">
                <Link to={"/"}>
                    <BsFacebook className=" h-10 w-10 text-blue-700" />
                </Link>
            </div>
            <div className=" flex items-center h-10  boder bg-gray-100 rounded-full p-2">
                <AiOutlineSearch className=" text-gray-400 mr-1" />
                <input
                    className=" bg-transparent outline-none"
                    type="text"
                    placeholder="Tìm kiếm trên Facebook"
                />
            </div>
        </div>
    );
}

export default HeaderSearch;
