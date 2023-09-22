export interface ISearchLeaveListBody {
  params: ISearchLeaveListParams;
}

export interface ISearchLeaveListParams {
  args: string[];
  pages: ISearchLeaveListPages;
}

export interface ISearchLeaveListPages {
  page_size: number;
  page: number;
}

export interface IUpdateStatusLeaveBody {
  params: IUpdateStatusLeaveParams;
}
export interface IUpdateStatusLeaveParams {
  args: string[];
}
