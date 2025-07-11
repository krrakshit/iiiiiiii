"use client";
import { useEffect, useState } from "react";
import { fetchAllTickers } from "../utils/binanceApi";
import Image from "next/image";

function formatSymbol(symbol: string) {
    // Try to split symbol into base/quote (e.g., BTCUSDT -> BTC/USDT)
    // This is a simple heuristic for common quote assets
    const quotes = ["USDT", "BUSD", "USDC", "BTC", "ETH", "BNB", "TRY", "EUR", "BRL"];
    for (const q of quotes) {
        if (symbol.endsWith(q)) {
            return `${symbol.slice(0, -q.length)}/${q}`;
        }
    }
    return symbol;
}

function getBaseAsset(symbol: string) {
    const quotes = ["USDT", "BUSD", "USDC", "BTC", "ETH", "BNB", "TRY", "EUR", "BRL"];
    for (const q of quotes) {
        if (symbol.endsWith(q)) {
            return symbol.slice(0, -q.length);
        }
    }
    return symbol;
}


export default function MarketsPage() {
    const [tickers, setTickers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        let interval: NodeJS.Timeout;

        const fetchData = () => {
            fetchAllTickers()
                .then((data) => {
                    if (isMounted) {
                        const sorted = [...data]
                            .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
                            .slice(0, 20);
                        setTickers(sorted);
                    }
                })
                .finally(() => {
                    if (isMounted) setLoading(false);
                });
        };

        fetchData();
        interval = setInterval(fetchData, 1000); // refresh every 1 second

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4 bg-black">Top 20 Markets</h1>
            <table className="min-w-full border bg-black border-gray-300 rounded overflow-hidden">
                <thead className="bg-black">
                    <tr>
                        <th className="px-4 py-2 text-left">Symbol</th>
                        <th className="px-4 py-2 text-right">Last Price</th>
                        <th className="px-4 py-2 text-right">24h Change</th>
                        <th className="px-4 py-2 text-right">Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {tickers.map((ticker) => {
                        const change = parseFloat(ticker.priceChangePercent);
                        const baseAsset = getBaseAsset(ticker.symbol);
                        return (
                            <tr key={ticker.symbol} className="border-t">
                                <td className="px-4 py-2 font-mono flex items-center gap-2">
                                    {formatSymbol(ticker.symbol)}
                                </td>
                                <td className="px-4 py-2 text-right">{parseFloat(ticker.lastPrice).toLocaleString()}</td>
                                <td
                                    className={`px-4 py-2 text-right font-semibold ${
                                        change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : ""
                                    }`}
                                >
                                    {change > 0 ? "+" : ""}
                                    {change.toFixed(2)}%
                                </td>
                                <td className="px-4 py-2 text-right">{parseFloat(ticker.quoteVolume).toLocaleString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}