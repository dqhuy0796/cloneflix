import ElementSkeleton from "../ElementSkeleton";

function BannerSkeleton() {
    return (
        <div className="z-0 relative lg:h-[38vw] bg-dark-900 -mb-[1px]">
            <div className="relative w-full pt-[150%] sm:pt-[100%] lg:pt-[56.25%] overflow-hidden bg-dark-900">
                <ElementSkeleton type="backdrop" className="bg-dark-900" />
            </div>
            <div className="z-0 absolute inset-0 flex items-end justify-between lg:pl-[60px] w-full bg-transparent">
                <div className="flex flex-col justify-end w-full lg:w-1/2 2xl:w-1/3 gap-5 bg-transparent">
                    <div className="h-[32px] lg:h-[40px] xl:h-[48px] w-full flex items-center justify-center lg:justify-start">
                        <ElementSkeleton type="title" />
                    </div>

                    <ul className="flex lg:hidden items-center justify-center flex-wrap gap-x-5">
                        {[1, 2, 3].map((index) => (
                            <li key={index} className="genre-item w-12 h-6">
                                <ElementSkeleton type="text" />
                            </li>
                        ))}
                    </ul>

                    <ul className={`hidden lg:block`}>
                        {[1, 2, 3, 4].map((index) => (
                            <li key={index} className="h-6 pb-1">
                                <ElementSkeleton type="text" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BannerSkeleton;
