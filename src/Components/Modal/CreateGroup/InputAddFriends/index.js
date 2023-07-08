import { useState, useContext, useRef } from "react";
import { useClickOutSide } from "../../../../Hooks/useClickOutSide";
import { FriendsContext } from "../FriendsProvider";
import Button from "../../../Button";
import ModalAddFriends from "../ModalAddFriends";
import { MdClose } from "react-icons/md";
function InputAddFriends() {
    const context = useContext(FriendsContext);
    const ModalAddFriendsRef = useRef();
    const [searchText, setSearchText] = useState("");
    const [modalFriend, setModalFriend] = useState(false);
    useClickOutSide(ModalAddFriendsRef, () => setModalFriend(false));
    return (
        <div
            ref={ModalAddFriendsRef}
            className=" relative flex flex-col w-full  mt-2 border rounded-md "
        >
            <div
                className="flex flex-wrap pl-1 pt-1 max-h-[100px] 
                scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full"
            >
                {context.addedFriends.length > 0 &&
                    context.addedFriends.map((item) => (
                        <div
                            key={item.id}
                            className="flex p-1 mr-1 mb-1 rounded-md bg-blue-100"
                        >
                            <img
                                className="w-6 h-6 rounded-full border"
                                src={item.avt}
                                alt=""
                            />
                            <span className="px-1 text-blue-500 font-medium">
                                {item.name}
                            </span>
                            <Button
                                _className={
                                    "w-6 h-6 rounded-full hover:bg-gray-300"
                                }
                                onClick={() =>
                                    context.handleDeleteFriend(item.id)
                                }
                            >
                                <MdClose className="text-blue-500 mx-auto" />
                            </Button>
                        </div>
                    ))}
            </div>
            <input
                className="w-full p-2 outline-none rounded-md "
                type="text"
                placeholder="Nhập tên bạn bè"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setModalFriend(true)}
            />
            {modalFriend && (
                <div className=" absolute bottom-[105%] left-0 w-[300px]">
                    <ModalAddFriends
                        text={searchText}
                        closeModal={() => setModalFriend(false)}
                    />
                </div>
            )}
        </div>
    );
}

export default InputAddFriends;
