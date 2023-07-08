import { useState } from "react";
import NavItem from "./NavItem";
function VideosNav() {
    const [currentNav, setCurrentNav] = useState(1);
    const navList = [{ id: 1, name: "video của bạn" }];
    return (
        <div className="">
            <div className="px-2">
                <span className="text-[20px] font-bold">Video</span>
            </div>
            <div className="flex p-2">
                {navList.length > 0 &&
                    navList.map((item) => (
                        <NavItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            currentNav={currentNav}
                            setCurrentNav={setCurrentNav}
                        />
                    ))}
            </div>
        </div>
    );
}

export default VideosNav;
