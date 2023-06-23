import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalButton from "~/components/shared/buttons/HorizontalButton";

export default function Watching({ props }) {
    const [countdown, setCountdown] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            } else {
                navigate("/browse");
            }
        }, 1000);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown]);
    return (
        <div className="flex items-center justify-center bg-mind-hunter bg-cover bg-center bg-no-repeat h-screen overflow-hidden">
            <div className="relative -translate-x-3 flex flex-col items-center justify-center max-w-[820px] text-center text-light-900 ">
                <h2 className="text-[4.25vw] font-bold">Pardon the interruption</h2>
                <p className=" mt-[1vw] text-[1.6vw]">
                    The Netflix service is not available on your device. Please check the Netflix website at
                    netflix.com/NetflixReadyDevices for information regarding support for you device.
                </p>
                <div className="flex justify-center gap-x-4 mt-[2vw]">
                    <HorizontalButton theme={"light"} to={"/browse"}>
                        {`Netflix Home (${countdown}s)`}
                    </HorizontalButton>
                    <HorizontalButton theme={"dark"} to={"/learn-more"}>
                        Learn more
                    </HorizontalButton>
                </div>

                <p className="mt-[3vw] p-[1vw] text-[2vw] border-l-4 border-l-red-700">
                    <span className="mr-3 font-light">Error Code</span>
                    <strong className="font-bold">M7111-1331</strong>
                </p>
            </div>
        </div>
    );
}
