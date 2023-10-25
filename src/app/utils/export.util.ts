export function downLoadFile(data: any, type: string, fileName: string) {
  const date = new Date();
  const blob = new Blob([data], { type });
  if (window.navigator && (window as any).navigator['msSaveOrOpenBlob']) {
    (window as any).navigator['msSaveOrOpenBlob'](
      blob,
      appendExtension(
        fileName + '_' + parseTime(date.getTime(), '{d}{m}{y}'),
        type
      )
    );
  } else {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = appendExtension(
      fileName + '_' + parseTime(date.getTime(), '{d}{m}{y}'),
      type
    );
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
  }
}

export function createFileType(e: string) {
  let fileType = '';
  if (e === 'pdf') {
    fileType = `application/${e}`;
  } else if (e === 'docx') {
    fileType = 'application/msword';
  } else if (e === 'xls') {
    fileType = 'application/vnd.ms-excel';
  } else if (e === 'xlsx') {
    fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  }

  return fileType;
}

export function appendExtension(name: any, type: any) {
  switch (type) {
    case 'application/pdf':
      return name.concat('.').concat('pdf');
    case 'application/vnd.ms-excel':
      return name.concat('.').concat('xls');
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return name.concat('.').concat('xlsx');
  }
}

export function parseTime(time: any, userFormat: any) {
  if (arguments.length === 0) {
    return null;
  }
  const format = userFormat || DATE_FORMAT.DEFAULT_DATE_TIME;
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time, 10);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj: any = {
    u: date.getFullYear().toString().substring(2), // get 2 last digits in year
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  return format.replace(/{([uymdhisa])+}/g, (result: any, key: any) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][
        value
      ];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
}

export const DATE_FORMAT = {
  DEFAULT_DATE_TIME: '{y}-{m}-{d} {h}:{i}:{s}',
  DATE_WITH_SLASH: '{d}/{m}/{y}',
  DATE_WITH_DASH: '{d}-{m}-{y}',
  DATE_WITH_DASH_YEAR: '{y}-{m}-{d}',
  DEFAULT_PLACEHOLDER: 'dd/MM/yyyy',
};
