import { getCurrency } from "@/action/currency";
import { Currencies } from "@/types/countries";
import { ExchangeData } from "@/types/currency";
import { Coins, Money } from "@phosphor-icons/react/dist/ssr";



interface currencyProps {
    currencies: Currencies
}

const Currency = async ({ currencies }: currencyProps) => {


    const currency: ExchangeData = await getCurrency();

    function renderCurrencies(currencies: Currencies) {
        if (!currencies) {
            return <p>None</p>;
        }

        return (
            <div>
                {Object.entries(currencies).map(([currencyCode, currency]) => (
                    <div key={currencyCode}>
                        <p> {currency.symbol}{" "}{currency.name}{" "}{`(${currencyCode})`}</p>
                    </div>
                ))}
            </div>
        );
    };

    function findCurrencyInfo(currencyCode: string, currencySymbol: string[], exchangeData: ExchangeData | undefined) {
        const conversion_rates = exchangeData?.conversion_rates;

        if (!conversion_rates || !conversion_rates[currencyCode]) {
            return { jsx: <p>No currency found for code {currencyCode}</p>, currencyRate: 0 }
        };

        const currencyRate = Number(conversion_rates[currencyCode]);


        return {
            jsx: <div>1 USD = {currencySymbol?.[0]} {currencyRate} </div>,
            currencyRate: currencyRate
        };
    };

    function extractCurrencyCode(currencies: Currencies) {

        // Check if currencies is defined and has keys
        if (!currencies || Object.keys(currencies).length === 0) {
            return { jsx: <p>No currencies available</p>, currencyRate: 0 };
        }


        // Assume there is only one currency code for simplicity
        const currencyCode = Object.keys(currencies)[0];

        const currencySymbols: string[] = []

        Object.values(currencies).forEach(currency => {
            currencySymbols.push(currency.symbol);
        });


        // Pass the currency code to the next function to find related currency info
        return findCurrencyInfo(currencyCode, currencySymbols, currency);
    }


    const { jsx: currencyInfo, currencyRate: signal } = extractCurrencyCode(currencies);

    return (
        <div className="grid grid-cols-1 gap-10">
            <div className="flex flex-col grow border rounded-sm py-2 space-y-1">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <Coins className='size-5 ml-2 mr-1 text-gray-500 dark:text-white' />
                        <p className="font-medium text-gray-900 dark:text-white">Rates:</p>
                    </div>
                    {signal < 1000 && signal !== 0 ? (
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                    ) : signal >= 1000 && signal < 10000 ? (
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                    ) : signal > 10000 ? (
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>)
                        : null}
                </div>
                <div className="text-center">{currencyInfo}</div>
            </div>
            <div className="flex flex-col grow border rounded-sm py-2 space-y-1">
                <div className="flex items-center">
                    <Money className='size-5 ml-2 mr-1 text-gray-500 dark:text-white' />
                    <p className="font-medium text-gray-900 dark:text-white">Currency:</p>
                </div>
                <div className="text-center">{renderCurrencies(currencies)}</div>
            </div>
        </div>
    );
}

export default Currency;


