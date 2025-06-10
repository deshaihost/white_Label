// This file contains functions to fetch and handle the statistics data, so that the jsx can be more focused on managing the UI

import axios from "axios";
import ToastHandle from "../../helper/ToastMessage";

// Sample for how the data should be structured for a the line graph, for a histogram, and for a metric tile
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

// Returns for the message timing data if data is insufficient
const timingHistoNoData = [
  {
    identifier: 'Total',
    title: 'Timing of messages received (by hour of day - average)',
    data: [] // this causes the tile to display "No Data"
  },
  {
    identifier: 'By Weekday',
    title: 'Timing of messages received (by weekday - average)',
    data: []
  }
];

// YYYY-MM-DD to e.g. 'Sep 9, 2021'
export const formatDateToReadable = (dateString) => {
  if (!dateString) return '';

  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Get the statistics. FYI, this endpoint uses POST type to support more complex queries
export const callGetStatisticsApi = async (queryData) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    const body_data = {...queryData};
    const response = await axios.post( `${baseUrl}/get_statistics`, body_data, config );

    if (response.status === 200) { }
    else { ToastHandle(response?.data?.error, "danger"); }
    return response.data;
  } catch (error) {
    ToastHandle("Unable to fetch data: Internal server error", "danger");
    return { error: "Unable to fetch data: Internal server error" };
  }
};

function createMessageTimingData(guest_message_received_times, startDate, endDate) {
  // If startDate or endDate is not provided, return all zeros
  if (!startDate || !endDate) {
    return timingHistoNoData;
  }

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i.toString()); // Create hours from '0' to '23'

  let totalMessagesPerDay = {}; // To keep track of total messages per day
  let totalMessagesAllDays = {}; // To keep track of total messages for each hour across all days

  // Initialize totalMessagesAllDays with 0 for all 24 hours
  hoursOfDay.forEach(hour => {
    totalMessagesAllDays[hour] = 0;
  });

  // Initialize totalMessagesPerDay with 0 for all days
  daysOfWeek.forEach(day => {
    totalMessagesPerDay[day.toLowerCase()] = 0;
  });

  // Function to parse date strings as UTC dates
  function parseDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }

  // Parse startDate and endDate as UTC dates
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  let totalDays = 0;
  let weekdayCounts = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };

  let currentDate = new Date(start.getTime());

  // Iterate over each day in the date range
  while (currentDate <= end) {
    totalDays++;
    const dayIndex = (currentDate.getUTCDay() + 6) % 7; // Map Sunday (0) to 6, Monday (1) to 0, etc.
    const dayKey = daysOfWeek[dayIndex].toLowerCase();
    weekdayCounts[dayKey]++;
    // Move to the next day
    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  }

  // Create individual histograms for each day of the week
  const dayHistograms = daysOfWeek.map(day => {
    const dayKey = day.toLowerCase();
    const messagesPerHour = guest_message_received_times[dayKey] || {}; // Ensure we have an object

    // Initialize messagesPerHour for missing hours
    hoursOfDay.forEach(hour => {
      if (!messagesPerHour.hasOwnProperty(hour)) {
        messagesPerHour[hour] = 0;
      }
    });

    // Sum total messages for this day
    const totalMessages = Object.values(messagesPerHour).reduce((acc, val) => acc + val, 0);
    totalMessagesPerDay[dayKey] = totalMessages;

    // Accumulate total messages for each hour across all days
    hoursOfDay.forEach(hour => {
      totalMessagesAllDays[hour] += messagesPerHour[hour];
    });

    // Calculate average messages per hour for this day
    const dayCount = weekdayCounts[dayKey] || 1; // Avoid division by zero

    return {
      identifier: day,
      title: `Timing of messsages received on ${day} (average)`,
      data: hoursOfDay.map(hour => ({
        name: hour,
        value: parseFloat((messagesPerHour[hour] / dayCount).toFixed(2)) // Average messages per hour for this day
      }))
    };
  });

  // Adjust totalMessagesPerDay to average per day
  Object.keys(totalMessagesPerDay).forEach(dayKey => {
    const dayCount = weekdayCounts[dayKey] || 1;
    totalMessagesPerDay[dayKey] = totalMessagesPerDay[dayKey] / dayCount;
  });

  // Adjust totalMessagesAllDays to average per day
  const totalDaysAdjusted = totalDays || 1; // Avoid division by zero
  hoursOfDay.forEach(hour => {
    totalMessagesAllDays[hour] = totalMessagesAllDays[hour] / totalDaysAdjusted;
  });

  // Create the histogram for average messages across all days
  const totalHistogram = {
    identifier: 'Total',
    title: 'Timing of messages received (by hour of day - average)',
    data: hoursOfDay.map(hour => ({
      name: hour,
      value: parseFloat(totalMessagesAllDays[hour].toFixed(2))
    }))
  };

  // Create the histogram for average messages per day of the week
  const daysOfWeekHistogram = {
    identifier: 'By Weekday',
    title: 'Timing of messages received (by weekday - average)',
    data: daysOfWeek.map(day => {
      const dayKey = day.toLowerCase();
      return {
        name: day,
        value: parseFloat(totalMessagesPerDay[dayKey].toFixed(2))
      };
    })
  };

  // Combine all histograms
  return [totalHistogram, daysOfWeekHistogram, ...dayHistograms];
}



