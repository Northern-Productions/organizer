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
import { Requests } from "./components/api";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);

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
      </Categories>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        allItems={allItems}
        setFilteredData={setFilteredData}
      />
      <ContentCtn filteredData={filteredData} refetchData={refetchData} />
    </>
  );
}

export default App;
