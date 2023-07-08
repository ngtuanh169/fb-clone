import { usePalette, useColor } from "color-thief-react";
export const useColorInImg = (src) => {
    const { data, loading, error } = usePalette(src, 2, "hex");
    return data ? data[0] : undefined;
};
