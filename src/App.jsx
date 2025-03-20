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
import Login from "./components/Login";
import SignUp from "./components/SignUp.jsx";
import supabase from "./components/supabaseClient.js";

function App() {
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);
  const [itemAmount, setItemAmount] = useState("");

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

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    const subscription = authListener.subscription;

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openDeleteCategoryModal = () => {
    setIsDeleteCategoryModalOpen(true);
  };

  const closeDeleteCategoryModal = () => {
    setIsDeleteCategoryModalOpen(false);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out: " + error.message);
    } else {
      setUser(null);
      toast.success("Signed out successfully!");
    }
  };

  return (
    <>
      {user ? (
        <>
          <button onClick={handleSignOut} className="sign-out-btn">
            Sign Out
          </button>
          <Categories
            categories={categories}
            setCategories={setCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          >
            <AddItem
              refetchData={refetchData}
              categories={categories}
              itemAmount={itemAmount}
              setItemAmount={setItemAmount}
            />
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
      ) : (
        <>
          <Login setUser={setUser} />
          <SignUp setUser={setUser} />
        </>
      )}
    </>
  );
}

export default App;
