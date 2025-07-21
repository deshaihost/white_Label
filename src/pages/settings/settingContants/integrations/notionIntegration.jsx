import React, { useEffect, useState } from 'react';
import ToastHandle from '../../../../helper/ToastMessage';
import Loader from '../../../../helper/Loader';
import MultiSelect from '../../../../component/multiSelect/multiSelect';
import axios from 'axios';

const NotionIntegration = ({ ApiUserData }) => {
  // User properties
  const propertyData = ApiUserData?.ApiUserData?.property_data;
  const allProperties = Object.keys(propertyData || {});
  const propertyOptions = allProperties.map((name) => ({ value: name, label: name }));

  // State
  const [notionPages, setNotionPages] = useState([]); // [{id, title}]
  const [rows, setRows] = useState([{ notionPageId: '', propertyNames: [] }]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch Notion pages and existing mappings
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;
      try {
        const config = {
          headers: { 'X-API-Key': API_KEY, 'Content-Type': 'application/json' },
          validateStatus: status => status >= 200 && status < 500
        };
        // Get data from /list_notion_pages endpoint
        const response = await axios.get(`${baseUrl}/list_notion_pages`, config);
        if (response.status === 200) {
          // Set notion pages from the response
          const pages = response.data?.notion_pages || [];
          setNotionPages(pages.map(page => ({ 
            id: page.id, 
            title: page.alias,
            url: page.url,
            created_time: page.created_time,
            last_edited_time: page.last_edited_time
          })));
          
          // Process property mappings if they exist
          const mappingObj = response.data?.property_mapping || {};
          if (Object.keys(mappingObj).length > 0) {
            const initialRows = [];
            
            // Convert property_mapping object to rows format
            Object.entries(mappingObj).forEach(([notionPageId, data]) => {
              if (data.properties && data.properties.length > 0) {
                // Create a row for each notion page that has mappings
                initialRows.push({
                  notionPageId: notionPageId,
                  propertyNames: data.properties.map(prop => ({
                    value: prop.hostbuddy_property_name,
                    label: prop.hostbuddy_property_name
                  }))
                });
              }
            });
            
            // If mappings exist, set rows with them
            if (initialRows.length > 0) {
              setRows(initialRows);
            } else {
              setRows([{ notionPageId: '', propertyNames: [] }]);
            }
          } else {
            // Start with one empty row if no mappings
            setRows([{ notionPageId: '', propertyNames: [] }]);
          }
        } else {
          ToastHandle(response.data?.error || 'Failed to load Notion pages', 'danger');
        }
      } catch (error) {
        console.error('Error fetching Notion pages:', error);
        ToastHandle('Internal server error', 'danger');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add a new blank row
  const handleAddRow = () => {
    setRows([...rows, { notionPageId: '', propertyNames: [] }]);
  };

  // Delete a row by index
  const handleDeleteRow = (idx) => {
    setRows(rows.filter((_, i) => i !== idx));
  };

  // Update a row's Notion page
  const handleNotionPageChange = (idx, value) => {
    setRows(rows.map((row, i) => i === idx ? { ...row, notionPageId: value } : row));
  };

  // Update a row's property multi-select
  const handlePropertyChange = (idx, selected) => {
    setRows(rows.map((row, i) => i === idx ? { ...row, propertyNames: selected } : row));
  };

  // Save mappings - Just a placeholder function as requested (no actual save functionality)
  const handleSave = async () => {
    console.log('Save functionality is disabled as per requirements');
    // Display what would be saved for demonstration purposes
    const mappingsToSave = {};
    rows.forEach(row => {
      if (row.notionPageId && row.propertyNames && row.propertyNames.length > 0) {
        mappingsToSave[row.notionPageId] = {
          properties: row.propertyNames.map(prop => ({
            hostbuddy_property_name: prop.value,
            notion_page_name: notionPages.find(p => p.id === row.notionPageId)?.title || ''
          }))
        };
      }
    });
    console.log('Mappings that would be saved:', mappingsToSave);
  };

  // Used Notion page IDs in other rows (to prevent duplicate selection)
  const usedNotionPageIds = rows.map((row) => row.notionPageId);

  return (
    <div>
      <p style={{ fontSize: '14px', textAlign: 'left', width: '95%', marginTop: '20px' }}>
        Use the table below to assign your Notion pages or databases to HostBuddy properties. Click "Add Another Page" to add more mappings.
      </p>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Hide the select-all link for MultiSelect in this table only */}
          <style>{`.notion-multiselect .clickableLink { display: none !important; }`}</style>
          <table style={{ marginTop: '30px', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>Notion pages</th>
                <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>HostBuddy properties</th>
                <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} style={{ height: '40px', borderBottom: '1px solid white' }}>
                  {/* Notion page/database single-select */}
                  <td style={{ padding: '10px', fontSize: '14px' }}>
                    <select
                      value={row.notionPageId}
                      onChange={e => handleNotionPageChange(idx, e.target.value)}
                      style={{ width: '100%' }}
                      className={`form-control ${!row.notionPageId ? 'grey-text' : ''}`}
                    >
                      <option value="">[None selected]</option>
                      {notionPages.map((page) => (
                        <option
                          key={page.id}
                          value={page.id}
                          disabled={usedNotionPageIds.includes(page.id) && row.notionPageId !== page.id}
                        >
                          {page.title}
                        </option>
                      ))}
                    </select>
                  </td>
                  {/* Property multi-select */}
                  <td style={{ padding: '10px', minWidth: '250px' }}>
                    <div className="notion-multiselect">
                      <MultiSelect
                        options={propertyOptions}
                        selectedOptions={row.propertyNames}
                        setSelectedOptions={selected => handlePropertyChange(idx, selected)}
                        placeholder="Select properties..."
                        width="100%"
                      />
                    </div>
                  </td>
                  {/* Delete row button */}
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ borderRadius: '50px', padding: '4px 18px', fontSize: '16px' }}
                      onClick={() => handleDeleteRow(idx)}
                      disabled={rows.length === 1}
                      title={rows.length === 1 ? 'At least one row required' : 'Delete row'}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ borderRadius: '50px', padding: '8px 18px', fontSize: '16px' }}
              onClick={handleAddRow}
            >
              Add Another Page
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            {!saving ? (
              <button
                type="button"
                className="btn btn-primary"
                style={{ borderRadius: '50px', padding: '10px 20px', fontSize: '18px' }}
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <Loader />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotionIntegration;
