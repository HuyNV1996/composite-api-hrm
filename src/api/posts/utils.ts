import { IGetListPostData } from "@/interface/posts/types"

export const mapView = (res:IGetListPostData[]) =>{
    return res && res.length >0 && res.map((item,index) =>{
        return {
            no: index +1,
            ...item
        }
    })
} 

export const mapViewImage = (input:any) => {
    const output:string[] = []
    input && input.length > 0 && input.map((item:any) => {
        output.push(item.url)
    })
    return output
}