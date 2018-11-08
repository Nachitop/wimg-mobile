export class Places {
    html_attributions: any[];
    results:           Result[];
    status:            string;
}

export class Result {
    geometry:      Geometry;
    icon:          string;
    id:            string;
    name:          string;
    opening_hours: OpeningHours;
    photos:        Photo[];
    place_id:      string;
    plus_code:     PlusCode;
    price_level?:  number;
    rating:        number;
    reference:     string;
    scope:         string;
    types:         Type[];
    vicinity:      string;
}

export class Geometry {
    location: Location;
    viewport: Viewport;
}

export class Location {
    lat: number;
    lng: number;
}

export class Viewport {
    northeast: Location;
    southwest: Location;
}

export class OpeningHours {
    open_now: boolean;
}

export class Photo {
    height:            number;
    html_attributions: string[];
    photo_reference:   string;
    width:             number;
}

export class PlusCode {
    compound_code: string;
    global_code:   string;
}

export enum Type {
    Bar = "bar",
    Establishment = "establishment",
    Food = "food",
    PointOfInterest = "point_of_interest",
    Restaurant = "restaurant",
    TravelAgency = "travel_agency",
}