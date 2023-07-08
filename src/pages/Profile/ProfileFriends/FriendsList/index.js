import FirendItem from "./FirendItem";
function FriendsList({ data = [] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
            {data.length > 0 &&
                data.map((item) => (
                    <div key={item.id}>
                        <FirendItem
                            id={item.id}
                            avt={item.avt}
                            name={item.name}
                            des={item.des}
                        />
                    </div>
                ))}
        </div>
    );
}

export default FriendsList;
