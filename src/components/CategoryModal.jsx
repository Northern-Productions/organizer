import { useState } from "react";
import toast from "react-hot-toast";
import { Requests } from "./api";

const CategoryModal = ({ refetchData }) => {
  const [categoryValue, setCategoryValue] = useState("");

  const handleResetForm = () => {
    setCategoryValue("");
  };

  const handlePostCategory = (newCategory) => {
    return Requests.postCategory(newCategory)
      .then(() => {
        toast.success("Category added successfully!");
        refetchData();
        handleResetForm();
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        toast.error("Failed to add category: " + error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handlePostCategory({
      name: categoryValue,
    });
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h1>Add New Category</h1>
      <div className="form-input-ctn">
        <div>
          <label htmlFor="category">Category</label>
          <input
            className="form-input"
            placeholder="Ex. Decorative"
            type="text"
            id="category"
            name="category"
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit" className="form-submit">
        Add Category
      </button>
    </form>
  );
};

export default CategoryModal;
