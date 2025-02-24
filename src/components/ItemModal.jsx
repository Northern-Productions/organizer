import { useState } from "react";
import toast from "react-hot-toast";
import { Requests } from "./api";

const ItemModal = ({ refetchData, categories }) => {
  const [itemCategoryId, setItemCategoryId] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemWidth, setItemWidth] = useState("");
  const [itemLength, setItemLength] = useState("");
  const [itemManufacturer, setItemManufacturer] = useState("");
  const [itemAmount, setItemAmount] = useState("");

  const handleResetForm = () => {
    setItemCategoryId("");
    setItemCategory("");
    setItemDescription("");
    setItemWidth("");
    setItemLength("");
    setItemManufacturer("");
    setItemAmount("");
  };

  let itemSize = itemWidth + '" X ' + itemLength + "'";
  if (itemWidth === "" || itemLength === "") {
    itemSize = "";
  }

  const handlePostItem = (newItem) => {
    return Requests.postItem(newItem)
      .then(() => {
        console.log(newItem);
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
      category_id: itemCategoryId,
      category: itemCategory,
      description: itemDescription,
      size: itemSize,
      manufacturer: itemManufacturer,
      amount: itemAmount,
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = Number(e.target.value);
    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryId
    );
    setItemCategoryId(selectedCategoryId);
    setItemCategory(selectedCategory.name);
    console.log(selectedCategoryId);
    console.log(selectedCategory.name);
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
              value={itemCategoryId}
              onChange={handleCategoryChange}
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
              placeholder="S800/Black 995/soap"
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
                />
                <span>X</span>
                <input
                  type="number"
                  id="length"
                  name="length"
                  value={itemLength}
                  onChange={(e) => setItemLength(e.target.value)}
                  inputMode="numeric"
                  placeholder="Length"
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
              placeholder="3M/Madico/Avery"
            />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={itemAmount}
              onChange={(e) => setItemAmount(e.target.value)}
              placeholder="30 Cases/sausages/tubes"
            />
          </div>
        </div>
        <button className="btn-margin" type="submit">
          Add Item
        </button>
      </form>
    </>
  );
};

export default ItemModal;
