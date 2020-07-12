export class DetailsResponse {
    html_attributions: Array<any> = [];
    result: DetailsData;
	status: string;
}

export interface DetailsData {
    address_components: Array<any>;
    adr_address: string;
    business_status: string;
    formatted_address: string;
    formatted_phone_number: string;
    geometry: object;
    icon: string;
    id: string;
    international_phone_number: string;
    name: string;
    photos: Array<any>;
    rating: number;
    user_ratings_total: number;
    types: Array<any>
    plus_code: object;
    website: string;
    opening_hours: object;
    weekday_text: Array<any>;
    reviews: Array<any>;
}