import { IGetListPostData } from "@/interface/posts/types"

export const mapView = (res:IGetListPostData[]) =>{
    return res && res.length >0 && res.map((item,index) =>{
        return {
            no: index +1,
            ...item
        }
    })
} 
