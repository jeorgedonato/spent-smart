
const numberWithCommas = num => {
  return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default numberWithCommas;