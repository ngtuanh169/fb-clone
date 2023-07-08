import Item from "../Item";
import { BsQuestionCircleFill } from "react-icons/bs";
import { AiFillWarning } from "react-icons/ai";
function HelpAndSupport({ onClick = () => {} }) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center w-full p-2 rounded-md">
                <span
                    className="flex justify-center items-center w-8 h-8 cursor-pointer rounded-full hover:bg-gray-300"
                    onClick={onClick}
                >
                    <i className=" bg-urlIcons bg-szIcons w-5 h-5 bg-leftIcon bg-no-repeat inline-block"></i>
                </span>
                <span className="ml-4 text-[20px] font-bold ">
                    Trợ giúp & hỗ trợ
                </span>
            </div>
            <Item text="Trung tâm trợ giúp">
                <BsQuestionCircleFill />
            </Item>
            <Item text="Hộp thư hỗ trợ">
                <i className=" bg-urlIcons3 bg-szIcons3 w-5 h-5 bg-letters bg-no-repeat inline-block"></i>
            </Item>
            <Item text="Báo cáo sự cố">
                <AiFillWarning />
            </Item>
        </div>
    );
}

export default HelpAndSupport;
