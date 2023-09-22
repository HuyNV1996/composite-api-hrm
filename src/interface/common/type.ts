import { IUpdateSchedulingMoreResult } from "../weeklyreport/type";

export interface ICellActive {
    code: string;
    date: string;
    id: number;
    total_work_time: number;
  }
export interface CommonState{
    cellsActive: ICellActive[];
}