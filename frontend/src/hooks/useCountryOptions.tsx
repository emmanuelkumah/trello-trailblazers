import { JSX, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchCountries from "@/api/countries";
import Image from "@/components/Image";

interface Country {
  name: { common: string };
  flags: { svg: string };
  idd: {
    root: string;
    suffixes?: string[];
  };
  currencies?: Record<
    string,
    {
      name?: string;
      symbol?: string;
    }
  >;
}

export interface CountryOption {
  value: string;
  searchText: string;
  flagOnly: JSX.Element;
  nameOnly: JSX.Element;
  countryCode: JSX.Element;
  label: JSX.Element;
  currencyCode?: string;
  currencyName?: string;
  currencySymbol?: string;
  fullCurrency?: JSX.Element;
}

export default function useCountryOptions() {
  const {
    data: countries = [],
    isLoading,
    error,
  } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const countryOptions = useMemo<CountryOption[]>(() => {
    return countries.map((country) => {
      const {
        name: { common },
        flags: { svg },
        idd: { root, suffixes },
        currencies,
      } = country;

      const fullCode =
        suffixes && suffixes.length > 0 ? root + suffixes[0] : root;

      let currencyCode = "";
      let currencyName = "";
      let currencySymbol = "";

      if (currencies) {
        const currencyKeys = Object.keys(currencies);
        if (currencyKeys.length > 0) {
          const firstKey = currencyKeys[0];
          const currencyInfo = currencies[firstKey];
          currencyCode = firstKey;
          currencyName = currencyInfo?.name ?? "";
          currencySymbol = currencyInfo?.symbol ?? "";
        }
      }

      // 3) Build display elements
      const flagElement = (
        <Image src={svg} alt={`${common} flag`} width={24} height={24} />
      );
      const nameElement = <span>{common}</span>;
      const countryCode = <span>{fullCode}</span>;

      const label = (
        <span className="flex items-center gap-2">
          {flagElement}
          {nameElement}
        </span>
      );

      const fullCurrency = (
        <span className="flex items-center gap-2">
          {flagElement}
          {currencyName}
        </span>
      );

      const searchTextParts = [
        common,
        fullCode,
        currencyCode,
        currencyName,
      ].filter(Boolean);
      const searchText = searchTextParts.join(" ");

      return {
        value: common,
        searchText,
        label,
        flagOnly: flagElement,
        nameOnly: nameElement,
        countryCode,
        currencyCode,
        currencyName,
        currencySymbol,
        fullCurrency,
      };
    });
  }, [countries]);

  return { countryOptions, isLoading, error };
}
