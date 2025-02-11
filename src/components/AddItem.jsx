import ItemModal from "./ItemModal";

const AddItem = ({ refetchData, categories }) => {
  const openModalClick = () => {
    const modal = document.getElementById("item-modal");
    modal.style.display = "block";
  };

  const closeModalClick = () => {
    const modal = document.getElementById("item-modal");
    modal.style.display = "none";
  };

  return (
    <>
      <div id="add-item" onClick={openModalClick}>
        Add Item
      </div>

      <div id="item-modal" className="item-modal">
        <div className="modal-x" onClick={closeModalClick}>
          X
        </div>
        <ItemModal refetchData={refetchData} categories={categories} />
      </div>
    </>
  );
};

export default AddItem;
