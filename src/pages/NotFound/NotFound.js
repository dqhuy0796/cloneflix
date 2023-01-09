import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalButton from "~/components/shared/buttons/HorizontalButton";

function NotFound() {
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
        <div className="flex flex-col items-center justify-center gap-[4vw] text-light-900 bg-movie-theatre bg-cover bg-no-repeat h-screen overflow-hidden">
            <h2 className="text-[4vw]">Oops! Nothing here!</h2>

            <h2 className="text-[2vw]">
                <span className="">{"Auto redirect to Homepage after... "}</span>
                <span className="text-[4vw]">{`${countdown} s`}</span>
            </h2>
            <h2 className="text-[1vw]">OR</h2>
            <HorizontalButton theme={"transparent"} border to={"/browse"}>
                Back to Homepage
            </HorizontalButton>
        </div>
    );
}

export default NotFound;
