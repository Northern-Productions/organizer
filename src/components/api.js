import supabase from "./supabaseClient";

export const Requests = {
  // should return a promise with all items in the database
  getAllItems: () => {
    return fetch(`${supabase}/items`).then((response) => {
      if (!response.ok) {
        throw new Error(`Fetching failed with status ${response.status}`);
      }
      return response.json();
    });
  },

  // should create an item in the database from a partial object
  // and return a promise with the result
  postItem: (item) => {
    console.log(item);
    return fetch(`${supabase}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Posting failed with status ${response.status}`);
      }
      return response.json();
    });
  },

  // should create a category in the database from a partial object
  // and return a promise with the result
  postCategory: (category) => {
    return fetch(`${supabase}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Posting failed with status ${response.status}`);
      }
      return response.json();
    });
  },

  // should delete an item from the database
  deleteItem: (itemId) => {
    return fetch(`${supabase}/items/${itemId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Deletion failed with status ${response.status}`);
      }
      return response.json();
    });
  },

  updateItem: (itemId, itemData) => {
    return fetch(`${supabase}/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Update failed with status ${response.status}`);
      }
      return response.json();
    });
  },
};
