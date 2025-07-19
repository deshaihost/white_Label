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
        // Assumed endpoint
        const response = await axios.get(`${baseUrl}/list_notion_pages`, config);
        if (response.status === 200) {
          setNotionPages(response.data?.notion_pages || []);
          // If there are existing mappings, load them
          if (response.data?.property_mapping && Array.isArray(response.data.property_mapping)) {
            setRows(
              response.data.property_mapping.map((m) => ({
                notionPageId: m.notion_page_id,
                propertyNames: (m.property_names || []).map((p) => ({ value: p, label: p }))
              }))
            );
          } else {
            setRows([{ notionPageId: '', propertyNames: [] }]);
          }
        } else {
          ToastHandle(response.data?.error || 'Failed to load Notion pages', 'danger');
        }
      } catch (error) {
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

  // Save mappings
  const handleSave = async () => {
    setSaving(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    // Prepare mapping: only include rows with both fields filled
    const mapping = rows
      .filter(row => row.notionPageId && row.propertyNames && row.propertyNames.length > 0)
      .map(row => ({
        notion_page_id: row.notionPageId,
        property_names: row.propertyNames.map((p) => p.value)
      }));
    try {
      const config = {
        headers: { 'X-API-Key': API_KEY, 'Content-Type': 'application/json' },
        validateStatus: status => status >= 200 && status < 500
      };
      const body_data = { mapping };
      // Assumed endpoint
      const response = await axios.post(`${baseUrl}/save_notion_page_property_mapping`, body_data, config);
      if (response.status === 200) {
        ToastHandle('Mappings saved successfully', 'success');
      } else {
        ToastHandle(response.data?.error || 'Failed to save mappings', 'danger');
      }
    } catch (error) {
      ToastHandle('Internal server error', 'danger');
    } finally {
      setSaving(false);
    }
  };

  // Used Notion page IDs in other rows (to prevent duplicate selection)
  const usedNotionPageIds = rows.map((row) => row.notionPageId);

  return (
    <div>
      <p style={{ fontSize: '14px', textAlign: 'left', width: '95%', marginTop: '20px' }}>
        Use the table below to assign your Notion pages or databases to HostBuddy properties. Click "Save" at the bottom when finished.
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
                <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>Notion page/database</th>
                <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>Properties</th>
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
