import FriendRequest from "./FriendRequest";
import {AiOutlineSearch} from 'react-icons/ai'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import Button from "../../../Components/Button";
import avatar from "../../../assets/images/avatar/avatar.jpg";
import Contact from "./Contact";
function LayoutRight() {
	return (
		<div className="w-full h-full pt-[50px] px-2 scrollbar-thin scrollbar-thumb-gray-300">
            <div className="w-full border-b border-gray-300">
                <div className="flex justify-between items-center mb-1">
                    <span className=" text-[17px] text-gray-500 font-medium">Lời mời kết bạn</span>
                    <Button  _className={' p-[6px] rounded hover:bg-gray-200'}>
                        <span className="text-blue-500">Xem tất cả</span>
                    </Button>
                </div>
                <FriendRequest avatar={avatar} time={1672236905422} />
                <FriendRequest avatar={avatar} time={1672236905422} />
            </div>
            <div className="w-full pt-3 ">
                <div className="flex justify-between items-center mb-1">
                    <span className=" text-[17px] text-gray-500 font-medium">Người liên hệ</span>
                    <div className="flex">
                        <Button  _className={' h-[32px] w-[32px] flex justify-center items-center mr-3 rounded-full hover:bg-gray-200'}>
                            <AiOutlineSearch/>
                        </Button>
                        <Button  _className={' h-[32px] w-[32px] flex justify-center items-center rounded-full hover:bg-gray-200'}>
                            <BiDotsHorizontalRounded/>
                        </Button>
                    </div>
                </div>
                <Contact avatar={avatar} name={'Nguyễn Tú Anh'}/>
                <Contact avatar={avatar} name={'Nguyễn Tú Anh'}/>
                <Contact avatar={avatar} name={'Nguyễn Tú Anh'}/>
                <Contact avatar={avatar} name={'Nguyễn Tú Anh'}/>
                <Contact avatar={avatar} name={'Nguyễn Tú Anh'}/>
                <Contact avatar={avatar} name={'Nguyễn Tú Anh'}/>
                <Contact avatar={avatar} name={'Nguyễn Tú Anh'}/>
                <Contact avatar={avatar} name={'Nguyễn Tú Anh'}/>
            </div>
        </div>
	);
}

export default LayoutRight;
