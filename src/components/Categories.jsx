import { useEffect } from "react";
import PropTypes from "prop-types";
import { baseUrl } from "./api";

const Categories = ({
  selectedCategory,
  setSelectedCategory,
  categories,
  setCategories,
  children,
}) => {
  useEffect(() => {
    fetch(`${baseUrl}/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, [setCategories]);

  const handleClick = (e) => {
    const category = e.target.value;
    if (selectedCategory === category) {
      setSelectedCategory(""); // Deselect the category
    } else {
      setSelectedCategory(category); // Select the new category
    }
  };

  return (
    <>
      <header className="header-ctn">
        <h1 tabIndex={0} className="header">
          KAM Inventory
        </h1>
      </header>
      <span tabIndex={0} className="model-header center">
        Select a category
      </span>
      <div className="inventory-cat-ctn">
        <select
          name="cat-drop-down"
          id="cat-drop-down"
          value={selectedCategory}
          onChange={handleClick}
        >
          <option value="">All</option>
          {categories.map((obj) => (
            <option
              key={obj.id}
              id={obj.category.name.toLowerCase()}
              value={obj.category.name.toLowerCase()}
            >
              {obj.category.name}
            </option>
          ))}
        </select>
      </div>
      <div>{children}</div> {/* Add item button || Add category button */}
    </>
  );
};

Categories.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default Categories;
