import { RoomsListData } from "@/interface/rooms/types"

export const mapView = (res:RoomsListData[]) =>{
    return res && res.length >0 && res.map((item,index) =>{
        return {
            no: index +1,
            ...item
        }
    })
} 
