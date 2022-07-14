import { useEffect, useState } from "react";

function useViewport() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const updateSize = () => setWidth(window.innerWidth);

        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return { width };
}

export default useViewport;
