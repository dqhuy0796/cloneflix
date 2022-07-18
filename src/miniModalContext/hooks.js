import { useContext } from "react";
import Context from "./Context";

export const useMiniModalContext = () => {
    const [state, dispatch] = useContext(Context);

    return [state, dispatch];
};
