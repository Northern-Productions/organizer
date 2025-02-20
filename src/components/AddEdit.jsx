import EditModal from "./EditModal";

const AddCategory = ({ refetchData }) => {
  const modal = document.getElementById("edit-modal");

  const openModalClick = () => {
    modal.style.display = "block";
  };

  const closeModalClick = () => {
    modal.style.display = "none";
  };

  return (
    <>
      <div id="edit-item" onClick={openModalClick}>
        +
      </div>

      <div id="edit-modal" className="edit-modal">
        <div className="modal-x" onClick={closeModalClick}>
          X
        </div>
        <EditModal refetchData={refetchData} />
      </div>
    </>
  );
};

export default AddCategory;
