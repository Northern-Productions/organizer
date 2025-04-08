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
            <th>Size/Amount</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((object) => (
            <tr key={object.id} className="table-item">
              <td>
                <div id="price-ctn">
                  <div>{object.description}</div>
                  <div id="price-display">{object.price}</div>
                </div>
              </td>
              <td>{object.size ? object.size : object.amount}</td>
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
