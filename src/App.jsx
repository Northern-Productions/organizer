import { useState, useEffect } from "react";
import "normalize.css";
import "./App.css";
import "./index.css";
import Categories from "./components/Categories";
import toast from "react-hot-toast";
import SearchBar from "./components/SearchBarFunc";
import ContentCtn from "./components/ContentCtn";
import AddItem from "./components/AddItem";
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
  const [itemAmount, setItemAmount] = useState("");
  const [role, setRole] = useState(""); // if user is admin, show extra data.

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

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("No user role found");
        } else {
          setRole(profile?.role); // Set the user's role
        }
      }
    };

    fetchUserRole();
  }, [user]); // Run this effect whenever the user changes

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out: " + error.message);
    } else {
      setUser(null);
      setRole("");
      toast.success("Signed out successfully!");
    }
  };

  return (
    <>
      {user ? (
        <>
          {/* sign out button */}
          <button onClick={handleSignOut} className="sign-out-btn">
            Sign Out
          </button>
          {/* sign out button */}
          {<p className="user-role">{role}</p>}
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

// make another component to figure the prices and totals for admins
