import react from "react";

const SearchInput = ({ value, onChange}) => {

    function handleChange(event) {
        onchange(event.taget.value);
    }

    return (
    <SearchInput type="search" value={value} onChange={onChange}
        />
    );
};

export default SearchInput;