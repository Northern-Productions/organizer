import CategoryModal from "./CategoryModal";

const AddCategory = ({ refetchData }) => {
  const modal = document.getElementById("category-modal");

  const openModalClick = () => {
    modal.style.display = "block";
  };

  const closeModalClick = () => {
    modal.style.display = "none";
  };

  return (
    <>
      <div id="add-category" onClick={openModalClick}>
        Add Category
      </div>

      <div id="category-modal" className="category-modal">
        <div className="modal-x" onClick={closeModalClick}>
          X
        </div>
        <CategoryModal refetchData={refetchData} />
      </div>
    </>
  );
};

export default AddCategory;
