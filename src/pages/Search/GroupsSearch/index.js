import Search from "..";
import Item from "./Item";
import img from "../../../assets/images/avatar/avatar.jpg";
function GroupsSearch() {
    const groupList = [
        {
            id: 1,
            name: "Ninja School Online Sv5 Katana",
            img,
            status: "1",
            member: 13574,
            joined: true,
            timeJoin: 1685706684890,
        },
        {
            id: 2,
            name: "Ninja School Online Sv5 Katana",
            img,
            status: "0",
            member: 545345,
            joined: true,
            timeJoin: 1685706684890,
        },
        {
            id: 3,
            name: "Ninja School Online Sv5 Katana",
            img,
            status: "1",
            member: 534,
            joined: false,
            timeJoin: 1685706684890,
        },
        {
            id: 4,
            name: "Ninja School Online Sv5 Katana",
            img,
            status: "0",
            member: 25235,
            joined: false,
            timeJoin: 1685706684890,
        },
        {
            id: 5,
            name: "Ninja School Online Sv5 Katana",
            img,
            status: "1",
            member: 7754,
            joined: true,
            timeJoin: 1685706684890,
        },
        {
            id: 6,
            name: "Ninja School Online Sv5 Katana",
            img,
            status: "0",
            member: 13574,
            joined: true,
            timeJoin: 1685706684890,
        },
    ];
    return (
        <Search>
            <div className="flex flex-col items-center w-full mt-8">
                {groupList.length > 0 &&
                    groupList.map((item) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            img={item.img}
                            status={item.status}
                            member={item.member}
                            joined={item.joined}
                            timeJoin={item.timeJoin}
                        />
                    ))}
            </div>
        </Search>
    );
}

export default GroupsSearch;
