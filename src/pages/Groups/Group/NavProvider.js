import { useState, createContext } from "react";
import Discuss from "./LayoutRight/Discuss";
import Remarkable from "./LayoutRight/Remarkable";
import Members from "./LayoutRight/Members";
import Reels from "./LayoutRight/Reels";
import Files from "./LayoutRight/Files";
const NavContext = createContext();

function NavProvider({ children }) {
    const navList = [
        { id: 1, name: "Thảo luận", Comp: Discuss },
        { id: 2, name: "Đáng chú ý", Comp: Remarkable },
        { id: 3, name: "Reels", Comp: Reels },
        { id: 4, name: "Mọi người", Comp: Members },
        { id: 5, name: "Files", Comp: Files },
    ];
    const [currentNav, setCurrentNav] = useState(navList[0]);
    const valueContext = { navList, currentNav, setCurrentNav };

    return (
        <NavContext.Provider value={valueContext}>
            {children}
        </NavContext.Provider>
    );
}

export { NavContext, NavProvider };
