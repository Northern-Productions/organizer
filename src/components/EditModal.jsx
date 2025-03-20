import { useState, useEffect } from "react";
import { Requests } from "./api";
import toast from "react-hot-toast";

const EditModal = ({ item, refetchData, closeModal }) => {
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [amount, setAmount] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isYesButtonDisabled, setIsYesButtonDisabled] = useState(true);

  useEffect(() => {
    if (item) {
      setDescription(item.description);
      setSize(item.size);
      setAmount(item.amount);
      setManufacturer(item.manufacturer);
    }
  }, [item]);

  useEffect(() => {
    if (isDeleteModalOpen) {
      const timer = setTimeout(() => {
        setIsYesButtonDisabled(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isDeleteModalOpen]);

  const handleUpdateItem = (e) => {
    e.preventDefault();

    const updatedItem = {
      ...item,
      description,
      size,
      amount,
      manufacturer,
    };

    Requests.updateItem(item.id, updatedItem)
      .then(() => {
        toast.success("Item updated successfully!");
        refetchData();
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        toast.error("Failed to update item: " + error.message);
      });
  };

  const handleDeleteItem = () => {
    Requests.deleteItem(item.id)
      .then(() => {
        toast.success("Item deleted successfully!");
        refetchData();
        closeModal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        toast.error("Failed to delete item: " + error.message);
      });
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsYesButtonDisabled(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <form className="modal-form" onSubmit={handleUpdateItem}>
        <div className="form-input-ctn">
          <h1>Edit Item</h1>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="size">Size</label>
            <input
              type="text"
              id="size"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              required
            />
          </div>
        </div>
        <div id="edit-modal-btn-ctn" className="btn-margin">
          <button type="submit">Update Item</button>
          <button type="button" onClick={openDeleteModal}>
            Delete Item
          </button>
        </div>
      </form>

      {isDeleteModalOpen && (
        <div className="delete-modal">
          <p>Are you sure you want to delete the item?</p>
          <button
            className="btn-margin"
            onClick={handleDeleteItem}
            disabled={isYesButtonDisabled}
          >
            Yes
          </button>
          <button className="btn-margin" onClick={closeDeleteModal}>
            No
          </button>
        </div>
      )}
    </>
  );
};

export default EditModal;
