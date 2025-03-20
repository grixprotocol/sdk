// import { TradeBoardData } from "src/methods/getOptionsMarketBoard/type.js";
// import { OptionResponse } from "./type.js";

// export function formatOptionsResponse(result: OptionResponse): string {
// 	if (!result.options || result.options.length === 0) {
// 		return `No options data available for ${result.asset} ${result.optionType} options.`;
// 	}

// 	// First group by expiry
// 	const groupedByExpiry = result.options.reduce((acc, opt) => {
// 		if (!acc[opt.expiry]) {
// 			acc[opt.expiry] = [];
// 		}
// 		acc[opt.expiry].push(opt);
// 		return acc;
// 	}, {} as Record<string, any[]>);

// 	let response = "Available Options:\n";

// 	Object.entries(groupedByExpiry).forEach(([expiry, options]) => {
// 		response += `\nExpiry: ${expiry}\n`;

// 		// Group by symbol within each expiry
// 		const groupedBySymbol = options.reduce((acc, option) => {
// 			const date = new Date(option.expiry);
// 			const day = date.getDate().toString().padStart(2, "0");
// 			const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
// 			const year = date.getFullYear().toString().slice(-2);
// 			const symbol = `${result.asset}-${day}${month}${year}-${option.strike
// 				}-${option.type.charAt(0)}`;

// 			if (!acc[symbol]) {
// 				acc[symbol] = [];
// 			}
// 			acc[symbol].push(option);
// 			return acc;
// 		}, {} as Record<string, TradeBoardData[]>);

// 		// Format each symbol group
// 		(Object.entries(groupedBySymbol) as [string, TradeBoardData[]][]).forEach(
// 			([symbol, symbolOptions]) => {
// 				response += `\n${symbol}\n`;
// 				symbolOptions.forEach((option) => {
// 					response += `Protocol: ${option.protocol}\n`;
// 					response += `Available: ${option.availableAmount} contracts\n`;
// 					response += `Price: $${option.contractPrice.toLocaleString()}\n`;
// 				});
// 				response += `------------------------\n`;
// 			}
// 		);
// 	});

// 	return response.trim();
// }