// Create the data structure for the total messages responded tile, using the response times data.
// This is NO LONGER USED since the data only includes responses (not all messages) - replaced by below funct which uses the all messages sent data
function formatMessagesRespondedData(responseTimes) {
  const { host_response_times, hostbuddy_response_times, not_responded_in_2h } = responseTimes;

  // Calculate total responses
  // UPDATE 4-22-2025 - exclude not_responded_in_2h from the total responses, since this confuses people
  //const totalResponses = host_response_times.count + hostbuddy_response_times.count + not_responded_in_2h;
  const totalResponses = host_response_times.count + hostbuddy_response_times.count;

  // Calculate proportions
  const hostProportion = (host_response_times.count / totalResponses) * 100;
  const hostbuddyProportion = (hostbuddy_response_times.count / totalResponses) * 100;
  //const notRespondedProportion = (not_responded_in_2h / totalResponses) * 100;

  // Create the metric data structure for Messages Processed
  const messagesProcessedData = {
    identifier: 'Totals',
    title: 'Guest Messages Responded',
    data: [
      { number: host_response_times.count, text: "By Host" },
      { number: hostbuddy_response_times.count, text: "By HostBuddy" },
      //{ number: not_responded_in_2h, text: "Not Responded (Within 2h)" }
    ]
  };

  // Create the metric data structure for Response Time Proportions
  const responseProportionsData = {
    identifier: 'Percentages',
    title: 'Guest Messages Responded',
    data: [
      { number: `${hostProportion.toFixed(1)}%`, text: "By Host" },
      { number: `${hostbuddyProportion.toFixed(1)}%`, text: "By HostBuddy" },
      //{ number: `${notRespondedProportion.toFixed(1)}%`, text: "Not Responded (Within 2h)" }
    ]
  };

  // Return the final metric data set
  return [messagesProcessedData, responseProportionsData];
}

// From the total messages sent data: create the data structure for the total messages sent tile
function formatMessagesSentData(messagesSent) {
  const { host, hostbuddy } = messagesSent;

  // Calculate total responses
  const totalResponses = host + hostbuddy;
  
  // Calculate proportions
  const hostProportion = (host / totalResponses) * 100;
  const hostbuddyProportion = (hostbuddy / totalResponses) * 100;

  // Create the metric data structure for Messages Sent
  const messagesProcessedData = {
    identifier: 'Totals',
    title: 'Messages Sent (Total)',
    data: [
      { number: host, text: "By Host" },
      { number: hostbuddy, text: "By HostBuddy" }
    ]
  };

  // Create the metric data structure for Messages Sent Proportions
  const responseProportionsData = {
    identifier: 'Percentages',
    title: 'Messages Sent',
    data: [
      { number: `${hostProportion.toFixed(1)}%`, text: "By Host" },
      { number: `${hostbuddyProportion.toFixed(1)}%`, text: "By HostBuddy" }
    ]
  };

  // Return the final metric data set
  return [messagesProcessedData, responseProportionsData];
}


// Given the same host / hostbuddy response times data as above, create the data structure for the tile that shows host vs hostbuddy response times
function formatResponseTimes(responseTimes) {
  // Extract average times from responseTimes object
  const hostAvgTime = responseTimes.host_response_times.average / 60; // Convert to minutes
  const hostBuddyAvgTime = responseTimes.hostbuddy_response_times.average / 60; // Convert to minutes

  // Format the data according to the template
  const formattedData = [
    {
      identifier: 'Average Response Times',
      title: 'Average Response Times (minutes)',
      data: [
        { number: hostBuddyAvgTime.toFixed(1), text: "HostBuddy" },
        { number: hostAvgTime.toFixed(1), text: "Other Senders" }
      ]
    }
  ];

  return formattedData;
}

