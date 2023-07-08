import Item from "../Item";
import { HiLockClosed } from "react-icons/hi";
import { MdOutlineFormatListBulleted } from "react-icons/md";
function SettingsAndPrivacy({ onClick = () => {} }) {
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
                    Cài đặt và quyền riêng tư
                </span>
            </div>
            <Item text="Cài đặt">
                <i className=" bg-urlIcons bg-szIcons w-5 h-5 bg-settingIcon bg-no-repeat inline-block"></i>
            </Item>
            <Item text="Kiểm tra quyền riêng tư">
                <i className=" bg-urlIcons2 bg-szIcons2 w-5 h-5 bg-lockAndHeartIcon bg-no-repeat inline-block"></i>
            </Item>
            <Item text="Trung tâm quyền riêng tư">
                <HiLockClosed />
            </Item>
            <Item text="Nhập ký hoạt động">
                <MdOutlineFormatListBulleted />
            </Item>
            <Item text="Tùy chọn bảng feed">
                <i className=" bg-urlIcons3 bg-szIcons3 w-5 h-5 bg-feedTable bg-no-repeat inline-block"></i>
            </Item>
            <Item text="Ngôn ngữ">
                <i className=" bg-urlIcons3 bg-szIcons3 w-5 h-5 bg-language bg-no-repeat inline-block"></i>
            </Item>
        </div>
    );
}

export default SettingsAndPrivacy;
