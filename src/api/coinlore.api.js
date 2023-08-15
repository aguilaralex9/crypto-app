import axios from 'axios';

export const coinsSearch = axios.create({
  baseURL: 'https://api.coinlore.net/api/tickers/?&limit=50',
});

export const singleCoinSearch = axios.create({
  baseURL: 'https://api.coinlore.net/api/ticker/',
});
