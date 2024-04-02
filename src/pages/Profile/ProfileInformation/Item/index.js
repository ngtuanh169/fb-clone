import ItemInput from "./ItemInput";
import ItemOptions from "./ItemOptions";
function Item({
    data = [],
    id,
    introductionList,
    setIntroductionList = () => {},
}) {
    return (
        <div className="flex flex-col w-full mt-6 px-2">
            {data.length > 0 &&
                data.map((item) => {
                    if (id == 0) {
                        return item.options ? (
                            <ItemOptions
                                key={item.id}
                                item={item}
                                setIntroductionList={setIntroductionList}
                                introductionList={introductionList}
                            />
                        ) : (
                            <ItemInput
                                key={item.id}
                                item={item}
                                setIntroductionList={setIntroductionList}
                                introductionList={introductionList}
                            />
                        );
                    }
                    if (id == item.id) {
                        return item.options ? (
                            <ItemOptions
                                key={item.id}
                                item={item}
                                setIntroductionList={setIntroductionList}
                                introductionList={introductionList}
                            />
                        ) : (
                            <ItemInput
                                key={item.id}
                                item={item}
                                setIntroductionList={setIntroductionList}
                                introductionList={introductionList}
                            />
                        );
                    }
                })}
            {id !== 0 && <div></div>}
        </div>
    );
}

export default Item;
