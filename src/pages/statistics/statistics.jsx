import React, { useRef, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { FullScreenLoader } from '../../helper/Loader';
import './statistics.css';
import { lineGraphDataSets, histogramDataSets, callGetStatisticsApi, getStatisticsData } from './dataManager';

// Helper hook to get the width of a DOM element
const useElementWidth = () => {
  const ref = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth); // Recalculate on window resize

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return [ref, width];
};

// LineGraphTile component
const LineGraphTile = ({ dataSets, width, height }) => {
  const [tileRef, tileWidth] = useElementWidth(); // Hook to get dynamic width of the tile
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentDataSetIndex, setCurrentDataSetIndex] = useState(0);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (index) => {
    setAnchorEl(null);
    if (index !== undefined) {
      setCurrentDataSetIndex(index);
    }
  };

  const currentDataSet = dataSets[currentDataSetIndex];
  if (!currentDataSet || !currentDataSet.data) { return null; } // Return null if data is not available yet

  return (
    <Grid size={width}>
      <div className="statistics-tile" style={{ height }} ref={tileRef}>
        <div className="tile-header">
          <h3>{currentDataSet.title}</h3>
          <IconButton onClick={handleMenuOpen} className="icon-button">
            <span style={{ fontSize: '24px' }}>⋮</span>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={() => handleMenuClose()}>
            {dataSets.map((dataset, index) => (
              <MenuItem key={index} selected={index === currentDataSetIndex} onClick={() => handleMenuClose(index)}>
                {dataset.identifier}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <LineChart width={tileWidth - 40} height={200} data={currentDataSet.data}>
          {/* Adjust chart width dynamically */}
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="1 5" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    </Grid>
  );
};

// HistogramTile component
const HistogramTile = ({ dataSets, width, height }) => {
  const [tileRef, tileWidth] = useElementWidth(); // Hook to get dynamic width of the tile
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentDataSetIndex, setCurrentDataSetIndex] = useState(0);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (index) => {
    setAnchorEl(null);
    if (index !== undefined) {
      setCurrentDataSetIndex(index);
    }
  };

  const currentDataSet = dataSets[currentDataSetIndex];
  if (!currentDataSet || !currentDataSet.data) { return null; } // Return null if data is not available yet

  return (
    <Grid size={width}>
      <div className="statistics-tile" style={{ height }} ref={tileRef}>
        <div className="tile-header">
          <h3>{currentDataSet.title}</h3>
          <IconButton onClick={handleMenuOpen} className="icon-button">
            <span style={{ fontSize: '24px' }}>⋮</span>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={() => handleMenuClose()}>
            {dataSets.map((dataset, index) => (
              <MenuItem key={index} selected={index === currentDataSetIndex} onClick={() => handleMenuClose(index)}>
                {dataset.identifier}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <BarChart width={tileWidth - 40} height={200} data={currentDataSet.data}>
          {/* Adjust chart width dynamically */}
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="1 5" />
          <Tooltip />
          <Bar dataKey="value" fill="#2196F3" />
        </BarChart>
      </div>
    </Grid>
  );
};

// Tile containing prominently displayed numbers and text labels
const MetricTile = ({ dataSets, width, height }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentDataSetIndex, setCurrentDataSetIndex] = useState(0);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (index) => {
    setAnchorEl(null);
    if (index !== undefined) {
      setCurrentDataSetIndex(index);
    }
  };

  const currentDataSet = dataSets[currentDataSetIndex].data;
  if (!currentDataSet) { return null; } // Return null if data is not available yet

  return (
    <Grid size={width}>
      <div className="statistics-tile metric-tile" style={{ height }}>
        <div className="tile-header">
          <h3>{dataSets[currentDataSetIndex].title}</h3>
          <IconButton onClick={handleMenuOpen} className="icon-button">
            <span style={{ fontSize: '24px' }}>⋮</span>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={() => handleMenuClose()}>
            {dataSets.map((dataset, index) => (
              <MenuItem key={dataset.identifier} selected={index === currentDataSetIndex} onClick={() => handleMenuClose(index)}>
                {dataset.identifier}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className="metric-content">
          {currentDataSet.map((item, index) => (
            <div key={index} className="metric-item">
              <div className="metric-number">{item.number}</div>
              <div className="metric-text">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </Grid>
  );
};

// Tile containing a title and content text
const TextTile = ({ title, content, width, height }) => {
  return (
    <Grid size={width}>
      <div className="statistics-tile text-tile" style={{ height }}>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </Grid>
  );
};


const StatisticsPage = () => {
  const [apiStatisticsData, setApiStatisticsData] = useState({});
  const [dataLoading, setDataLoading] = useState(true);

  // *** THIS contains the (static) definition of which tiles to render, and in which order *** //
  const messagingTiles = [
    { component: MetricTile, dataSets: apiStatisticsData?.totalMessagesResponded, width: 4, height: "300px" },
    { component: MetricTile, dataSets: apiStatisticsData?.responseTimes, width: 4, height: "300px" },
    { component: MetricTile, dataSets: apiStatisticsData?.sentimentMetrics, width: 4, height: "300px" },
    { component: HistogramTile, dataSets: apiStatisticsData?.messageTimingData, width: 12, height: '300px' },
  ];

  const actionItemsTiles = [
    { component: MetricTile, dataSets: apiStatisticsData?.actionItemMetrics, width: 4, height: "300px" },
    { component: HistogramTile, dataSets: apiStatisticsData?.actionItemsReceived, width: 8, height: '300px' },
  ];

  // When the page loads, fetch the data and populate the charts
  useEffect(() => {
    getStatisticsData(setApiStatisticsData, setDataLoading);
  }, []);

  const renderTiles = (tiles) => (
    <Grid container spacing={2}>
      {tiles.map((tile, index) => {
        if (!tile.dataSets) return null; // Render only if dataSets is available
        const TileComponent = tile.component;
        return (
          <TileComponent {...tile} key={index} />
        );
      })}
    </Grid>
  );

  return (
    <div className="statistics-page">
      {dataLoading && <FullScreenLoader />}
      <h1 className="page-header">HostBuddy Insights</h1>
      <h2 className="section-header">Messaging</h2>
      {renderTiles(messagingTiles)}
      <h2 className="section-header">Action Items</h2>
      {renderTiles(actionItemsTiles)}
    </div>
  );
};

export default StatisticsPage;
