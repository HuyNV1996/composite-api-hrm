import { ICampaignListData } from "@/interface/campaign/types"

export const mapView = (res:ICampaignListData[]) =>{
    return res && res.length >0 && res.map((item,index) =>{
        return {
            no: index +1,
            ...item
        }
    })
} 
