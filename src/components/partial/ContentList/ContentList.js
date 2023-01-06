import { useEffect, useState } from "react";

function ContentList({ title, data, max }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        let maxItems = 5;
        if (max && max > 1) {
            maxItems = max;
        }
        if (data.length > maxItems) {
            setItems([...data.slice(0, maxItems - 1), { id: 0, name: `+${data.length - maxItems + 1} more` }]);
        } else {
            setItems(data);
        }
    }, [data, max]);

    return (
        <div className="">
            {items && items.length > 0 && (
                <>
                    <span className="text-[13px] font-normal text-light-100 mr-1">{title}:</span>
                    {items.slice(0, items.length - 1).map((item, index) => (
                        <span key={index}>
                            <span className="content-item">{item.name}</span>
                            <span>,</span>
                        </span>
                    ))}
                    <span className="content-item">{items[items.length - 1].name}</span>
                </>
            )}
        </div>
    );
}

export default ContentList;
