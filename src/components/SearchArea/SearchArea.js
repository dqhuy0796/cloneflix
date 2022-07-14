import { IoSearch } from "react-icons/io5";
function SearchArea() {
    return (
        <form>
            <input type={"text"} placeholder={"Search your movie..."} className={"hidden"} />
            <button
                type="submit"
                className="flex items-center justify-center w-12 h-12 rounded-full text-4xl text-light-100 hover:text-light-500"
            >
                <IoSearch />
            </button>
        </form>
    );
}

export default SearchArea;