// Given sentiment data from the API, create the data structure for the tile that shows this
function formatSentimentData(sentimentData) {
  // Extract values from sentimentData for each sentiment category
  const categories = ['current', 'future', 'inquiry', 'past'];

  // Initialize the result structure
  const metricDataSets = [];

  // Helper function to create a structure for each category
  function createCategoryData(category) {
    const negativeCount = sentimentData.negative[category];
    const neutralCount = sentimentData.neutral[category];
    const positiveCount = sentimentData.positive[category];
    const total = negativeCount + neutralCount + positiveCount;

    const negativePercentage = ((negativeCount / total) * 100).toFixed(1);
    const neutralPercentage = ((neutralCount / total) * 100).toFixed(1);
    const positivePercentage = ((positiveCount / total) * 100).toFixed(1);

    return {
      identifier: `${category.charAt(0).toUpperCase() + category.slice(1)} Guests`,
      title: `Sentiment for ${category.charAt(0).toUpperCase() + category.slice(1)} Guests`,
      data: [
        { number: isNaN(positivePercentage) ? "0" : `${positivePercentage}%`, text: 'Positive' },
        { number: isNaN(neutralPercentage) ? "0" : `${neutralPercentage}%`, text: 'Neutral' },
        { number: isNaN(negativePercentage) ? "0" : `${negativePercentage}%`, text: 'Negative' }
      ]
    };
  }

  // Create data structures for 'current', 'future', 'past', and 'inquiry'
  categories.forEach(category => {
    metricDataSets.push(createCategoryData(category));
  });

  // Create aggregated sentiment data (sum of current, future, inquiry, and past for each sentiment)
  const totalNegative = sentimentData.negative.current + sentimentData.negative.future + sentimentData.negative.inquiry + sentimentData.negative.past;
  const totalNeutral = sentimentData.neutral.current + sentimentData.neutral.future + sentimentData.neutral.inquiry + sentimentData.neutral.past;
  const totalPositive = sentimentData.positive.current + sentimentData.positive.future + sentimentData.positive.inquiry + sentimentData.positive.past;
  const totalAggregated = totalNegative + totalNeutral + totalPositive;

  const negativeAggregatedPercentage = ((totalNegative / totalAggregated) * 100).toFixed(1);
  const neutralAggregatedPercentage = ((totalNeutral / totalAggregated) * 100).toFixed(1);
  const positiveAggregatedPercentage = ((totalPositive / totalAggregated) * 100).toFixed(1);

  const aggregatedSentiment = {
    identifier: 'All Guests',
    title: 'Guest Sentiment',
    data: [
      { number: isNaN(positiveAggregatedPercentage) ? "0" : `${positiveAggregatedPercentage}%`, text: 'Positive' },
      { number: isNaN(neutralAggregatedPercentage) ? "0" : `${neutralAggregatedPercentage}%`, text: 'Neutral' },
      { number: isNaN(negativeAggregatedPercentage) ? "0" : `${negativeAggregatedPercentage}%`, text: 'Negative' }
    ]
  };

  // Add the aggregated data structure to the beginning of the result array
  metricDataSets.unshift(aggregatedSentiment);

  return metricDataSets;
}

// Given action item data from the API: create the data structure for the line graph, for EITHER items received or closed (depending on the parameter)
function formatActionItemGraphData(actionItemData, actionType) {
  const categories = ['CLEANLINESS', 'GUEST REQUESTS', 'MAINTENANCE', 'RESERVATION CHANGES', 'OTHER/UNKNOWN'];
  
  // Initialize an empty array to hold the datasets
  const dataSets = [];

  // Initialize the graph data for the total category
  const totalGraphData = {
    identifier: 'All Categories',
    title: `Action Items ${actionType === 'action_items_received' ? 'Received' : 'Closed'}`,
    data: []
  };

  // Loop through each date to build the total graph data
  for (const [date, actionItemInfo] of Object.entries(actionItemData)) {
    // Calculate the total count for the given actionType across all categories
    const totalCount = categories.reduce((sum, category) => sum + (actionItemInfo[actionType][category] || 0), 0);
    
    // Format the date as 'M/D' (e.g., '9/9', '9/10')
    const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });

    // Push the formatted date and the total count into the total graph data
    totalGraphData.data.push({
      name: formattedDate,
      value: totalCount
    });
  }

  // Add the total graph data to the datasets array first
  dataSets.push(totalGraphData);

  // Loop through each category to build the graph data for each one
  categories.forEach(category => {
    const graphData = {
      identifier: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
      title: `Action Items - ${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}`,
      data: []
    };

    // Loop through the action item data to fill in the graph data
    for (const [date, actionItemInfo] of Object.entries(actionItemData)) {
      // Extract the relevant action item counts (received or closed) based on the actionType parameter
      const count = actionItemInfo[actionType][category] || 0;
      
      // Format the date as 'M/D' (e.g., '9/9', '9/10')
      const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });

      // Push the formatted date and the count into the graph data
      graphData.data.push({
        name: formattedDate,
        value: count
      });
    }

    // Add the graph data for this category to the datasets array
    dataSets.push(graphData);
  });

  return dataSets;
}

