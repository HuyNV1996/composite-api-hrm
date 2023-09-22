export interface IExport {
    url_1: IURL;
    url_2: IURL;
    url_3: IURL;
    url_4: IURL;
}

export interface IURL{
    url: string;
    create_date : string;   
}

  export interface IUpdateExportBody {
    params:IUpdateExportParams
  }
  
  export interface IUpdateExportParams {
    args: number[]
  }