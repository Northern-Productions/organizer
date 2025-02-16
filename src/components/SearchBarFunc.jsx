import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import levenshtein from "fast-levenshtein";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  allItems,
  setFilteredData,
}) => {
  useEffect(() => {
    let data = allItems;

    if (selectedCategory) {
      data = data.filter((obj) => obj.category === selectedCategory);
    }
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      data = data.filter((obj) => {
        const descriptionDistance = levenshtein.get(
          obj.description.toLowerCase(),
          lowerCaseSearchTerm
        );
        const sizeDistance = levenshtein.get(
          obj.size.toLowerCase(),
          lowerCaseSearchTerm
        );
        const manufacturerDistance = levenshtein.get(
          obj.manufacturer.toLowerCase(),
          lowerCaseSearchTerm
        );
        return (
          descriptionDistance <= 3 ||
          sizeDistance <= 3 ||
          manufacturerDistance <= 3 ||
          obj.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          obj.size.toLowerCase().includes(lowerCaseSearchTerm) ||
          obj.manufacturer.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
    }
    setFilteredData(data);
  }, [selectedCategory, searchTerm, allItems, setFilteredData]);

  return (
    <div className="search-bar-ctn">
      <label id="search-ctn" htmlFor="search">
        <input
          tabIndex={0}
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FontAwesomeIcon icon="search" />
      </label>
    </div>
  );
};

export default SearchBar;
