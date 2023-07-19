import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userApi from "../../../../api/userApi";
import Button from "../../../../Components/Button";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import { formatAvatar } from "../../../../Hooks/useFormat";
import { TbSearch } from "react-icons/tb";
function UserSearch({ text = "", closeModal = () => {} }) {
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const timeId = setTimeout(async () => {
            try {
                setIsLoading(true);
                const res = await userApi.searchUser({ text, limit: 6 });
                console.log(res);
                setDataList(res);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }, 1500);
        return () => clearTimeout(timeId);
    }, [text]);
    return (
        <div className="w-full flex flex-col pt-1 pb-2 px-2">
            <div className="flex flex-col w-full">
                {isLoading
                    ? Array(6)
                          .fill(0)
                          .map((item, index) => (
                              <div
                                  key={index}
                                  className="w-full flex items-center p-2 rounded-md hover:bg-hover"
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
                      dataList.map((item, index) => (
                          <Link key={index} to={`/profile/${item.userId}`}>
                              <div
                                  className="w-full flex items-center p-2 rounded-md hover:bg-hover"
                                  onClick={closeModal}
                              >
                                  <img
                                      key={index}
                                      className="w-[40px] h-[40px] rounded-full mr-2"
                                      src={formatAvatar(item.avatar, item.sx)}
                                      alt=""
                                  />
                                  <div className="flex flex-col">
                                      <span className=" font-medium">
                                          {`${item.fname} ${item.lname}`}
                                      </span>
                                      <span className=" text-[13px] text-gray-500">
                                          Bạn bè
                                      </span>
                                  </div>
                              </div>
                          </Link>
                      ))}
                <Link to={`/search/people/${text}`}>
                    <div
                        className="w-full flex items-center p-2 rounded-md hover:bg-hover"
                        onClick={closeModal}
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
