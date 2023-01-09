import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { IoCloseSharp, IoSearchOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loadSearchKeywordAction } from "~/redux/actions/pageActions";

function SearchContainer({ defaultValue, loadSearchKeywordAction }) {
    const [isOpen, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const inputRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!_.isEmpty(keyword)) {
            loadSearchKeywordAction(keyword);
            if (!location.pathname.includes("/browse/search")) {
                navigate("/browse/search/keyword");
            }
        }
    };

    const handleOnChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleToggleActive = () => {
        setOpen(!isOpen);
        if (!isOpen) {
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        if (defaultValue) {
            setOpen(true);
            setKeyword(defaultValue);
        }
    }, [defaultValue]);

    return (
        <form
            onSubmit={(event) => handleSubmit(event)}
            className={`flex items-center border ${isOpen ? "bg-dark-900 border-light-100" : "border-transparent"}`}
        >
            <button onClick={() => handleToggleActive()} className="p-2 text-2xl text-light-100">
                <IoSearchOutline />
            </button>
            <div
                className={`flex items-center text-base text-light-500 overflow-hidden transition-all duration-300 ${
                    isOpen ? "w-60" : "w-0"
                }`}
            >
                <input
                    ref={inputRef}
                    type={"text"}
                    value={keyword}
                    placeholder={"Title, People, Genre..."}
                    className="flex-1 border-none outline-none bg-transparent"
                    onChange={(event) => handleOnChange(event)}
                />
                <div className="p-2 text-2xl">
                    <IoCloseSharp />
                </div>
            </div>
        </form>
    );
}

const mapStateToProps = (state) => ({
    keyword: state.page.keyword,
});

const mapDispatchToProps = (dispatch) => ({
    loadSearchKeywordAction: (keyword) => dispatch(loadSearchKeywordAction(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
