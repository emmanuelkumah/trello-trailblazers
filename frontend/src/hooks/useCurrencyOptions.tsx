import { JSX, useMemo } from "react";
import useCountryOptions, { CountryOption } from "./useCountryOptions";

export interface CurrencyOption {
  label: JSX.Element;
  value: string;
  searchText: string;
}

export default function useCurrencyOptions() {
  const { countryOptions, isLoading, error } = useCountryOptions();

  const currencyOptions = useMemo<CurrencyOption[]>(() => {
    const optionsMap = new Map<string, CurrencyOption>();

    countryOptions.forEach((option: CountryOption) => {
      const { currencyName, fullCurrency } = option;
      if (currencyName && fullCurrency) {
        if (!optionsMap.has(currencyName)) {
          optionsMap.set(currencyName, {
            value: currencyName,
            label: fullCurrency,
            searchText: currencyName,
          });
        }
      }
    });

    return Array.from(optionsMap.values());
  }, [countryOptions]);

  return { currencyOptions, isLoading, error };
}
