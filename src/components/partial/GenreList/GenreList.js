import { useEffect, useState } from "react";
import { connect } from "react-redux";

function GenreList({ genres, ids, data, max = 3 }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (ids) {
            for (let i = 0; i < ids.length; i++) {
                for (let j = 0; j < genres.length; j++) {
                    if (genres[j].id === ids[i]) {
                        ids[i] = genres[j];
                    }
                }
            }
            setItems(ids);
        } else if (data) {
            setItems(data);
        }

        return () => setItems([]);
    }, [data, genres, ids]);

    useEffect(() => {
        if (max > 1) {
            if (items && items.length > max) {
                setItems([...items.slice(0, max - 1), { id: 0, name: `+${items.length - max + 1} more` }]);
            } else {
                setItems(items);
            }
        }
    }, [items, max]);

    return (
        <ul className="flex items-center justify-start">
            {items.map((item, index) => (
                <li key={index} className="genre-item red-dot">
                    {item.name}
                </li>
            ))}
        </ul>
    );
}

const mapStateToProps = (state) => ({
    genres: state.movies.genres,
});

const mapDispatchToProps = (dispatch) => ({
    //
});

export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
