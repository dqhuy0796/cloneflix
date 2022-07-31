import ElementSkeleton from "../ElementSkeleton";

function EpisodeItemSkeleton() {
    return (
        <table className="w-full rounded border-collapse">
            <tbody>
                <tr>
                    <td className="py-4 align-middle">
                        <span className="px-4 text-xl">#</span>
                    </td>
                    <td className="py-4 align-middle">
                        <div className="relative h-[90px] w-[160px] rounded overflow-hidden">
                            <ElementSkeleton type="backdrop" className="bg-dark-900" />
                        </div>
                    </td>
                    <td className="py-4 align-middle">
                        <div className="px-4 h-full w-full min-w-[500px]">
                            <p className="mb-3 w-full text-base text-light-900">
                                <ElementSkeleton type="title" />
                            </p>
                            <div className="w-full">
                                <ElementSkeleton type="text" />
                                <ElementSkeleton type="text" />
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default EpisodeItemSkeleton;
