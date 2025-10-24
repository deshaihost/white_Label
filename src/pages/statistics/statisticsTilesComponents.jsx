import React, { useRef, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { IconButton, Menu, MenuItem } from '@mui/material';
import './statistics.css';
import actionItemsLocked from './icons/actionItemsLocked.svg';
import { useNavigate } from 'react-router-dom';

// Sample for how the data should be structured for the different tile types
export const lineGraphDataSets = [
  {
    identifier: 'Dataset 1',
    title: 'Sales Q1',
    data: [
      { name: 'Jan', value: 30 },
      { name: 'Feb', value: 45 },
      { name: 'Mar', value: 28 },
    ],
  },
  {
    identifier: 'Dataset 2',
    title: 'Sales Q2',
    data: [
      { name: 'Apr', value: 60 },
      { name: 'May', value: 50 },
      { name: 'Jun', value: 70 },
    ],
  },
  {
    identifier: 'Dataset 3',
    title: 'Sales Q3',
    data: [
      { name: 'Jul', value: 80 },
      { name: 'Aug', value: 65 },
      { name: 'Sep', value: 75 },
    ],
  },
];

export const histogramDataSets = [
  {
    identifier: 'Categories',
    title: 'Category Distribution',
    data: [
      { name: 'Category A', value: 12 },
      { name: 'Category B', value: 5 },
      { name: 'Category C', value: 8 },
      { name: 'Category D', value: 15 },
    ],
  },
  {
    identifier: 'Regions',
    title: 'Regional Distribution',
    data: [
      { name: 'Region 1', value: 20 },
      { name: 'Region 2', value: 10 },
      { name: 'Region 3', value: 15 },
      { name: 'Region 4', value: 25 },
    ],
  },
];

export const metricDataSets = [
  {
    identifier: 'MessagesProcessed',
    title: 'Messages Processed',
    data: [
      { number: 36, text: "Messages Processed Today" },
      { number: 12, text: "Messages Processed Yesterday" },
      { number: 48, text: "Messages Processed Last Week" }
    ]
  },
  {
    identifier: 'ResponseTimes',
    title: 'Response Times',
    data: [
      { number: 2.4, text: "Average HostBuddy response time (minutes)" },
      { number: 3.1, text: "Average Host response time (minutes)" }
    ]
  }
];

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
export const LineGraphTile = ({ dataSets, width, height }) => {
  const [tileRef, tileWidth] = useElementWidth(); // Hook to get dynamic width of the tile
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentDataSetIndex, setCurrentDataSetIndex] = useState(0);
  const open = Boolean(anchorEl);

  const heightAsInt = parseInt(height.replace('px', ''), 10); // e.g. "300px" -> 300

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
        {currentDataSet.data && currentDataSet.data.length > 0 ? (
          <LineChart width={tileWidth - 40} height={heightAsInt-80} data={currentDataSet.data}>
            {/* Adjust chart width dynamically */}
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="1 5" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        ) : (
          <p className="no-data-message" style={{marginTop:"25%"}}>No data yet</p>
        )}
      </div>
    </Grid>
  );
};

