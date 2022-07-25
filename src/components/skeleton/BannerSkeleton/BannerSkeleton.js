import Button from "~/components/shared/Button";
import ElementSkeleton from "../ElementSkeleton";

import { AiOutlineReload } from "react-icons/ai";
import { FiInfo, FiPlus } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";

import RoundIconButton from "~/components/shared/RoundIconButton";

function BannerSkeleton() {
    return (
        <div className="z-0 relative lg:h-[38vw] bg-blue-100">
            <div className="relative w-full pt-[150%] sm:pt-[100%] lg:pt-[56.25%] overflow-hidden border-none">
                <ElementSkeleton type="backdrop" className="bg-dark-900" />
            </div>
            <div className="z-0 absolute inset-0 flex items-end justify-between lg:pl-[60px] w-full bg-transparent">
                <div className="flex flex-col justify-end w-full lg:w-1/2 2xl:w-1/3 gap-5 bg-transparent">
                    <div className="h-[32px] lg:h-[40px] xl:h-[48px] w-full flex items-center justify-center lg:justify-start">
                        <ElementSkeleton type="title" />
                    </div>

                    <ul className="flex lg:hidden items-center justify-center flex-wrap gap-x-5">
                        {[1, 2, 3].map((n) => (
                            <li key={n} className="genre-item w-12 h-6">
                                <ElementSkeleton type="text" />
                            </li>
                        ))}
                    </ul>

                    <ul className={`hidden lg:block`}>
                        <li className="h-6 pb-1">
                            <ElementSkeleton type="text" />
                        </li>
                        <li className="h-6 pb-1">
                            <ElementSkeleton type="text" />
                        </li>
                        <li className="h-6 pb-1">
                            <ElementSkeleton type="text" />
                        </li>
                        <li className="h-6 pb-1">
                            <ElementSkeleton type="text" />
                        </li>
                    </ul>

                    <div className="mb-5 lg:mb-0 flex items-center justify-evenly lg:justify-start gap-4">
                        <Button topIcon={<FiPlus />} className={"lg:hidden bg-transparent text-white"}>
                            My List
                        </Button>
                        <Button leftIcon={<IoPlay />} className={"flex h-12 lg:min-w-[160px] text-black bg-light-900/80 hover:bg-light-900/50"}>
                            Play
                        </Button>
                        <Button leftIcon={<FiInfo />} className={"hidden lg:flex h-12 lg:min-w-[160px] text-white bg-dark-100/80 hover:bg-dark-100/50"}>
                            More Info
                        </Button>
                        <Button topIcon={<FiInfo />} className={"lg:hidden bg-transparent text-white"}>
                            Info
                        </Button>
                    </div>
                </div>

                <div className="hidden z-0 lg:flex">
                    <RoundIconButton className="border-white border">
                        <AiOutlineReload />
                    </RoundIconButton>

                    <div className="flex items-center px-3 ml-5 min-w-[100px] text-xl text-white font-semibold bg-dark-900/50 border-l-4 border-l-light-500">
                        Everyone
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerSkeleton;
