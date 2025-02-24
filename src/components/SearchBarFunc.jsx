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
      const searchWords = lowerCaseSearchTerm.split(" ");

      data = data.filter((obj) => {
        const description = obj.description.toLowerCase();
        const size = obj.size.toLowerCase();
        const manufacturer = obj.manufacturer.toLowerCase();

        return searchWords.every((word) => {
          const descriptionDistance = levenshtein.get(description, word);
          const sizeDistance = levenshtein.get(size, word);
          const manufacturerDistance = levenshtein.get(manufacturer, word);

          return (
            descriptionDistance <= 1 ||
            sizeDistance <= 1 ||
            manufacturerDistance <= 1 ||
            description.includes(word) ||
            size.includes(word) ||
            manufacturer.includes(word)
          );
        });
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
