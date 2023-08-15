const filterByPercentage = (array, percentageString) => {
  if (!Array.isArray(array) || typeof percentageString !== 'string') {
    throw new Error('Invalid input');
  }

  const percentageMatch = percentageString.match(/^([-+]?\d*\.?\d+)%$/);
  if (!percentageMatch) {
    throw new Error('Invalid percentage format');
  }

  const percentage = parseFloat(percentageMatch[1]) / 100;

  if (isNaN(percentage)) {
    throw new Error('Invalid percentage format');
  }

  return array.filter((item) => {
    if (item.percent_change_24h) {
      const percentChange = parseFloat(item.percent_change_24h);
      return !isNaN(percentChange) && percentChange >= percentage;
    }
    return false;
  });
};

const roundToHundredthPlace = (inputStr) => {
  const number = parseFloat(inputStr);
  if (isNaN(number)) {
    throw new Error('Invalid input: not a number');
  }
  const roundedNumber = Math.round(number * 100) / 100;
  const roundedStr = roundedNumber.toFixed(2);

  return roundedStr;
};

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds - minutes * 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export {
  filterByPercentage,
  roundToHundredthPlace,
  getCurrentTime,
  formatTime,
};
