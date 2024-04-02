import { useContext } from "react";
import { GroupContext } from "../../GroupProvider";
import NavItem from "./NavItem";
function NavList() {
    const { groupData, loading } = useContext(GroupContext);
    let navList = [];
    console.log(groupData);
    if (groupData.checkJoined || groupData.status == 0) {
        navList = [
            { id: 1, name: "Thảo luận", link: `/group/${groupData.id}` },
            {
                id: 2,
                name: "Đáng chú ý",
                link: `/group/${groupData.id}/remarkable`,
            },
            { id: 3, name: "Reels", link: `/group/${groupData.id}/reels` },
            {
                id: 4,
                name: "Mọi người",
                link: `/group/${groupData.id}/members`,
            },
            { id: 5, name: "Files", link: `/group/${groupData.id}/files` },
        ];
    } else {
        navList = [
            {
                id: 1,
                name: "Giới thiệu",
                link: `/group/${groupData.id}/introduce`,
            },
            { id: 2, name: "Thảo luận", link: `/group/${groupData.id}` },
        ];
    }

    return (
        <div className="flex w-max sm:w-full h-full pt-1">
            {navList.length > 0 &&
                navList.map((item) => <NavItem key={item.id} data={item} />)}
        </div>
    );
}

export default NavList;
