import { Requests } from "./api";
import toast from "react-hot-toast";

const ContentCtn = ({ filteredData, refetchData }) => {
  if (!Array.isArray(filteredData)) {
    return <p>No data available</p>;
  }

  const handleDelete = (object) => {
    return Requests.deleteItem(object.id)
      .then(() => {
        toast.success("Item deleted successfully!");
        refetchData();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        toast.error("Failed to delete item: " + error.message);
      });
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
                <button
                  className="item-delete-btn"
                  onClick={() => handleDelete(object)}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ContentCtn;
