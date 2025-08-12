import axios from "axios";

export const fetchCategories = async () => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const response = await axios.get(
      `${baseUrl}/get_action_item_categories`,
      {
        headers: {
          "X-API-Key": API_KEY
        }
      }
    );

    if (response.status === 200) {
      return response.data.categories;
    } else {
      console.error("Failed to load categories");
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};