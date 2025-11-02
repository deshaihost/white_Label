import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions } from "../../redux/actions";
import { FullScreenLoader } from '../../helper/Loader';
import Select from "react-select";
import customStyles from './selectStyles';
import './statistics.css';
import { getSubscriptionStatus } from '../../helper/Authorized';
import { useWhiteLabelCss } from "../../helper/WhiteLabelCssContext";

import { MetricTile, LineGraphTile, HistogramTile, renderTiles } from './statisticsTilesComponents';
import { lineGraphDataSets, histogramDataSets, callGetStatisticsApi, getStatisticsData, formatDateToReadable } from './dataManager';


const StatisticsPage = () => {
  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();
  
  const [rawApiReturn, setRawApiReturn] = useState({}); // The raw data returned by the API
  const [apiStatisticsData, setApiStatisticsData] = useState({}); // The data structures for the statistics tiles, after populated by the API and formatted in dataManager
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [showDatePickers, setShowDatePickers] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [requestedStartDate, setRequestedStartDate] = useState(''); // if the user applied a query with start date, store it here. We compare it to the start date in the API return to see if we were able to fetch it.

  const today = new Date().toISOString().split('T')[0]; // to restrict the date picker. A lil inacurrate cause time zone, but fine for now
  const dataStartDate = rawApiReturn?.statistics?.start_date
  const dataEndDate = rawApiReturn?.statistics?.end_date
  const startDateDisplay = dataStartDate ? formatDateToReadable(dataStartDate) : '';
  const endDateDisplay = dataEndDate ? formatDateToReadable(dataEndDate) : '';

  // Upsell dates: use upsell-specific dates if available, otherwise fall back to main date range
  const upsellsStartDate = rawApiReturn?.statistics?.upsell_data?.start_date || dataStartDate
  const upsellsEndDate = rawApiReturn?.statistics?.upsell_data?.end_date || dataEndDate
  const upsellsStartDateDisplay = upsellsStartDate ? formatDateToReadable(upsellsStartDate) : '';
  const upsellsEndDateDisplay = upsellsEndDate ? formatDateToReadable(upsellsEndDate) : '';
  
  // Check if API provided different dates for upsells (not just using fallback)
  const hasSpecificUpsellDates = rawApiReturn?.statistics?.upsell_data?.start_date && rawApiReturn?.statistics?.upsell_data?.end_date;
  const upsellDateRangeDiffers = hasSpecificUpsellDates && (upsellsStartDate !== dataStartDate || upsellsEndDate !== dataEndDate);

  // Store/dispatch logic to get the user property names for the multi select
      const store = useSelector((state) => state);
      const dispatch = useDispatch();

      const createPropertiesName = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
      const allPropertyName = createPropertiesName !== undefined ? createPropertiesName : {};
      const propertyOptions = Object.keys(allPropertyName).map((key) => ({ value:key, label:key })); // All property options as an array of objects, for the React Select component

      // On page load, get user data and action items
      useEffect(() => {
        dispatch(getUserDataActions(false));
      }, []);

  const handlePropertyChange = (selectedOptions) => {
    setSelectedProperties(selectedOptions);
  }

  const handleApplyFilters = () => {
    // Assemble the query data based on the current state of the inputs
    let queryData = {};
    queryData.include_upsells = true;
    if (selectedProperties.length > 0) { queryData.property_names = selectedProperties.map(property => property.value); }
    if (selectedEndDate) { queryData.end_date = selectedEndDate; } // it's already in format yyyy-mm-dd
    if (selectedStartDate) {
      queryData.start_date = selectedStartDate;
      setRequestedStartDate(selectedStartDate);
    }

    getStatisticsData(setRawApiReturn, setApiStatisticsData, setDataLoading, queryData);
    if (!selectedEndDate && !selectedStartDate) { setShowDatePickers(false); }
  }

  const handleAdjustDatesClick = () => {
    setShowDatePickers(!showDatePickers);
  }


  // Get user data from redux store
  const userData = store?.getUserDataReducer?.getUserData?.data?.user;
  const subscriptionStatus = getSubscriptionStatus(userData);
  const isProPlan = subscriptionStatus.plan && subscriptionStatus.plan.toLowerCase().includes('pro');
  const isMountPlan = subscriptionStatus.plan && subscriptionStatus.plan.toLowerCase().includes('mount');
  //const isMountPlan=true;
  // *** THIS contains the (static) definition of which tiles to render, and in which order *** //
  const messagingTiles = [
    { component: MetricTile, dataSets: apiStatisticsData?.totalMessagesSent, width: 3, height: "300px", cssConfig },
    ...(isMountPlan ? [] : [{ component: MetricTile, dataSets: apiStatisticsData?.totalMessagesResponded, width: 3, height: "300px", cssConfig }]),
    { component: MetricTile, dataSets: apiStatisticsData?.responseTimes, width: 3, height: "300px", cssConfig },
    { component: MetricTile, dataSets: apiStatisticsData?.sentimentMetrics, width: 3, height: "300px", cssConfig },
    { component: HistogramTile, dataSets: apiStatisticsData?.messageTimingData, width: 12, height: '300px', cssConfig },
  ];

  const actionItemsTiles = [
    { component: MetricTile, dataSets: apiStatisticsData?.actionItemMetrics, width: 6, height: "300px", blur: isProPlan, cssConfig },
    { component: HistogramTile, dataSets: apiStatisticsData?.actionItemsReceived, width: 6, height: '300px', blur: isProPlan, cssConfig },
  ];

  // Create fallback data for upsells if no data is available
  const fallbackUpsellsData = [
    {
      identifier: 'All Upsells',
      title: 'Upsells - Total',
      data: [
        { number: 0, text: "Messages sent" },
        { number: 0, text: "Acceptances detected" },
        { number: "0.0%", text: "Detected acceptance rate" }
      ]
    }
  ];

  // Check if we have valid upsell data or if backend didn't return any
  const hasUpsellData = apiStatisticsData?.upsellMetrics && apiStatisticsData.upsellMetrics.length > 0;
  const upsellDataNotAvailable = !rawApiReturn?.statistics?.upsell_data && dataStartDate; // Backend didn't return upsell_data but did return other stats

  const upsellsTiles = [
    { 
      component: MetricTile, 
      dataSets: hasUpsellData ? apiStatisticsData.upsellMetrics : fallbackUpsellsData, 
      width: 4, 
      height: "320px",
      cssConfig 
    },
  ]

  // Create dynamic styles with white label colors
  const getDynamicSelectStyles = () => {
    const dropdownBgColor = cssLoading ? "#17191f" : cssConfig?.css_data?.background?.dropdown || "#17191f";
    const hoverBgColor = cssLoading ? "#01255e" : cssConfig?.css_data?.background?.hover || "#01255e";
    const borderPrimaryColor = cssLoading ? "#013280" : cssConfig?.css_data?.borders?.primary || "#013280";

    return {
      ...customStyles,
      control: (provided, state) => ({
        ...provided,
        background: dropdownBgColor,
        border: state.isFocused ? `1px solid ${borderPrimaryColor}` : `1px solid ${borderPrimaryColor}`,
        borderRadius: '4px',
        color: '#d0d3db',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: "'DM Sans', sans-serif",
        fontVariationSettings: "'opsz' 14",
        minHeight: '40px',
        height: '40px',
        minWidth: '180px',
        boxShadow: 'none',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease',
        '&:hover': {
          borderColor: borderPrimaryColor
        }
      }),
      menu: (provided) => ({
        ...provided,
        background: dropdownBgColor,
        border: `1px solid ${borderPrimaryColor}`,
        borderRadius: '4px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        marginTop: '4px',
        overflow: 'hidden',
        zIndex: 20
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused || state.isSelected ? hoverBgColor : 'transparent',
        color: '#d0d3db',
        fontFamily: "'DM Sans', sans-serif",
        fontVariationSettings: "'opsz' 14",
        fontSize: '14px',
        fontWeight: '400',
        padding: '8px 12px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        ':hover': {
          backgroundColor: hoverBgColor
        },
        ':active': {
          backgroundColor: hoverBgColor
        }
      }),
    };
  };

  // When the page loads, fetch the data and populate the charts
  useEffect(() => {
    getStatisticsData(setRawApiReturn, setApiStatisticsData, setDataLoading, {include_upsells:true});
  }, []);

  return (
    <div 
      className="statistics-page"
      style={{
        background: !cssLoading ? (cssConfig?.css_data?.background?.primary || '#0F1117') : '#0F1117',
        '--white-label-input': !cssLoading ? (cssConfig?.css_data?.background?.input || '#0F1117') : '#0F1117',
        '--white-label-input-text': !cssLoading ? (cssConfig?.css_data?.text?.primary || '#FFF') : '#FFF'
      }}
    >
      
      {dataLoading && <FullScreenLoader />}
       <h1 className="page-header">
        {/* <h1>Business Insights</h1> */}
        {/* <span className="subtitle" style={{color:'#146ef5'}}>By HostBuddy</span> */}
      </h1>
       <h1 style={{color: cssConfig?.css_data?.text?.primary || "white", marginBottom:"20px"}}>Business Insights</h1>  
       <p1 style={{color: cssConfig?.css_data?.text?.secondary || "#a6a9b2", marginBottom:"20px"}}>On Dashboard</p1>
      <div style={{ borderTop: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'}`, marginBottom: '20px', marginTop: '20px' }}></div>

      <div className="parameters-section">
        <div className="parameters-left">
          <div className="date-info">
            {startDateDisplay && endDateDisplay ? (
              <p>Showing data from {startDateDisplay} to {endDateDisplay}</p>
            ) : (
              <p>Data not available yet</p>
            )}
            {!dataLoading && requestedStartDate && requestedStartDate !== dataStartDate && (
              <p style={{color: cssConfig?.css_data?.text?.quaternary || 'rgb(255, 125, 0)'}}>We could not find data for the entire date range you requested.</p>
            )}
          </div>
        </div>
        <div className="parameters-right">
          <div className="inputs-container">
            {showDatePickers ? (
              <>
                <label className="date-label">Start Date</label>
                <input 
                  type="date" 
                  className="date-input" 
                  placeholder="Start Date" 
                  value={selectedStartDate} 
                  onChange={(e) => setSelectedStartDate(e.target.value)} 
                  max={today}
                />
                <label className="date-label">End Date</label>
                <input 
                  type="date" 
                  className="date-input" 
                  placeholder="End Date" 
                  value={selectedEndDate} 
                  onChange={(e) => setSelectedEndDate(e.target.value)} 
                  max={today}
                />
              </>
            ) : (
              <button className="adjust-dates-button" onClick={handleAdjustDatesClick}>Adjust Dates</button>
            )}
          </div>
          <div className="inputs-container">
            <Select className="custom-select property_Custom_Select" isMulti options={propertyOptions} value={selectedProperties} styles={getDynamicSelectStyles()} onChange={handlePropertyChange} placeholder="All Properties" closeMenuOnSelect={false}/>
          </div>
          <button className="apply-button" style={{ backgroundColor: cssConfig?.css_data?.interactive?.button_background || '#3e88f7', borderColor: cssConfig?.css_data?.interactive?.button_background || '#3e88f7' }} onClick={handleApplyFilters}>Apply</button>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'}`, marginBottom: '20px', marginTop: '20px' }}></div>

      <h2 className="section-header">Messaging</h2>
      {renderTiles(messagingTiles, cssConfig)}

      <h2 className="section-header">Action Items</h2>
      {renderTiles(actionItemsTiles, cssConfig)}

      <h2 className="section-header">Upsells</h2>
      {upsellDateRangeDiffers && (
        <p style={{color: cssConfig?.css_data?.text?.quaternary || 'rgb(255, 125, 0)', marginTop:'-10px', marginBottom:'5px'}}>
          {upsellsStartDateDisplay && upsellsEndDateDisplay
            ? `Showing upsell data from ${upsellsStartDateDisplay} to ${upsellsEndDateDisplay}`
            : 'Upsell date range not available'}
        </p>
      )}
      {upsellDataNotAvailable && (
        <p style={{color: cssConfig?.css_data?.text?.quaternary || 'rgb(255, 125, 0)', marginTop:'-10px', marginBottom:'5px'}}>
          Upsell data not available for this date range. Try selecting a specific date range using "Adjust Dates".
        </p>
      )}
      {renderTiles(upsellsTiles, cssConfig)}

    </div>
  );
};

export default StatisticsPage;
