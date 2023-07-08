import ToolItem from "./ToolItem";
function GroupTool({ isTool, setIsTool, toolList }) {
    return (
        <div className="flex my-2">
            {toolList.length > 0 &&
                toolList.map((item) => (
                    <ToolItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        isActive={isTool}
                        setIsActive={setIsTool}
                    />
                ))}
        </div>
    );
}

export default GroupTool;
