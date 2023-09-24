import { IGetListCommentData } from "@/interface/comments/types"

export const mapView = (res:IGetListCommentData[]) =>{
    return res && res.length >0 && res.map((item,index) =>{
        return {
            no: index +1,
            ...item
        }
    })
} 
