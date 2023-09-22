import { getListExport } from '@/api/export/export.api';
import type { ColumnsType } from 'antd/es/table';
import {
  IUpdateExportBody,
  IUpdateExportParams,
} from '@/interface/export/export';
import { useEffect, useState , useCallback } from 'react';
import ButtonDownload from './component/button';
import './style.css';
import { Typography, DatePicker, DatePickerProps, Button ,Upload  } from 'antd';
import moment from 'moment';
import { UploadOutlined , DownloadOutlined, AlertOutlined} from '@ant-design/icons';

import {Card ,Spin , message, Table} from 'antd';
import { importReportShift } from '@/api/export/export.api';
import store from '@/stores';
import { useDispatch , useSelector } from 'react-redux';
import { setGlobalState } from '@/stores/global.store';
import { LocaleFormatter } from '@/locales';
import * as XLSX from 'xlsx';
import { forEach, set } from 'lodash';
import { data } from '@/mock/applicationlist/list';
import { error } from 'console';



interface errorObject {
  
  row: number | string | any;
  code: string | any;
  
}
const columns: ColumnsType<errorObject> = [
  {
    width: 100,
    render: () => <AlertOutlined  />,
  },
  {
   
    title: 'Số thứ tự',
    dataIndex: 'row',
    width: 450,
    align:'center',
    render: (text: string) => <a>{text}</a>,
  },
  { 
    
    title: 'Mã nhân viên',
    dataIndex: 'code',
    width: 450,
    align:'center',
  },
];

const index = () => {
  const [fileUrl, setFileUrl] = useState<any>([]);
  const [month, setMonth] = useState(1 + moment().month())
  const [year, setYear] = useState(moment().year())
  const { Text } = Typography;
  const [uploadedFile , setUploadedFile ] = useState<any>()
  const { loading } = useSelector(state => state.global);
  const [fileList , setFileList] = useState<any[]>([]);
  const [shiftDataArray , setShiftDataArray] = useState<any[]>([]);
  const [stateSpin , setStateSpin] = useState<any>(false)
  const [errorArr , setErrorArr] = useState<any[]>([])
  const customRequest = async ({ file, onSuccess, onError, onProgress , onRemove }: any) => {
    if (file){
      setFileList([file])
      setUploadedFile(file)
      
      onSuccess("ok")
      
    }
};

const handleBeforeUpload = (file: any) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = e.target?.result as ArrayBuffer;
      const dataNoHeader = data?.slice(0)
      const workbook = XLSX.read(dataNoHeader, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[sheetName];
      // const merges = workSheet['!merges'] || [];
      const rows = XLSX.utils.sheet_to_json(workSheet ,{raw : true ,defval : ''});
      let new_arr = [] as any
      // const daterow = rows[1]
      rows.forEach((row: any, index: number) => {
        if (index == 1){
          let new_row = ['']
          for (const key in row) {
            if (row[key] != '') {
              new_row.push(row[key])
            }
          }
          new_arr.push(new_row)
        
        
        }
        if (index >=3){
          let new_row = [] as any
          new_row.push(row["__EMPTY_1"])
          new_arr.push(new_row)
          for (const key in row) {
            
            if(isNaN(parseInt(key)) == false){
              
                new_row.push(row[key])
              
            }
        }
      }
      });

      
      setShiftDataArray(new_arr)
      
      
      

      message.success('Đọc file thành công.');
    } catch (error) {
      message.error('Error parsing the file.');
    }
  };
  reader.readAsBinaryString(file);
  // return false; // Prevent the default upload behavior
};


