import { useEffect, useState } from "react";
import { Block } from "./components/Block";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currencies, setCurrencies] = useState<[string, number][]>();
  const [currencyToConvert, setCurrencyToConvert] = useState<[string, number]>(['RUB', 1]);
  const [valueToConvert, setValueToConvert] = useState<number>(1);

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(true);
        setCurrencies([['RUB', 1], ...Object.entries<number>(json.rates)]);
      })
      .catch((error) => {
        setIsLoading(false);
        console.warn(error);
        alert('Ошибка при загрузке данных');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleToCalculateInput = (data: [string, number], value: number) => {
    setCurrencyToConvert(data);
    setValueToConvert(value);
  }

  const Loader = () => {
    return !isLoading 
      ? 
        <div className="grid grid-cols-1 grid-rows-2 gap-4 w-3/5 m-auto bg-white p-8 shadow-[0_10px_20px_rgba(0,0,0,0.05)] xl:grid-cols-2">
          <Block handleToCalculateInput={handleToCalculateInput} currencyToConvert={currencyToConvert} valueToConvert={valueToConvert} currencies={currencies} />
          <Block handleToCalculateInput={handleToCalculateInput} currencyToConvert={currencyToConvert} valueToConvert={valueToConvert} currencies={currencies} />
          <Block handleToCalculateInput={handleToCalculateInput} currencyToConvert={currencyToConvert} valueToConvert={valueToConvert} currencies={currencies} />
          <Block handleToCalculateInput={handleToCalculateInput} currencyToConvert={currencyToConvert} valueToConvert={valueToConvert} currencies={currencies} />
        </div>
      : 
        <div className="w-3/5 m-auto bg-white p-8 shadow-[0_10px_20px_rgba(0,0,0,0.05)] text-center">
          <span className="font-bold">
            Загрузка актуального курса валют
          </span>
        </div>
  }

  return (
    <>
      {Loader()}
    </>
  );
}

export default App;
