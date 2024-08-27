import papa from "papaparse";
import legendItems from "../legend/legendItems";
import countries from "../geoJson/countries.json";


export interface CountryProperties {
    ISO_A3: string;
    confirmed: number;
    confirmedText: string;
    color?: string;
    ADMIN: string;
}

export interface Country {
    type: string;
    properties: CountryProperties;
    geometry: Record<string, any>;
}

interface CovidCountry {
    ISO3: string;
    Confirmed: string;
}
const { features } = countries as { features: Country[] };

class LoadCountryTask {
    private covidUrl: string =
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv";

    private setState: ((features: Country[]) => void) | null = null;

    public load(setState: (features: Country[]) => void): void {
        this.setState = setState;

        papa.parse<CovidCountry>(this.covidUrl, {
            download: true,
            header: true,
            complete: (result: any) => this.processCovidData(result.data),
        });
    }

    private processCovidData(covidCountries: CovidCountry[]): void {
        for (let i = 0; i < features.length; i++) {
            const country: Country = features[i];
            const covidCountry = covidCountries.find(
                (covidCountry) => country.properties.ISO_A3 === covidCountry.ISO3
            );

            country.properties.confirmed = 0;
            country.properties.confirmedText = "0";

            if (covidCountry != null) {
                let confirmed = Number(covidCountry.Confirmed);
                country.properties.confirmed = confirmed;
                country.properties.confirmedText = this.formatNumberWithCommas(
                    confirmed
                );
            }
            this.setCountryColor(country);
        }

        if (this.setState) {
            this.setState(features);
        }
    }

    private setCountryColor(country: Country): void {
        const legendItem = legendItems.find((item: any) =>
            item.isFor(country.properties.confirmed)
        );

        if (legendItem != null) country.properties.color = legendItem.color;
    }

    private formatNumberWithCommas(number: number): string {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export default LoadCountryTask;
