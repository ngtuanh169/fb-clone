import ToolItem from "./ToolItem";
function GroupTool({ currentNav, setCurrentNav, navList }) {
    return (
        <div className="flex my-2">
            {navList.length > 0 &&
                navList.map((item) => (
                    <ToolItem
                        key={item.id}
                        data={item}
                        currentNav={currentNav}
                        setCurrentNav={setCurrentNav}
                    />
                ))}
        </div>
    );
}

export default GroupTool;
