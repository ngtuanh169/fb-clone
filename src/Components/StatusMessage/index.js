import { useDispatch, useSelector } from "react-redux";
import { addStatusMess } from "../../redux/actions/statusMessage";
import Item from "./Item";
function StatusMessage() {
    const dispatch = useDispatch();
    const statusMessage = useSelector((state) => state.statusMessage);
    return (
        <div className=" fixed bottom-2 left-2 z-50">
            <div className="flex flex-col justify-end w-max"></div>
            {statusMessage.length > 0 &&
                statusMessage.map((item) => <Item key={item.id} data={item} />)}
        </div>
    );
}

export default StatusMessage;
