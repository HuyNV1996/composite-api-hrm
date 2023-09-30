export function isObjectDefined(obj?: any): boolean {
    // Kiểm tra xem đối tượng có phải là undefined không
    if (obj === undefined) {
      return false;
    }
  
    // Kiểm tra xem ít nhất một cặp key-value trong đối tượng có giá trị hay không
    return Object.values(obj).some((value) => value !== undefined && value !== '' && value !== null);
  }