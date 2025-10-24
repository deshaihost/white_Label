import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions } from "../../redux/actions";
import { FullScreenLoader } from '../../helper/Loader';
import Select from "react-select";
import customStyles from './selectStyles';
import './statistics.css';
import { getSubscriptionStatus } from '../../helper/Authorized';

import { MetricTile, LineGraphTile, HistogramTile, renderTiles } from './statisticsTilesComponents';
import { lineGraphDataSets, histogramDataSets, callGetStatisticsApi, getStatisticsData, formatDateToReadable } from './dataManager';


const StatisticsPage = () => {
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

  const upsellsStartDate = rawApiReturn?.statistics?.upsell_data?.start_date
  const upsellsEndDate = rawApiReturn?.statistics?.upsell_data?.end_date
  const upsellsStartDateDisplay = upsellsStartDate ? formatDateToReadable(upsellsStartDate) : '';
  const upsellsEndDateDisplay = upsellsEndDate ? formatDateToReadable(upsellsEndDate) : '';

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
    { component: MetricTile, dataSets: apiStatisticsData?.totalMessagesSent, width: 3, height: "300px" },
    ...(isMountPlan ? [] : [{ component: MetricTile, dataSets: apiStatisticsData?.totalMessagesResponded, width: 3, height: "300px" }]),
    { component: MetricTile, dataSets: apiStatisticsData?.responseTimes, width: 3, height: "300px" },
    { component: MetricTile, dataSets: apiStatisticsData?.sentimentMetrics, width: 3, height: "300px" },
    { component: HistogramTile, dataSets: apiStatisticsData?.messageTimingData, width: 12, height: '300px' },
  ];

  const actionItemsTiles = [
    { component: MetricTile, dataSets: apiStatisticsData?.actionItemMetrics, width: 3, height: "300px", blur: isProPlan },
    { component: HistogramTile, dataSets: apiStatisticsData?.actionItemsReceived, width: 9, height: '300px', blur: isProPlan },
  ];

  const upsellsTiles = [
    { component: MetricTile, dataSets: apiStatisticsData?.upsellMetrics, width: 4, height: "320px" },
  ]

  // When the page loads, fetch the data and populate the charts
  useEffect(() => {
    getStatisticsData(setRawApiReturn, setApiStatisticsData, setDataLoading, {include_upsells:true});
  }, []);

  return (
    <div className="statistics-page">
      
      {dataLoading && <FullScreenLoader />}     
       <h1 className="page-header">
        {/* <h1>Business Insights</h1> */}
        {/* <span className="subtitle" style={{color:'#146ef5'}}>By HostBuddy</span> */}
      </h1>
       <h1 style={{color:"white" , marginBottom:"20px"}}>Business Insights</h1>  
       <p1 style={{color:"#a6a9b2" , marginBottom:"20px"}}>On Dashboard</p1>
      <hr/>

      <div className="parameters-section">
        <div className="parameters-left">
          <div className="date-info">
            {startDateDisplay && endDateDisplay ? (
              <p>Showing data from {startDateDisplay} to {endDateDisplay}</p>
            ) : (
              <p>Data not available yet</p>
            )}
            {!dataLoading && requestedStartDate && requestedStartDate !== dataStartDate && (
              <p style={{color:'rgb(255, 125, 0)'}}>We could not find data for the entire date range you requested.</p>
            )}
          </div>
        </div>
        <div className="parameters-right">
          <div className="inputs-container">
            {showDatePickers ? (
              <>
                <label className="date-label">Start Date</label>
                <input type="date" className="date-input" placeholder="Start Date" value={selectedStartDate} onChange={(e) => setSelectedStartDate(e.target.value)} max={today} />
                <label className="date-label">End Date</label>
                <input type="date" className="date-input" placeholder="End Date" value={selectedEndDate} onChange={(e) => setSelectedEndDate(e.target.value)} max={today} />
              </>
            ) : (
              <button className="adjust-dates-button" onClick={handleAdjustDatesClick}>Adjust Dates</button>
            )}
          </div>
          <div className="inputs-container">
            <Select className="custom-select property_Custom_Select" isMulti options={propertyOptions} value={selectedProperties} styles={customStyles} onChange={handlePropertyChange} placeholder="All Properties" closeMenuOnSelect={false}/>
          </div>
          <button className="apply-button" onClick={handleApplyFilters}>Apply</button>
        </div>
      </div>

      <hr/>

      <h2 className="section-header">Messaging</h2>
      {renderTiles(messagingTiles)}

      <h2 className="section-header">Action Items</h2>
      {renderTiles(actionItemsTiles)}

      <h2 className="section-header">Upsells</h2>
      {(upsellsStartDate != dataStartDate || upsellsEndDate != dataEndDate) && (
        <p style={{color:'rgb(255, 125, 0)', marginTop:'-10px', marginBottom:'5px'}}>Showing upsell data from {upsellsStartDateDisplay} to {upsellsEndDateDisplay}</p>
      )}
      {renderTiles(upsellsTiles)}

    </div>
  );
};

export default StatisticsPage;
