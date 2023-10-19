import { request } from "../request";
import { mapView } from "./mapview";

export const apiTopStockCode = async (date: string) => {
    const res =  await request<any>('get', `/analytics/get-list?site=fireant&date=${date}`);
    return {
        data: mapView(res.data)
    }
};