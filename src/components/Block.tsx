import { useState } from "react";
import { IBlockProps } from "../models";
import { DropdownMenu } from "./DropdownMenu";


export const Block = ({ handleToCalculateInput, currencyToConvert, valueToConvert, currencies }: IBlockProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentCurrencies, setCurrentCurrencies] = useState<string[]>(['RUB', 'USD', 'EUR', 'GBP']);
    const [activeCurrency, setActiveCurrency] = useState<[string, number]>(['RUB', 1]);

    const handleOnChangeInputValue = (value: React.ChangeEvent<HTMLInputElement>): void => {
        handleToCalculateInput([activeCurrency[0], activeCurrency[1]], parseInt(value.target.value));
    }
    const handleInputValueCalculator = (): string => {
        if (currencyToConvert[0] === activeCurrency[0]) {
            return valueToConvert.toString();
        }
        
        if (currencyToConvert[0] === 'RUB') {
            return `${converterFromRubles(valueToConvert, activeCurrency[1])}`;
        }
        if (activeCurrency[0] === 'RUB') {
            return `${converterToRubles(valueToConvert, currencyToConvert[1])}`;
        }
        if (currencyToConvert[0] !== 'RUB' && activeCurrency[0] !== 'RUB') {
            return `${converterFromRubles(converterToRubles(valueToConvert, currencyToConvert[1]), activeCurrency[1])}`;
        }
 
        return 'NaN';
    }
    const handleOpen = (): void => { setIsOpen(!isOpen) };
    const handleSetCurrentCurrencyDropdown = (index: number): void => {
        let currency: [string, number] = currencies !== undefined ? [currencies[index][0], currencies[index][1]] : ['', 0];
        if (currency) {
            if (!currentCurrencies.includes(currency[0])) {
                let array: any[] = currentCurrencies;
                array.splice(array.length - 1, 1);
                array.unshift(currency[0]);
                setCurrentCurrencies(array);
            }
            setActiveCurrency(currency);
        }
    };
    const handleSetCurrentCurrency = (currencyName: string) => {
        let currency: [string, number] = currencies?.find(item => item[0] === currencyName) as [string, number];
        setActiveCurrency(currency);
    }

    const converterToRubles = (value: number, currency: number): number => value / currency;
    const converterFromRubles = (value: number, currency: number): number => value * currency;

    let currenciesBtnStyle: string = "inline-flex px-4 py-2 cursor-pointer justify-center flex-1 hover:bg-neutral-100 active:bg-neutral-200 last-of-type:inline-flex ";

    return (
        <div>
            <ul className="flex list-none p-0 m-0 border-2 border-black-100 overflow-visible">
                {
                    currentCurrencies.map((cur) => 
                        <li className={cur === activeCurrency[0] 
                                ? 'active ' + currenciesBtnStyle + ' border-r-2'
                                : currenciesBtnStyle + ' border-r-2'} 
                            key={cur}
                            onClick={() => (handleSetCurrentCurrency(cur))}
                        >
                        {cur}
                        </li>
                    )}  
                <li 
                    className={currenciesBtnStyle + "w-16 h-11 relative overflow-visible"} 
                    onClick={handleOpen}
                >
                    <svg className="w-4 h-4" width="30px" height="30px" viewBox="0 0 50 50">
                        <rect fill="none" height="50" width="50" />
                        <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
                    </svg>

                    {isOpen && <DropdownMenu currencies={currencies} handleSetCurrentCurrencyDropdown={handleSetCurrentCurrencyDropdown} />}

                </li>
            </ul>
        
            <input
                className="border-2 border-neutral-100 text-3xl font-bold p-4 tracking-wide outline-none mt-4 w-full"
                type="number"
                placeholder="0"
                value={handleInputValueCalculator()}
                onChange={(value) => handleOnChangeInputValue(value)}
            />

        </div>
    );
};