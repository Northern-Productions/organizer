import { useState } from "react";
import { Requests } from "./api";
import toast from "react-hot-toast";

const DeleteCategoryModal = ({ categories, refetchData, closeModal }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleDeleteCategory = (e) => {
    e.preventDefault();

    if (!selectedCategoryId) {
      toast.error("Please select a category to delete.");
      return;
    }

    Requests.deleteCategory(selectedCategoryId)
      .then(() => {
        toast.success("Category deleted successfully!");
        refetchData();
        closeModal();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category: " + error.message);
      });
  };

  return (
    <div id="delete-category-modal">
      <form className="modal-form" onSubmit={handleDeleteCategory}>
        <div className="form-input-ctn">
          <h1>Delete Category</h1>
          <div>
            <label htmlFor="category">Category</label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                -- Select a category --
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn-margin" type="submit">
          Delete Category
        </button>
      </form>
    </div>
  );
};

export default DeleteCategoryModal;
