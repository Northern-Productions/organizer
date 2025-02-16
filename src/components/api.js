import supabase from "./supabaseClient";

export const Requests = {
  // should return a promise with all items in the database
  getAllItems: async () => {
    const { data, error } = await supabase.from("items").select("*");

    if (error) {
      throw new Error(`Fetching failed: ${error.message}`);
    }

    return data;
  },

  getAllCategories: async () => {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      throw new Error(`Fetching failed: ${error.message}`);
    }

    return data;
  },

  // should create an item in the database from a partial object
  // and return a promise with the result
  postItem: async (item) => {
    const { data, error } = await supabase.from("items").insert([item]);

    if (error) {
      throw new Error(`Posting failed: ${error.message}`);
    }

    return data;
  },

  // should create a category in the database from a partial object
  // and return a promise with the result
  postCategory: async (category) => {
    const { data, error } = await supabase
      .from("categories")
      .insert([category]);

    if (error) {
      throw new Error(`Posting failed: ${error.message}`);
    }

    return data;
  },

  // should delete an item from the database
  deleteItem: async (itemId) => {
    const { data, error } = await supabase
      .from("items")
      .delete()
      .eq("id", itemId);

    if (error) {
      throw new Error(`Deletion failed: ${error.message}`);
    }

    return data;
  },

  updateItem: async (itemId, itemData) => {
    const { data, error } = await supabase
      .from("items")
      .update(itemData)
      .eq("id", itemId);

    if (error) {
      throw new Error(`Update failed: ${error.message}`);
    }

    return data;
  },
};
