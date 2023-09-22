import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setUserItem } from '@/stores/user.store';
import './style.css';
import { formatDateSearch, getDateFromWeek } from '@/utils/common';
interface IDatePicker {
 setFromDate: (value: string) => void;
 setToDate: (value: string) => void;
}
const index = (props: IDatePicker) => {
  const {setFromDate,setToDate} = props;
  const currentWeek = moment().format('YYYY-[W]WW');
  const [defaultYear, defaultWeek] = currentWeek.split('-W');
  const defaultStartDate = getDateFromWeek(parseInt(defaultYear), parseInt(defaultWeek), 1);
  const defaultEndDate = new Date(defaultStartDate.getTime() + 6 * 24 * 60 * 60 * 1000); // Thêm 6 ngày
  const defaultFormatValue =  `${formatDateSearch(defaultStartDate.toISOString().slice(0, 10))}
   ~ ${formatDateSearch(defaultEndDate.toISOString().slice(0, 10))}`
  const [formatValue, setFormatValue] = useState(defaultFormatValue);
  // // =================================================================
  // // Dispatch
  // // =================================================================
  const dispatch = useDispatch();
  
  const onChangeDatePicker = (weekValue: string) => {
    const [year, week] = weekValue.split('-W');
    // Tìm ngày đầu tiên của tuần
    const startDate = getDateFromWeek(parseInt(year), parseInt(week), 1);
    // Tìm ngày cuối cùng của tuần
    const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000); // Thêm 6 ngày
    setFormatValue(
      `${formatDateSearch(
        startDate.toISOString().slice(0, 10)
      )} ~ ${formatDateSearch(endDate.toISOString().slice(0, 10))}`
    );
  };
  useEffect(() => {
    setFromDate(formatValue.split('~')[0]?.trim());
    setToDate(formatValue.split('~')[1]?.trim());
  }, [formatValue]);
  
  return (
    //
    <input
      className="datepicker"
      onChange={e => {
        onChangeDatePicker(e.target.value);
      }}
      type="week"
      name="week"
      id="camp-week"
      required
      defaultValue={currentWeek}
    />
  );
};

export default index;
