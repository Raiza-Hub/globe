interface Name {
    common: string;
    official: string;
    nativeName: {
        [key: string]: {
            common: string;
            official: string;
        };
    };
}

interface NativeName {
    official: string;
    common: string;
}


interface Idd {
    root: string;
    suffixes: string[];
}

export interface Currencies {
    [key: string]: {
        name: string;
        symbol: string;
    };
}

export interface Languages {
    [key: string]: string;
}

interface Translations {
    [key: string]: {
        official: string;
        common: string;
    };
}

interface Demonyms {
    [key: string]: {
        f: string;
        m: string;
    };
}

interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}

interface Flags {
    png: string;
    svg: string;
    alt: string;
}

interface CoatOfArms {
    png: string;
    svg: string;
}

interface PostalCode {
    format: string;
    regex: string;
}

export interface Country {
    name: Name;
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    length: number;
    unMember: boolean;
    currencies: Currencies;
    idd: Idd;
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: Languages;
    translations: Translations;
    latlng: number[];
    landlocked: boolean;
    area: number;
    demonyms: Demonyms;
    borders: string[];
    flag: string;
    maps: Maps;
    population: number;
    gini: {
        [key: number]: number;
    };
    fifa: string;
    car: {
        signs: string[];
        side: string;
    };
    timezones: string[];
    continents: string[];
    flags: Flags;
    coatOfArms: CoatOfArms;
    startOfWeek: string;
    capitalInfo: {
        latlng: number[];
    };
    postalCode: PostalCode;
}
