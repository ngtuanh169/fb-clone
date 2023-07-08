import SubLayoutLeft from "../../Components/SubLayoutLeft";
import SearchSubLayout from "../../Components/Modal/SearchSubLayout";
function Marketplace() {
    return (
        <div className="flex">
            <div className="flex">
                <SubLayoutLeft name={"Marketplace"}>
                    <div className="">
                        <SearchSubLayout nameInput="Tìm kiếm Marketplace" />
                    </div>
                </SubLayoutLeft>
            </div>
        </div>
    );
}

export default Marketplace;