// HistogramTile component
export const HistogramTile = ({ dataSets, width, height, blur, dateRange, showStatisticsLink }) => {
  const [tileRef, tileWidth] = useElementWidth(); // Hook to get dynamic width of the tile
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentDataSetIndex, setCurrentDataSetIndex] = useState(0);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const heightAsInt = parseInt(height.replace('px', ''), 10); // e.g. "300px" -> 300

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
      <div className={`statistics-tile histogram-tile${blur ? ' blurred-tile' : ''}`} style={{ height, position: 'relative' }} ref={tileRef}>
        {blur && <div className="blurred-tile-overlay" style={{ height: '100%', width: '100%' }} />}
        {blur && (
          <div className="blurred-tile-message">
            <p className="blurred-tile-message-top">Action Items Received</p>
            <div className="blurred-tile-message-middle">
              <img src={actionItemsLocked} alt="Locked" style={{ width: 40, height: 40, marginBottom: 8 }} />
              Upgrade to unlock this insight & much more!
              <div
                className="compare-plans-link"
                onClick={() => navigate('/setting/subscription')}
                style={{ cursor: 'pointer', color: '#4FC3F7',  marginTop: 8 }}
              >
                Compare Plans
              </div>
            </div>
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 0 }}>
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
          <div className={blur ? 'blurred-content' : ''}>
            {currentDataSet.data && currentDataSet.data.length > 0 ? (
              <>
                <BarChart width={tileWidth - 40} height={heightAsInt-140} data={currentDataSet.data}>
                  {/* Adjust chart width dynamically - reduced height to make room for footer */}
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid stroke="#eee" strokeDasharray="1 5" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2196F3" />
                </BarChart>
                {/* Date range and statistics link - right after chart SVG */}
                {dateRange && (
                  <div className="histogram-footer">
                    <p className="histogram-date-range">
                      Above data from {dateRange.start} to {dateRange.end}
                    </p>
                    {showStatisticsLink && (
                      <div className="statistics-link">
                        <a href="/statistics" onClick={(e) => { e.preventDefault(); navigate('/statistics'); }}>
                          See more statistics
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="no-data-message" style={{marginTop:"25%"}}>No data yet</p>
            )}
          </div>
        </div>
      </div>
    </Grid>
  );
};

// Tile containing prominently displayed numbers and text labels
export const MetricTile = ({ dataSets, width, height, blur }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentDataSetIndex, setCurrentDataSetIndex] = useState(0);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

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

  // Check if this is a sentiment-related tile
  const isSentimentTile = dataSets[currentDataSetIndex].title && 
    (dataSets[currentDataSetIndex].title.toLowerCase().includes('sentiment') ||
     dataSets[currentDataSetIndex].title.toLowerCase().includes('guest sentiment'));

  return (
    <Grid size={width}>
      <div className={`statistics-tile metric-tile${blur ? ' blurred-tile' : ''}${isSentimentTile ? ' sentiment-tile' : ''}`} style={{ height, position: 'relative' }}>
        {blur && <div className="blurred-tile-overlay" style={{ height: '100%', width: '100%' }} />}
        {blur && (
          <div className="blurred-tile-message">
            <p className="blurred-tile-message-top">Action Items Received and Closed</p>
            <div className="blurred-tile-message-middle">
              <img src={actionItemsLocked} alt="Locked" style={{ width: 40, height: 40, marginBottom: 8 }} />
              Upgrade to unlock this insight & much more!
              <div
                className="compare-plans-link"
                onClick={() => navigate('/setting/subscription')}
                style={{ cursor: 'pointer', color: '#4FC3F7', marginTop: 8 }}
              >
                Compare Plans
              </div>
            </div>
          </div>
        )}

        <div style={{ position: 'relative', zIndex: 0, width: '100%' }}>
          <div className="tile-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, flex: 1 }}>{dataSets[currentDataSetIndex].title}</h3>
            {dataSets && dataSets.length > 1 && (
              <div style={{ position: 'relative' }}>
                <IconButton 
                  onClick={handleMenuOpen} 
                  className="icon-button"
                  style={{ 
                    padding: '4px',
                    color: '#a6a9b2',
                    transition: 'color 0.2s'
                  }}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'white'
                    }
                  }}
                >
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>⋮</span>
                </IconButton>
              </div>
            )}
            <Menu 
              anchorEl={anchorEl} 
              open={open} 
              onClose={() => handleMenuClose()}
              PaperProps={{
                style: {
                  backgroundColor: '#17191f',
                  border: '2px solid #013280',
                  borderRadius: '8px',
                  boxShadow: '0 0 30px rgba(30, 75, 158, 0.3)',
                  minWidth: '180px'
                }
              }}
            >
              {dataSets.map((dataset, index) => (
                <MenuItem 
                  key={dataset.identifier} 
                  selected={index === currentDataSetIndex} 
                  onClick={() => handleMenuClose(index)}
                  sx={{
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontVariationSettings: "'opsz' 14",
                    color: 'white',
                    padding: '10px 16px',
                    '&:hover': {
                      backgroundColor: '#01255e'
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: '#01255e'
                      }
                    }
                  }}
                >
                  <span style={{ flex: 1 }}>{dataset.identifier}</span>
                  {index === currentDataSetIndex && (
                    <span style={{ color: '#3e88f7', marginLeft: '12px', fontSize: '16px' }}>✓</span>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div className={`metric-content${blur ? ' blurred-content' : ''}`}>
            {currentDataSet && currentDataSet.length > 0 ? (
              currentDataSet.map((item, index) => {
                const heightAsInt = parseInt(height.replace('px', ''), 10); // e.g. "300px" -> 300
                const useSmallerNumbers = (heightAsInt < currentDataSet.length * 100);

                return (
                  <div key={index} className="metric-item">
                    <div className="metric-number" style={useSmallerNumbers ? { lineHeight: '1' } : {}}>{item.number}</div>
                    <div className="metric-text">{item.text}</div>
                  </div>
                );
              })
            ) : (
            <p className="no-data-message" style={{marginTop:"25%"}}>No data yet</p>
          )}
          </div>
        </div>
      </div>
    </Grid>
  );
};

// Tile containing a title and content text
export const TextTile = ({ title, content, width, height }) => {
  return (
    <Grid size={width}>
      <div className="statistics-tile text-tile" style={{ height }}>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </Grid>
  );
};

// Takes in an array of tile specifications (like the one in statistics.jsx) and renders them
export const renderTiles = (tiles) => (
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