// Given the same action item data as above: create the data structure for the metric tiles that show the action items received and closed
function convertActionItemsToMetricData(actionItemData) {
  const categories = ['CLEANLINESS', 'GUEST REQUESTS', 'MAINTENANCE', 'RESERVATION CHANGES', 'OTHER/UNKNOWN'];
  
  const categoryMetrics = [];
  let totalReceived = 0; // Total num of action items received in this time range
  let totalClosedOfReceived = 0; // Total num of action items received in this time range that were ever closed, regardless of when they were closed. This can be no greater than receivedTotal. Used to calculate closure rate
  let totalClosed = 0; // Total num of action items closed in this time range, regardless of when they were received

  // Loop through each category to calculate totals
  categories.forEach(category => {
    let receivedTotal = 0;
    let closedOfReceivedTotal = 0;
    let closedTotal = 0;

    // Sum up action items for each day
    for (const date in actionItemData) {
      receivedTotal += actionItemData[date]['action_items_received'][category];
      closedOfReceivedTotal += actionItemData[date]['action_items_closed_of_received'][category];
      closedTotal += actionItemData[date]['action_items_closed'][category];
    }

    totalReceived += receivedTotal;
    totalClosedOfReceived += closedOfReceivedTotal;
    totalClosed += closedTotal;

    const closureRate = receivedTotal > 0 ? (closedOfReceivedTotal / receivedTotal * 100).toFixed(1) : 0;

    categoryMetrics.push({
      identifier: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
      title: `Action Items - ${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}`,
      data: [
        { number: receivedTotal, text: "Received" },
        { number: closedTotal, text: "Closed" },
        { number: closureRate, text: "Closure Rate (%)" }
      ]
    });
  });

  // Calculate overall totals
  const overallClosureRate = totalReceived > 0 ? (totalClosedOfReceived / totalReceived * 100).toFixed(1) : 0;

  const totalMetrics = {
    identifier: 'All Categories',
    title: 'Action Items Received and Closed',
    data: [
      { number: totalReceived, text: "Received" },
      { number: totalClosed, text: "Closed" },
      { number: overallClosureRate, text: "Closure Rate (%)" }
    ]
  };

  return [totalMetrics, ...categoryMetrics];
}

// Given the upsell data from the API: create the data structure for the metric tiles that show the upsell metrics
// Given upsell data from the API, create metric tiles showing:
// - For each upsell type: number of messages sent, number accepted, acceptance rate, and revenue (if available)
// - A total tile combining all upsells with the same metrics
// Revenue is only shown if all upsells have the same currency and there is nonzero revenue
function formatUpsellMetrics(retrievedUpsellsStatistics) {
  const totals = retrievedUpsellsStatistics.totals;
  let metricDataSets = [];
  
  // Track totals across all upsells for the summary tile
  let totalMessagesSent = 0;
  let totalAccepted = 0;
  let totalRevenue = 0;
  let totalCurrency = null;
  let allUpsellsHaveCurrency = true;  // Flag to track if all upsells use the same currency

  // Process each upsell type separately
  for (const upsellId in totals) {
    const upsell = totals[upsellId];
    const { num_messages, num_accepted, source, total_value, currency } = upsell;

    // Accumulate totals for the summary tile
    totalMessagesSent += num_messages;
    totalAccepted += num_accepted;

    // Handle revenue calculations and currency consistency checking
    if (total_value && currency) {
      totalRevenue += total_value;
      // Track the first currency we see and ensure all subsequent ones match
      if (!totalCurrency) {
        totalCurrency = currency;
      } else if (totalCurrency !== currency) {
        allUpsellsHaveCurrency = false;  // Mixed currencies found, can't show total revenue
      }
    } else {
      allUpsellsHaveCurrency = false;  // Missing currency/value, can't show total revenue
    }

    // Calculate acceptance rate for this upsell type
    const acceptanceRate = num_messages > 0 ? ((num_accepted / num_messages) * 100).toFixed(1) : "0.0";
    
    // Create metric tile data for this upsell type
    const dataItem = {
      identifier: source,
      title: `Upsells - ${source}`,
      data: [
        { number: num_messages, text: "Messages sent" },
        { number: num_accepted, text: "Acceptances detected" },
        { number: `${acceptanceRate}%`, text: "Detected acceptance rate" }
      ]
    };

    // Only add revenue if both value and currency are present
    if (total_value && currency) {
      dataItem.data.push({ number: `${total_value.toFixed(2)} ${currency}`, text: "Revenue earned" });
    }

    metricDataSets.push(dataItem);
  }

  // Calculate total acceptance rate for summary tile
  const totalAcceptanceRate = totalMessagesSent > 0 ? ((totalAccepted / totalMessagesSent) * 100).toFixed(1) : "0.0";
  
  // Create summary tile showing totals across all upsell types
  const totalDataItem = {
    identifier: 'All Upsells',
    title: 'Upsells - Total',
    data: [
      { number: totalMessagesSent, text: "Messages sent" },
      { number: totalAccepted, text: "Acceptances detected" },
      { number: `${totalAcceptanceRate}%`, text: "Detected acceptance rate" }
    ]
  };

  // Only add total revenue if all upsells use the same currency and there is revenue to show
  if (allUpsellsHaveCurrency && totalRevenue > 0 && totalCurrency) {
    totalDataItem.data.push({ number: `${totalRevenue.toFixed(2)} ${totalCurrency}`, text: "Revenue earned" });
  }

  // Put the summary tile first in the array
  metricDataSets.unshift(totalDataItem);

  return metricDataSets;
}

