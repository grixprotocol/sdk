export const OPENAI_API_URL="https://api.openai.com/v1/chat/completions"


export type ProtocolObject = {
    protocolName: string;
    label: string;
    url: string;
    isExecution?: boolean;
    isZeroDay?: boolean;
  };
  
  export const protocolsArrayData: ProtocolObject[] = [
    {
      protocolName: "derive",
      label: "Derive",
      url: "https://www.derive.xyz",
    },
    {
      protocolName: "rysk",
      label: "Rysk",
      url: "https://app.rysk.finance",
    },
    {
      protocolName: "synquote",
      label: "Synquote",
      url: "https://app.synquote.com",
    },
    {
      protocolName: "aevo",
      label: "Aevo",
      url: "https://app.aevo.xyz",
    },
    {
      protocolName: "premia",
      label: "Premia",
      isExecution: true,
      url: "https://app.premia.blue",
    },
    {
      protocolName: "hegic",
      label: "Hegic",
      url: "https://www.hegic.co",
    },
    {
      protocolName: "moby",
      label: "Moby",
      isExecution: true,
      url: "https://app.moby.trade/",
    },
    {
      protocolName: "sdx",
      label: "SDX",
      url: "https://app.sdx.markets",
    },
    {
      protocolName: "stryke",
      label: "Stryke",
      isZeroDay: true,
      url: "https://www.stryke.xyz/en",
    },
    {
      protocolName: "thetanuts",
      label: "Thetanuts",
      url: "https://app.thetanuts.finance",
    },
    {
      protocolName: "optionBlitz",
      label: "OptionBlitz",
      url: "https://app.optionblitz.co",
    },
    {
      protocolName: "ithaca",
      label: "Ithaca",
      url: "https://app.ithacaprotocol.io",
    },
    {
      protocolName: "dopex",
      label: "Stryke",
      url: "https://www.stryke.xyz/en",
    },
    {
      protocolName: "zomma",
      label: "Zomma",
      url: "https://www.zomma.pro",
    },
    {
      protocolName: "deribit",
      label: "Deribit",
      url: "https://www.deribit.com",
    },
  ];