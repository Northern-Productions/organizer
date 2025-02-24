import { useState } from "react";
import EditModal from "./EditModal";

const ContentCtn = ({ filteredData, refetchData }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!Array.isArray(filteredData)) {
    return <p>No data available</p>;
  }

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Size</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((object) => (
            <tr key={object.id} className="table-item">
              <td>{object.description}</td>
              <td>{object.size}</td>
              <td>
                {object.manufacturer}
                <button id="edit-item" onClick={() => handleOpenModal(object)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div id="edit-modal" className="edit-modal">
          <div className="modal-x" onClick={handleCloseModal}>
            X
          </div>
          <EditModal
            item={selectedItem}
            refetchData={refetchData}
            closeModal={handleCloseModal}
          />
        </div>
      )}
    </>
  );
};

export default ContentCtn;
