import { useState, useEffect } from "react";
import "normalize.css";
import "./App.css";
import "./index.css";
import Categories from "./components/Categories";
import toast from "react-hot-toast";
import SearchBar from "./components/SearchBarFunc";
import ContentCtn from "./components/ContentCtn";
import AddItem from "./components/AddItem";
import AddCategory from "./components/AddCategory";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import { Requests } from "./components/api";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);

  const refetchData = () => {
    return Requests.getAllItems()
      .then((fetchedItems) => {
        setAllItems(fetchedItems);
      })
      .catch((error) => {
        console.error("Failed to fetch items: ", error);
        toast.error("Failed to fetch items: ", error);
      });
  };

  useEffect(() => {
    refetchData();
  }, []);

  const openDeleteCategoryModal = () => {
    setIsDeleteCategoryModalOpen(true);
  };

  const closeDeleteCategoryModal = () => {
    setIsDeleteCategoryModalOpen(false);
  };

  return (
    <>
      <Categories
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      >
        <AddItem refetchData={refetchData} categories={categories} />
        <AddCategory refetchData={refetchData} />
        <button
          id="category-delete-modal-btn"
          onClick={openDeleteCategoryModal}
        >
          -
        </button>
      </Categories>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        allItems={allItems}
        setFilteredData={setFilteredData}
      />
      <ContentCtn filteredData={filteredData} refetchData={refetchData} />
      <div className="footer">
        <p>
          Created by:{" "}
          <a target="_blank" href="https://www.northernproductions.tech/">
            Northern Productions
          </a>
        </p>
      </div>

      {isDeleteCategoryModalOpen && (
        <DeleteCategoryModal
          categories={categories}
          refetchData={refetchData}
          closeModal={closeDeleteCategoryModal}
        />
      )}
    </>
  );
}

export default App;