// Get the statistics from the API, and populate the data structures to be used for the charts
export const getStatisticsData = async (setRawApiReturn, setApiStatisticsData, setDataLoading, queryData={}) => {
  setDataLoading(true);
  const response = await callGetStatisticsApi(queryData);
  if (response.error) { return { error: response.error }; }
  setRawApiReturn(response);
  const retrievedStatistics = response?.statistics?.totals;
  const day_by_day_data = response?.statistics?.day_by_day; // this has all the data that's graphable over days
  const startDate = response?.statistics?.start_date;
  const endDate = response?.statistics?.end_date;

  const retrievedUpsellsStatistics = response?.statistics?.upsell_data;

  let messageTimingData, totalMessagesSent, totalMessagesResponded, responseTimes, sentimentMetrics, actionItemMetrics, actionItemsReceived, actionItemsClosed, upsellMetrics;

  try { // Message received timing (bar chart)
    messageTimingData = createMessageTimingData(retrievedStatistics.guest_message_received_times, startDate, endDate);
  } catch {}

  try { // Host / hostbuddy total messages sent (metric tiles)
    const messagesSent = retrievedStatistics.messages_sent;
    totalMessagesSent = formatMessagesSentData(messagesSent);
  } catch {}

  try { // Host / HostBuddy total guest messages responded (metric tiles)
    const responseTimesData = { host_response_times:retrievedStatistics.host_response_times, hostbuddy_response_times:retrievedStatistics.hostbuddy_response_times, not_responded_in_2h:retrievedStatistics.not_responded_in_2h };
    totalMessagesResponded = formatMessagesRespondedData(responseTimesData);
  } catch {}

  try { // Host vs HostBuddy response times (metric tiles)
    const responseTimesData = { host_response_times:retrievedStatistics.host_response_times, hostbuddy_response_times:retrievedStatistics.hostbuddy_response_times, not_responded_in_2h:retrievedStatistics.not_responded_in_2h };
    responseTimes = formatResponseTimes(responseTimesData);
  } catch {}

  try { // Sentiment (metric tiles)
    const sentimentData = retrievedStatistics.sentiment;
    sentimentMetrics = formatSentimentData(sentimentData);
  } catch (error) {}

  try { // Action items received and closed (metric tiles)
    actionItemMetrics = convertActionItemsToMetricData(day_by_day_data);
  } catch (error) {}

  try { // Action items received and closed (bar graphs)
    actionItemsReceived = formatActionItemGraphData(day_by_day_data, 'action_items_received');
  } catch (error) {}

  try { // Action items received and closed (bar graphs)
    actionItemsClosed = formatActionItemGraphData(day_by_day_data, 'action_items_closed');
  } catch (error) {}

  try { // Upsell tiles: number of upsell messages sent and accepted
    upsellMetrics = formatUpsellMetrics(retrievedUpsellsStatistics);
  } catch (error) {}

  setApiStatisticsData({ messageTimingData, totalMessagesSent, totalMessagesResponded, responseTimes, sentimentMetrics, actionItemsReceived, actionItemMetrics, actionItemsClosed, upsellMetrics });
  setDataLoading(false);
}