const handleRemove = (file :any) => {
  const index = fileList.indexOf(file);
  if (index !== -1) {
    const newFileList = [...fileList];
    newFileList.splice(index, 1); // Remove the file from the newFileList array
    setFileList(newFileList); // Update the state to trigger a re-render
  }
};

  const handleSubmitImport = useCallback(async() => {
   
    const errorTable = [] as any
    try {
      
    if (uploadedFile != null && uploadedFile != false){
      setStateSpin(true)
      const rowDate = shiftDataArray[0]
      const errorTable = [] as any
      
      
      shiftDataArray.forEach(async(row : any , index : number) => {
        const data_object = {
          key: index,
          code : '',
          data : [] as any
        }
       
        if (index > 0){
          data_object.code = row[0]
          row.forEach((cell : any , altindex : number) => {
            if (altindex > 0){
              data_object.data.push({
                date : rowDate[altindex],
                shift_name : cell
              });
            
            }
          });
          
          if(index < shiftDataArray.length - 1 ){
            importReportShift(data_object).then(res => {
              
              if(res.status === "successfully"){
                message.success('import thành công dòng ' + index);
              }
              else {
                
                message.error('lỗi import dòng + ' + index);
                const object = {
                row : index,
                code: data_object.code,
                key: index,
                }
                errorTable.push(object)
                // setErrorArr(errorTable)
                
              }
            
          
            }).catch(err => {
              
            })
          }
          else if(index == shiftDataArray.length - 1){
            try{
              const res = await importReportShift(data_object)
            if (res.status === "successfully"){
              message.success('import thành công dòng ' + index);
              message.success('import hoàn thành' );
              setStateSpin(false)
              setErrorArr(errorTable)
            }
            else{
              
              setStateSpin(false)
              message.error('lỗi import dòng + ' + index);
              const object = {
                row : index,
                code: data_object.code,
                key: index,
              }
              errorTable.push(object)
              setErrorArr(errorTable)
            }
            }
            catch(err){
              
            }
            
          }
      }
      });
      
    }
  
  else{
    
    message.error('lỗi import file');
    return
  }
  store.dispatch(setGlobalState({ loading: false }));
  setFileList([])
    setUploadedFile(null)
    setShiftDataArray([])
    setErrorArr(errorTable)

}
catch(err){
  message.error('lỗi import file');
  setFileList([])
    setUploadedFile(null)
    setShiftDataArray([])
  return
}
    
    
    
    },[shiftDataArray])

    const getListUrl = () => {
      getListExport({ "month": Number(month), "year": Number(year) }).then(res => {
        var temp = []
        if (res && res.data) {
          for (let i = 0; i < res.data.length; i++) {
            temp.push(res.data[i])
          }
          setFileUrl(temp)
        }
  
        
      });
    };

  
  
  useEffect(() => {
    if (month && year) {
      getListUrl();
    }
  }, [month, year]);

  const onChangeMonth: DatePickerProps['onChange'] = (month: any, dateString: any) => {
    setMonth(dateString)
  };

  const onChangeYear: DatePickerProps['onChange'] = (year: any, dateString: any) => {
    setYear(dateString)
  };
  useEffect(() => {
    
    console.log('errorArr changed:', errorArr);
  }, [errorArr]);
  return (
    <>
      <div className="section">
      <Spin
          spinning={stateSpin}
          className="app-loading-wrapper"
          tip={<LocaleFormatter id="gloabal.tips.loading" />}></Spin>
        <div className='date-space'>
          <Text>Tháng</Text>
          <DatePicker
            format={'MM'}
            placeholder=""
            onChange={onChangeMonth}
            picker="month"
            defaultValue={moment()}
          />
        </div>
        <div className='date-space'>
          <Text>Năm</Text>
          <DatePicker
            placeholder=""
            onChange={onChangeYear}
            picker="year"
            defaultValue={moment()}
          />
        </div>
      </div>
      <div className="section">
        <h2>Xuất file báo cáo</h2>
        <table>
          <tr>
            <td>
              <ButtonDownload
                fileUrl={fileUrl.filter((item: any) => item.template === "1")[0]?.url}
                title='Báo cáo tổng hợp chấm công'
              />
            </td>
            <td>
              <p>Báo cáo tổng hợp chấm công</p>
            </td>
          </tr>

          <tr>
            <td>
              <ButtonDownload
                fileUrl={fileUrl.filter((item: any) => item.template === "2")[0]?.url}
                title='Báo cáo chấm công đếm số lần'
              />
            </td>
            <td>
              <p>Báo cáo chấm công đếm số lần</p>
            </td>
          </tr>

          <tr>
            <td>
              <ButtonDownload
                fileUrl={fileUrl.filter((item: any) => item.template === "3")[0]?.url}
                title='Báo cáo đi muộn dưới 5p và trên 5p'
              />
            </td>
            <td>
              <p>Báo cáo đi muộn dưới 5p và trên 5p</p>
            </td>
          </tr>

          <tr>
            <td>
              <ButtonDownload
                fileUrl={fileUrl.filter((item: any) => item.template === "4")[0]?.url}
                title='Báo cáo ca đêm, ca gãy'
              />
            </td>
            <td>
              <p>Báo cáo ca đêm, ca gãy</p>{' '}
            </td>
          </tr>
          <tr>
            <td>
              <ButtonDownload
                fileUrl={fileUrl.filter((item: any) => item.template === "5")[0]?.url}
                title='Báo cáo phép bù'
              />
            </td>
            <td>
              <p>Báo cáo phép bù</p>{' '}
            </td>
          </tr>
        </table>
        <h2>Import phân ca</h2>
        <table>
          <tr>
            <td>
              <div style={{display:'flex' , position:'relative'}} >
              <div>
              <Upload fileList={fileList} customRequest={customRequest} maxCount = {1} beforeUpload={handleBeforeUpload} accept='.xlsx' >
              <Button icon={<UploadOutlined />}>Chọn file import</Button>
            </Upload>
            <Button style={{marginTop:'0.5rem'}}   type="primary" onClick={handleSubmitImport}>Import Data</Button>
              </div>
              <div style={{position:'absolute' , marginLeft:'9rem'}} >
              <Button icon={<DownloadOutlined />}  style={{display:'float' ,alignItems:'top',  position:'absolute'}} type="primary" href="https://dl.dropboxusercontent.com/scl/fi/e8arss7j7cwurouw5ahhn/Roster-MMN-08.2023-01-20.08.xlsx?rlkey=on1apps9x86itwgj1gg2vynb4&dl=0">File import mẫu</Button>
              </div>
              
              </div>
            </td>
          </tr>
          {errorArr.length > 0 ? <tr style={{ marginTop:'10rem'}}>
                <Card style={{ marginTop:'4rem'}} title='Lỗi Import Phân Ca'>
                  <Table columns={columns} dataSource={errorArr}/>
                </Card>
          </tr> : <></>} 
          
          
        
          
        </table>
      </div>
    </>
  );
};
export default index;



