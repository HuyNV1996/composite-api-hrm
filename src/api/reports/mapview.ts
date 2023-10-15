export const mapView = (input: any) => {
    const output:any = []
    input && input.map((item:any,index:number) => {
        output.push({
            key: index,
            ...item,
            ...item.stockEntity
        })
    })
    return output;
}