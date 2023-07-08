import { useState } from "react";
import NavItem from "./NavItem";
function PhotosNav() {
    const navList = [{ id: 1, name: `Ảnh của bạn` }];
    const [currentNav, setCurrentNav] = useState(1);
    return (
        <div className="">
            <div className="px-2">
                <span className="text-[20px] font-bold">Ảnh</span>
            </div>
            <div className="flex px-2">
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

export default PhotosNav;
