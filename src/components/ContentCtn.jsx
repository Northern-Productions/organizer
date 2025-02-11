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
        console.log(object);
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
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((object) => (
            <tr key={object.id} className="table-item">
              <td>{object.item.description}</td>
              <td>{object.item.size}</td>
              <td>{object.item.manufacturer}</td>
              <td>
                {object.item.amount}
                <button
                  className="item-delete-btn"
                  onClick={() => handleDelete(object)}
                >
                  Delete
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

// you made the delete button Worker. now get the real server and vercel loaded.
