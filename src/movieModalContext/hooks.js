import { useContext } from "react";
import Context from "./Context";

export const useMovieModalContext = () => {
    const [state, dispatch] = useContext(Context);

    return [state, dispatch];
};
