import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { useNavigate } from "react-router-dom";
// redux
import { connect } from "react-redux";
import { loadCurrentGenreAction } from "~/redux/actions/pageActions";

function GenreSelection({ data, placeholder, type, loadCurrentGenreAction }) {
    const [open, setOpen] = useState(false);
    // const [defaultValue, setDefaultValue] = useState("");
    // const [defaultTitle, setDefaultTitle] = useState("");
    const navigate = useNavigate();

    const handleSelect = (genre) => {
        if (!open) {
            document.addEventListener("click", handleOutsideClick, false);
        } else {
            document.removeEventListener("click", handleOutsideClick, false);
        }
        setOpen(!open);
        // setDefaultValue(genre.id);
        // setDefaultTitle(genre.name);
        loadCurrentGenreAction(type, genre);
        navigate(`/browse/${type.value}/${genre.id}`);
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleOutsideClick = () => {
        handleSelect();
    };

    return (
        <div className="relative">
            <div className="select-input" onClick={handleOpen}>
                {/* <span className="text-base font-semibold ">{defaultTitle === "" ? placeholder : defaultTitle}</span> */}
                <span className="text-base font-semibold ">{placeholder}</span>
                <span className={`text-xl transition-transform duration-300 ${open && "-rotate-180"}`}>
                    {<GoChevronDown />}
                </span>
            </div>
            {open && (
                <ul className="select-megalist">
                    {data.map((item, index) => (
                        <li key={index}>
                            <div className="select-item" onClick={() => handleSelect(item)}>
                                <span className="line-clamp-1" title={item.name}>
                                    {item.name}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    type: state.page.type,
});

const mapDispatchToProps = (dispatch) => ({
    loadCurrentGenreAction: (type, genre) => dispatch(loadCurrentGenreAction(type, genre)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GenreSelection);
