import { ITreeNode } from '@/interface/weeklyreport/type';
import moment from 'moment';
import { isUndefined, isEmpty } from 'lodash';

export const copyTextToClipboard = (text: string) => {
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
};

export const checkObjectExists = (arr: any, objToCheck: any) => {
  if (arr.length == 0) return false;
  for (var i = 0; i < arr.length; i++) {
    if (JSON.stringify(arr[i]) === JSON.stringify(objToCheck)) {
      return true;
    }
  }
  return false;
};
// Hàm cập nhật đối tượng trong mảng
function updateObjectInArray(arr: any, updatedObj: any) {
  for (var i = 0; i < arr.length; i++) {
    var obj = arr[i];
    var dayKey = updatedObj.date;

    if (obj.hasOwnProperty(dayKey)) {
      if (
        obj[dayKey].hasOwnProperty('employee_code') &&
        obj[dayKey].hasOwnProperty('date')
      ) {
        if (
          obj[dayKey].date === updatedObj.date &&
          obj[dayKey].employee_code === updatedObj.employee_code
        ) {
          obj[dayKey] = { ...updatedObj };
          // Object.assign(obj[dayKey], updatedObj);
          break; // Thoát khỏi vòng lặp sau khi cập nhật thành công
        }
      }
    }

    // Kiểm tra đệ quy cho các đối tượng con (nếu có)
    if (obj.children && obj.children.length > 0) {
      updateObjectInArray(obj.children, updatedObj);
    }
  }
}
export const updateObject = (obj: any, updatedArr: any) => {
  // Lặp qua mảng updatedArr và cập nhật mảng oldObj
  updatedArr.forEach(function (updatedObj: any) {
    updateObjectInArray(obj, updatedObj);
  });
  return obj;
};
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getFormattedDate = (dateString: string) => {
  const date = moment(dateString, 'DD/MM');
  const vietnameseDays = [
    'Chủ nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];
  const formattedDay = vietnameseDays[date.day()];
  const formattedDate = date.format('DD/MM');
  return `${formattedDay} (${formattedDate})`;
};

// Xác định ngày dự vào ngày thứ bao nhiêu, tuần thứ bao nhiêu trong năm
export function getDateFromWeek(year: number, week: number, day: number) {
  const date = new Date(year, 0, 1); // Lấy ngày đầu tiên của năm
  const firstDayOfWeek = (date.getDay() + 6) % 7; // Lấy ngày đầu tiên của tuần trong năm

  // Điều chỉnh để đảm bảo tuần đầu tiên không bị sai
  const daysToAdd = week * 7 + day - firstDayOfWeek;
  date.setDate(date.getDate() + daysToAdd);

  return date;
}
export function formatDateSearch(inputDate: string) {
  const dateParts = inputDate.split('-'); // Tách chuỗi ngày tháng năm thành mảng các phần tử

  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
export const convertVietnameseToEnglish = (text: string) => {
  const vietnameseLetters = 'àáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ';
  const englishLetters = 'aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyy';
  if (!text) return '';
  return text.split('').map((char: string) => {
    const index = vietnameseLetters.indexOf(char);
    return index !== -1 ? englishLetters.charAt(index) : char;
  })
    .join('');
};
export const convertFloatToHourMinute = (floatValue: number) => {
  const hours = Math.floor(floatValue / 60);
  const minutes = Math.floor(floatValue % 60);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const result = `${hours}:${formattedMinutes}`;
  return result;
}
export const convertDatetimeStringToHourMinute = (datetimeString: string) => {
  const date = new Date(datetimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const result = `${hours}:${formattedMinutes}`;
  return result;
}
export function filterObjectsByNameAndCode(
  obj: any[],
  employeeName: string,
  employeeCode: string
) {
  const filteredObj = obj.filter(department => {
    const normalizeString = (str: string) => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().trim();
    };

    const filteredChildren = department.children.filter((employee: any) => {
      const normalizedEmployeeName = normalizeString(
        employee.employee_name || ''
      );
      const normalizedEmployeeCode = normalizeString(
        employee.employee_code || ''
      );
      const normalizedSearchName = normalizeString(employeeName || '');
      const normalizedSearchCode = normalizeString(employeeCode || '');

      const isNameMatched =
        !employeeName || normalizedEmployeeName.includes(normalizedSearchName);
      const isCodeMatched =
        !employeeCode || normalizedEmployeeCode.includes(normalizedSearchCode);

      return isNameMatched && isCodeMatched;
    });
    department.children = filteredChildren;

    return filteredChildren.length > 0;
  });

  return filteredObj;
}

export function convertToTreeDataSelector(obj: any): ITreeNode[] {
  const treeData: ITreeNode[] = [];
  for (const item of obj) {
    const treeItem: ITreeNode = {
      title: item.name,
      value: `${item.type}~${item.id}`,
      children: [],
    };
    if (item.data && item.data.length > 0) {
      treeItem.children = item.data.map((dataItem: any) => ({
        title: dataItem.name,
        value: `${item.type}~${item.id}~${dataItem.id}~${dataItem.coefficient}`,
      }));
    }
    treeData.push(treeItem);
  }
  return treeData;
}

export function transformObject(oldObject: any) {
  const newObject: any[] = [];
  const departments: { [department: string]: any } = {};
  let keyCounter = 1;

  oldObject.forEach((item: any) => {
    const { department, employee_name, employee_code, shift_name, date } = item;

    if (!departments[department]) {
      const departmentObj: any = {
        key: keyCounter,
        company: item.company,
        department: department,
        children: [],
      };
      departments[department] = departmentObj;
      newObject.push(departmentObj);
      keyCounter++;
    }

    const departmentChildren = departments[department].children;
    const employeeKey = keyCounter;
    keyCounter++;

    const employeeObj: any = {
      key: employeeKey,
      employee_name,
      employee_code,
      company: item.company,
      department: department,
      shift_name,
      date,
    };

    const dateObj: any = {
      ...item,
      employee_name,
      employee_code,
      company: item.company,
      department: department,
      shift_name,
      date,
    };

    const existingEmployee = departmentChildren.find(
      (child: any) => child.employee_code === employee_code
    );

    if (existingEmployee) {
      existingEmployee[date] = dateObj;
    } else {
      employeeObj[date] = dateObj;
      departmentChildren.push(employeeObj);
    }
  });

  return newObject;
}

export function formatedHistoryShift(objects: any[]) {
  const groupedObj = [];
  for (const obj of objects) {
    var tempGroupedObj: any = {};
    const createDate = obj.create_date;
    const user = Object.values(obj.user_id)[1];
    console.log(user);
    // Kiểm tra nếu createDate chưa tồn tại trong groupedObj, thì tạo mới
    if (!tempGroupedObj['create_date']) {
      tempGroupedObj['create_date'] = '';
    }
    if (!tempGroupedObj['user']) {
      tempGroupedObj['user'] = [];
    }
    tempGroupedObj['create_date'] = obj.create_date;
    const tempValue = {
      old_value: obj.old_value_text,
      new_value: obj.new_value_text,
    };
    var tempObj: any = {
      name: '',
      value: [],
    };
    tempObj.name = obj.user_id[1];
    tempObj.value[0] = tempValue;
    tempGroupedObj['user'][0] = tempObj;
    if (groupedObj.length > 0) {
      const objCreatedDateIndex = groupedObj.findIndex(
        item => item.create_date === createDate
      );
      if (objCreatedDateIndex < 0) {
        groupedObj.push(tempGroupedObj);
      } else {
        const objeUserIndex = groupedObj[objCreatedDateIndex]['user'].findIndex(
          (item: any) => item.name === user
        );
        if (objeUserIndex < 0) {
          groupedObj[objCreatedDateIndex]['user'].push(tempObj);
        } else {
          groupedObj[objCreatedDateIndex]['user'][objeUserIndex]['value'].push(
            tempObj.value[0]
          );
        }
      }
    } else {
      groupedObj.push(tempGroupedObj);
    }
  }
  return groupedObj;
}

export function formatObjectLabelValue(objects: any[]) {
  var formatedObjectArr = [];
  for (const obj of objects) {
    var tempObj: any = {};
    if (!tempObj['label']) {
      tempObj['label'] = '';
    }
    if (!tempObj['value']) {
      tempObj['value'] = '';
    }
    tempObj['value'] = obj.id;
    tempObj['label'] = obj.name;
    formatedObjectArr.push(tempObj);
  }
  return formatedObjectArr;
}

export function formatLeaveArr(objects: any) {
  var formatedArr = [];
  for (const obj of objects) {
    formatedArr.push(obj.id);
  }
  return formatedArr.join();
}

export function isObjectDefined(obj?: any): boolean {
  // Kiểm tra xem đối tượng có phải là undefined không
  if (obj === undefined) {
    return false;
  }

  // Kiểm tra xem ít nhất một cặp key-value trong đối tượng có giá trị hay không
  return Object.values(obj).some((value) => value !== undefined && value !== '' && value !== null);
}