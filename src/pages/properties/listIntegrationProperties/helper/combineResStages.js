// Helper code to identify time ranges that are shared between different reservation stages, so they can be displayed on a single tile on the UI (for weekly schedule)
export const groupTimeRangesWeekly = (scheduleObj) => {
  let groupedTimeRanges = {}; // { "monday 14:00-16:00": ["stage1", "stage2"], ... }

  // For each reservation stage, create an array of its time ranges as strings (e.g. "monday 14:00-16:00")
  let timeRangeStrings = {};
  for (let stage in scheduleObj) {
    let allTimeRanges = []
    for (let dayOfWeek in scheduleObj[stage]) {
      for (let i = 0; i < scheduleObj[stage][dayOfWeek].length; i += 2) {
        let timeRange = dayOfWeek.toLowerCase() + " " + scheduleObj[stage][dayOfWeek][i] + "-" + scheduleObj[stage][dayOfWeek][i + 1];
        allTimeRanges.push(timeRange);
      }
    }
    timeRangeStrings[stage] = allTimeRanges;
  }

  // For each time range string, determine which reservation stages share it, and add it in groupedTimeRanges
  for (let stage in timeRangeStrings) {
    for (let timeRange of timeRangeStrings[stage]) {
      
      if (!groupedTimeRanges[timeRange]) { // If we havent checked this time range yet

        // Determine which reservation stages share this time range
        let resStagesForThisTimeRange = [stage];
        for (let otherStage in timeRangeStrings) {
          if (otherStage !== stage) {
            if (timeRangeStrings[otherStage].includes(timeRange)) {
              resStagesForThisTimeRange.push(otherStage);
            }
          }
        }
        // Add to groupedTimeRanges
        groupedTimeRanges[timeRange] = resStagesForThisTimeRange;
      }
    }
  }

  return groupedTimeRanges;
}



// Helper code to identify time ranges that are shared between different reservation stages, so they can be displayed on a single tile on the UI (for monthly schedule)
export const groupTimeRangesMonthly = (scheduleObj) => {
  let groupedTimeRanges = {}; // { "on 07/20/2024 09:00-07/22/2024 17:00": ["stage1", "stage2"], ... }

  // For each reservation stage, create an array of its time ranges as strings (e.g. "on 07/20/2024 09:00-07/22/2024 17:00")
  let timeRangeStrings = {};
  for (let stage in scheduleObj) {
    let allTimeRanges = []
    for (let offOrOn in scheduleObj[stage]) {
      for (let i = 0; i < scheduleObj[stage][offOrOn].length; i += 2) {
        let timeRange = offOrOn.toLowerCase() + " " + scheduleObj[stage][offOrOn][i] + "-" + scheduleObj[stage][offOrOn][i + 1];
        allTimeRanges.push(timeRange);
      }
    }
    timeRangeStrings[stage] = allTimeRanges;
  }

  // For each time range string, determine which reservation stages share it, and add it in groupedTimeRanges
  for (let stage in timeRangeStrings) {
    for (let timeRange of timeRangeStrings[stage]) {
      
      if (!groupedTimeRanges[timeRange]) { // If we havent checked this time range yet

        // Determine which reservation stages share this time range
        let resStagesForThisTimeRange = [stage];
        for (let otherStage in timeRangeStrings) {
          if (otherStage !== stage) {
            if (timeRangeStrings[otherStage].includes(timeRange)) {
              resStagesForThisTimeRange.push(otherStage);
            }
          }
        }
        // Add to groupedTimeRanges
        groupedTimeRanges[timeRange] = resStagesForThisTimeRange;
      }
    }
  }

  return groupedTimeRanges;
}