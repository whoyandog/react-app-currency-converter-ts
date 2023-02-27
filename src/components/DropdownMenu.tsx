import { IDropdownMenu } from "../models";

export const DropdownMenu = ({ currencies, handleSetCurrentCurrencyDropdown }: IDropdownMenu) => {
    return (
        <ul className="block absolute w-50 h-96 top-12 shadow-2xl overflow-auto z-10">
            {currencies?.map((item, index) => 
                <li
                    className="hover:bg-gray-200"
                    key={index}
                    onClick={() => handleSetCurrentCurrencyDropdown(index)}
                >
                    {item[0]}
                </li>
            )}
        </ul>
    );
}