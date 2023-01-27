const myHeaders = new Headers();
myHeaders.append("apikey", "T8HqjLQbQlZzQwyWiUaClefMKSte89at");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};
const base = "PLN";
const symbols = ["EUR", "USD", "GBP"];

const fetchExchangeRates = async () =>
  fetch(
    `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base=${base}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.log(error, "Returning fallback values");
      return {
        success: false,
        error: error,
        timestamp: 1674077523,
        base: "PLN",
        date: "2023-01-18",
        rates: {
          EUR: 0.211971,
          USD: 0.228836,
          GBP: 0.185404,
        },
      };
    });

export default fetchExchangeRates;
