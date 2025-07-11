// week-2/frontend/app/utils/binanceApi.ts

const BASE_URL = "https://api.binance.com/api/v3";

/**
 * Fetches 24hr ticker price change statistics for all symbols.
 */
export async function fetchAllTickers() {
    const res = await fetch(`${BASE_URL}/ticker/24hr`);
    if (!res.ok) throw new Error("Failed to fetch tickers");
    return res.json();
}

/**
 * Fetches 24hr ticker price change statistics for a specific symbol.
 * @param symbol e.g. "BTCUSDT"
 */
export async function fetchTicker(symbol: string) {
    const res = await fetch(`${BASE_URL}/ticker/24hr?symbol=${symbol}`);
    if (!res.ok) throw new Error("Failed to fetch ticker");
    return res.json();
}

/**
 * Fetches order book (depth) for a symbol.
 * @param symbol e.g. "BTCUSDT"
 * @param limit default 20
 */
export async function fetchOrderBook(symbol: string, limit = 20) {
    const res = await fetch(`${BASE_URL}/depth?symbol=${symbol}&limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch order book");
    return res.json();
}

/**
 * Fetches recent trades for a symbol.
 * @param symbol e.g. "BTCUSDT"
 * @param limit default 20
 */
export async function fetchRecentTrades(symbol: string, limit = 20) {
    const res = await fetch(`${BASE_URL}/trades?symbol=${symbol}&limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch trades");
    return res.json();
}

/**
 * Fetches candlestick (kline) data for a symbol.
 * @param symbol e.g. "BTCUSDT"
 * @param interval e.g. "1m", "5m", "1h"
 * @param limit default 100
 */
export async function fetchKlines(symbol: string, interval = "1m", limit = 100) {
    const res = await fetch(`${BASE_URL}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch klines");
    return res.json();
}

/**
 * Fetches exchange info (all symbols, filters, etc).
 */
export async function fetchExchangeInfo() {
    const res = await fetch(`${BASE_URL}/exchangeInfo`);
    if (!res.ok) throw new Error("Failed to fetch exchange info");
    return res.json();
}
