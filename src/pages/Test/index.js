import { useEffect, useState } from "react";
import Text from "./Text";
function Test() {
    const [string1, setString1] = useState("123");
    const [string2, setString2] = useState("1123");
    const [stNumber, setStNumber] = useState("");

    const [a, setA] = useState("");

    useEffect(() => {
        if (string1 != string2) {
            const number = Math.abs(string2 - string1);
            setStNumber(number.toString());
        } else {
            setStNumber("");
        }
    }, [string2]);
    return (
        <div className="flex-col">
            <div className="flex flex-nowrap">
                {string2.split("").map((item, index) => {
                    const arr1 = string1.split("");
                    const arr2 = string2.split("");
                    const number = arr2.length - arr1.length;
                    const zindex = index - number;
                    return <Text text={zindex >= 0 ? arr1[zindex] : ""} />;
                })}
            </div>
            <button className=" mr-2" onClick={() => setString2(a)}>
                update
            </button>
            <input
                className=" outline-none border"
                type="text"
                value={a}
                onChange={(e) => setA(e.target.value)}
            />
        </div>
    );
}

export default Test;
