export interface OptionResponse {
  asset: string;
  optionType: string;
  formattedOptions: string;
  options: {
    optionId: number;
    expiry: string;
    strike: number;
    price: number;
    protocol: string;
    available: number;
    type: string;
  }[];
  timestamp: number;
}
