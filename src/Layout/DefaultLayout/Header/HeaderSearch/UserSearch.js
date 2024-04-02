import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import userApi from "../../../../api/userApi";
import searchHistoryApi from "../../../../api/searchHistoryApi";
import Button from "../../../../Components/Button";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import { formatAvatar } from "../../../../Hooks/useFormat";
import { TbSearch } from "react-icons/tb";
function UserSearch({ text = "", closeModal = () => {} }) {
    const user = useSelector((state) => state.user);
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const timeId = setTimeout(async () => {
            try {
                setIsLoading(true);
                const res = await userApi.searchUser({ text, limit: 6 });
                console.log(res);
                if (res.success && res.data) {
                    setDataList(res.data);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }, 1000);
        return () => clearTimeout(timeId);
    }, [text]);

    const addSearchHistory = async (text = "", userId1 = "") => {
        try {
            const params = new FormData();
            params.append("userId", user.userId);
            params.append("content", text);
            params.append("userId1", userId1);
            const res = await searchHistoryApi.add(params);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full flex flex-col pt-1 pb-2 px-2">
            <div className="flex flex-col w-full">
                {isLoading
                    ? Array(3)
                          .fill(0)
                          .map((item, index) => (
                              <div
                                  key={index}
                                  className="w-full flex items-center p-2 rounded-md "
                              >
                                  <div
                                      key={index}
                                      className="w-[40px] h-[40px] rounded-full mr-2 overflow-hidden"
                                  >
                                      <SkeletonLoading />
                                  </div>
                                  <div className=" flex-1 h-10 rounded-md overflow-hidden">
                                      <SkeletonLoading />
                                  </div>
                              </div>
                          ))
                    : dataList.length > 0 &&
                      dataList.map((item) => (
                          <Link key={item.id} to={`/profile/${item.id}`}>
                              <div
                                  className="w-full flex items-center p-2 rounded-md hover:bg-hover"
                                  onClick={() => {
                                      addSearchHistory(text, item.id);
                                      closeModal();
                                  }}
                              >
                                  <img
                                      className="w-[40px] h-[40px] rounded-full mr-2"
                                      src={formatAvatar(item.avatar, item.sx)}
                                      alt=""
                                  />
                                  <div className="flex flex-col">
                                      <span className=" font-medium">
                                          {item.name}
                                      </span>
                                      {item.checkFriend && (
                                          <span className=" text-[13px] text-gray-500">
                                              Bạn bè
                                          </span>
                                      )}
                                  </div>
                              </div>
                          </Link>
                      ))}
                <Link to={`/search/people/${text}`}>
                    <div
                        className="w-full flex items-center p-2 rounded-md hover:bg-hover"
                        onClick={() => {
                            addSearchHistory(text);
                            closeModal();
                        }}
                    >
                        <div className=" ">
                            <Button
                                _className={
                                    "flex items-center justify-center w-[40px] h-[40px] rounded-full mr-2 bg-blue-500 rounded-full"
                                }
                            >
                                <TbSearch className="text-white text-[16px]" />
                            </Button>
                        </div>
                        <div className="flex text-blue-500">
                            <span className=" flex line-clamp-1">
                                <span className=" ">Tìm kiếm</span>
                                <span className=" ml-1 font-medium">
                                    {text}
                                </span>
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default UserSearch;
