export function regexEmail(message = '') {
  return {
    pattern: RegExp('^[a-z][a-z0-9_.]{0,}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$'),
    message: message,
  };
}

export function regexPhone(message = '') {
  return {
    pattern: RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'),
    message: message,
  };
}

export function regexDDMMYY(message = '') {
  return {
    pattern: RegExp(
      '(([1-2][0-9])|([1-9])|(3[0-1]))/((1[0-2])|([1-9]))/[0-9]{4}'
    ),
    message: message,
  };
}

export function regexIdCard(message = '') {
  return {
    pattern: RegExp('^(\\d{9}|\\d{12})$'),
    message: message,
  };
}
