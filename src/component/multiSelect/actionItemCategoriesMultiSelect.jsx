import React, { useEffect, useState } from 'react';
import MultiSelect from './multiSelect';
import axios from 'axios';


export const fetchCategoriesFromAPI = async () => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; }
    };
    
    const response = await axios.get(`${baseUrl}/get_action_item_categories`, config);
    
    if (response.status === 200) {
      return response.data.categories;
    } else {
      console.error("Failed to fetch action item categories:", response.data.error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching action item categories:", error);
    return [];
  }
};

/**
 * A component that provides a multi-select dropdown for action item categories
 * Handles fetching categories from the API and state management
 */
const MultiCategorySelect = ({ selectedCategories, setSelectedCategories, userData, placeholder = "Select Categories" }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        const categories = await fetchCategoriesFromAPI();
        if (categories && categories.length > 0) {
          // Map categories to format needed for react-select
          const formattedCategories = categories.map(cat => ({
            value: cat.name,
            label: cat.name
          }));
          setCategoryOptions(formattedCategories);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <MultiSelect
      options={categoryOptions}
      selectedOptions={selectedCategories}
      setSelectedOptions={setSelectedCategories}
      placeholder="Select categories..."
      selectAllText="Select all categories"
    />
  );
};

export default MultiCategorySelect;