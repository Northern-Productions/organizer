import { useState } from "react";
import toast from "react-hot-toast";
import { Requests } from "./api";

const ItemModal = ({ refetchData, categories }) => {
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemWidth, setItemWidth] = useState("");
  const [itemLength, setItemLength] = useState("");
  const [itemManufacturer, setItemManufacturer] = useState("");

  const handleResetForm = () => {
    setItemCategory("");
    setItemDescription("");
    setItemWidth("");
    setItemLength("");
    setItemManufacturer("");
  };

  let itemSize = itemWidth + '" x ' + itemLength + "'";

  const handlePostItem = (newItem) => {
    return Requests.postItem(newItem)
      .then(() => {
        toast.success("Item added successfully!");
        refetchData();
        handleResetForm();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        toast.error("Failed to add item: " + error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handlePostItem({
      category_id: itemCategory, // Use category_id instead of category
      description: itemDescription,
      size: itemSize,
      manufacturer: itemManufacturer,
    });
  };

  return (
    <>
      <h1>Add New Item</h1>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="form-input-ctn">
          <div>
            <label htmlFor="category">Category</label>
            <select
              className="form-select"
              placeholder="Category"
              type="select"
              id="item-modal-category-select"
              name="item-modal-category-select"
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                -- Select an option --
              </option>
              {categories.map((obj) => (
                <option key={obj.id} value={obj.id}>
                  {obj.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="size">Size</label>
            <div>
              <div id="size-inputs">
                <input
                  type="number"
                  id="width"
                  name="width"
                  value={itemWidth}
                  onChange={(e) => setItemWidth(e.target.value)}
                  inputMode="numeric"
                  placeholder="Width"
                  required
                />
                <span> X </span>
                <input
                  type="text"
                  id="length"
                  name="length"
                  value={itemLength}
                  onChange={(e) => setItemLength(e.target.value)}
                  placeholder="length"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={itemManufacturer}
              onChange={(e) => setItemManufacturer(e.target.value)}
            />
          </div>
        </div>
        <button className="add-item-modal-btn" type="submit">
          Add Item
        </button>
      </form>
    </>
  );
};

export default ItemModal;
