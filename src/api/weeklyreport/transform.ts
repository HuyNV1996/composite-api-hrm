export const mapLeaveListView = (res: any[]) =>{
    return res && res.length >0 && res.map((item,index) =>{
        return{
            no: index,
            ...item
        }
    })
}