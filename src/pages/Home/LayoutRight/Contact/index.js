import { Link } from "react-router-dom";
function Contact({ avatar, name }) {
    return (
        <div className="w-full flex p-2 mb-2 rounded-lg hover:bg-hover">
            <Link to={"/"} className={"flex"}>
                <div className=" relative w-max">
                    <img
                        className="h-[36px] w-[36px] rounded-full border border-gray-500"
                        src={avatar}
                        alt=""
                    />
                    <span className=" absolute bottom-[-1px] right-0 block w-[11px] h-[11px] rounded-full bg-green-500 border-[2px] border-white"></span>
                </div>
                <span className=" block flex-1 h-full ml-3 font-semibold items-center line-clamp-2 text-ellipsis ">
                    {name}
                </span>
            </Link>
        </div>
    );
}

export default Contact;
