import { IUserListData } from "@/interface/users/types"

export const mapView = (res:IUserListData[]) =>{
    return res && res.length >0 && res.map((item,index) =>{
        return {
            no: index +1,
            ...item
        }
    })
} 
