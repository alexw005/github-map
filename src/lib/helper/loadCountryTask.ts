import axios from "axios";
import papa from "papaparse";
import countries from "../geoJson/countries.json";
import legendItems from "../legend/legendItems";
import { API_BASE_URL } from "./constant";

export interface CountryProperties {
  ISO_A3: string;
  totalCount: number;
  totalCountText: string;
  color?: string;
  ADMIN: string;
}

export interface Country {
  type: string;
  properties: CountryProperties;
  geometry: Record<string, any>;
}

interface GithubCountry {
  country: string;
  totalCount: string;
}
const features: Country[] = (countries as any).features;

class LoadCountryTask {
  private githubApiUrl: string = `${API_BASE_URL}/search?country=`;
  private setState: ((features: Country[]) => void) | null = null;
  private fetchGithubData = async (searchString: string) => {
    try {
      const response = searchString.trim() !== '' ? await axios.get(`${this.githubApiUrl}${searchString}`) : undefined;
      const data = response?.data;

      const processedData: GithubCountry = {
        country: searchString,
        totalCount: data.count,
      };
      this.processGithubData(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  public loadGithub(searchString: string, setState: (features: Country[]) => void): void {
    this.setState = setState;
    this.fetchGithubData(searchString);
  }


  private processGithubData(githubCountry: GithubCountry): void {
    if (githubCountry.country.trim() !== "") {
      const country: Country = features.find(
        (feature) =>
          feature.properties.ADMIN.toLowerCase() === githubCountry.country?.toLowerCase(),
      )!;

      country.properties.totalCount = 0;
      country.properties.totalCountText = "0";

      if (githubCountry != null) {
        let totalCount = Number(githubCountry.totalCount);
        country.properties.totalCount = totalCount;
        country.properties.totalCountText = this.formatNumberWithCommas(totalCount);
      }
      this.setCountryColor(country);
    }
    if (this.setState) {
      this.setState(features);
    }
  }

  private setCountryColor(country: Country): void {
    const legendItem = legendItems.find((item: any) => item.isFor(country.properties.totalCount));

    if (legendItem != null) country.properties.color = legendItem.color;
  }

  private formatNumberWithCommas(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default LoadCountryTask;
