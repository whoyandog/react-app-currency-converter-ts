interface IBase {
     currencies: [string, number][] | undefined;
}

export interface IBlockProps extends IBase {
     handleToCalculateInput: (currency: [string, number], value: number) => void;
     currencyToConvert: [string, number];
     valueToConvert: number;
}

export interface IDropdownMenu extends IBase {
     handleSetCurrentCurrencyDropdown: (index: number) => void;
}