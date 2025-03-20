import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Requests } from "./api";
import toast from "react-hot-toast";

const Categories = ({
  selectedCategory,
  setSelectedCategory,
  categories,
  setCategories,
  children,
}) => {
  const refetchCategories = useCallback(async () => {
    try {
      const fetchedCategories = await Requests.getAllCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to fetch categories: ", error);
      toast.error("Failed to fetch categories: " + error.message);
    }
  }, [setCategories]);

  useEffect(() => {
    refetchCategories();
  }, [refetchCategories]);

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
            <option key={obj.id} id={obj.name} value={obj.name}>
              {obj.name}
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
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Categories;
