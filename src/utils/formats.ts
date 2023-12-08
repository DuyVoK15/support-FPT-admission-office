import { formatDistanceToNow } from 'date-fns';
import moment from 'moment';

type DateProps = {
  dateProp: string | null;
};

export function formatDateToDDMMYYYY(date: Date) {
  const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm '0' phía trước nếu cần
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm '0' phía trước nếu cần (lưu ý rằng tháng trong JavaScript bắt đầu từ 0)
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function format_ISODateString_To_DDMMYYYY(dateISOString: string) {
  const [year, month, day] = dateISOString.split('T')[0].split('-');

  return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
}


export const formatToDate = (props: DateProps) => {
  const { dateProp } = props;

  if (dateProp) {
    const dateMoment = moment(dateProp);
    const dateFormat = dateMoment.format('DD/MM/YYYY');

    return dateFormat;
  } else {
    return '';
  }
};
export const formatDateTypeToIOSDateString = (date: Date | null) => {
  if (date) {
    const dateMoment = moment(date);
    const isISO8601 = moment(date, moment.ISO_8601, true).isValid();

    if (isISO8601) {
      const iso8601Format = moment(date)
        .startOf('day')
        .format('YYYY-MM-DDTHH:mm:ss');
      return iso8601Format;
    } else {
      const dateFormat = dateMoment.format('DD/MM/YYYY');
      return dateFormat;
    }
  } else {
    return '';
  }
};
export const formatToISO_8601 = (date: string | null) => {
  if (date) {
    const isISO8601 = moment(date, moment.ISO_8601, true).isValid();
    const isDDMMYYYY = moment(date, 'DD/MM/YYYY', true).isValid();

    if (isISO8601) {
      return date; // Trả về ngày nếu là định dạng ISO 8601
    } else if (isDDMMYYYY) {
      const dateMoment = moment(date, 'DD/MM/YYYY').startOf('day');
      const iso8601Format = dateMoment.format('YYYY-MM-DDTHH:mm:ss');
      return iso8601Format; // Trả về định dạng ISO 8601 với thời gian là 00:00:00 nếu là 'DD/MM/YYYY'
    } else {
      return null; // Trả về null nếu không phải là bất kỳ định dạng nào hợp lệ
    }
  } else {
    return null; // Trả về null nếu date không tồn tại
  }
};

export const formatToDay = (props: DateProps) => {
  const { dateProp } = props;

  if (dateProp) {
    const dateMoment = moment(dateProp);
    const dateFormat = dateMoment.format('DD');

    return dateFormat;
  } else {
    return null;
  }
};
export const formatToMonthString = (props: DateProps): string => {
  const { dateProp } = props;

  if (dateProp) {
    const dateMoment = moment(dateProp);
    const dateFormat = dateMoment.format('MMMM');

    return dateFormat;
  } else {
    return '';
  }
};

export const timeAgo = (props: DateProps): string => {
  const { dateProp } = props;
  if (dateProp) {
    const parsedDate = new Date(dateProp);
    return formatDistanceToNow(parsedDate) + ' ago';
  } else {
    return '';
  }
};

export function format_ISODateString_To_DayOfWeekMonthDDYYYY(
  isoDateString: string | null
) {
  if (isoDateString === null) {
    return null;
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const datePart = isoDateString.split('T')[0];
  const [year, month, day] = datePart.split('-').map((part) => parseInt(part, 10));

  const dayOfWeekIndex = new Date(year, month - 1, day).getDay();
  const dayOfWeek = daysOfWeek[dayOfWeekIndex];
  const monthName = months[month - 1];

  const customDateString = `${dayOfWeek}, ${monthName} ${day}, ${year}`;
  return customDateString;
}


export function format_ISODateString_To_DayOfWeek(isoDateString: string) {
  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ];

  const datePart = isoDateString.split('T')[0];
  const [year, month, day] = datePart.split('-').map((part) => parseInt(part, 10));

  const dayIndex = new Date(year, month - 1, day).getDay();
  const dayOfWeek = daysOfWeek[dayIndex];

  return dayOfWeek;
}


export function format_ISODateString_To_DDMonthYYYY(isoDateString: string) {
  if (isoDateString === null) {
    return null;
  }
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const datePart = isoDateString.split('T')[0];
  const [year, month, day] = datePart
    .split('-')
    .map((part) => parseInt(part, 10));

  const customDateString = `${day} ${months[month - 1]}, ${year}`;
  return customDateString;
}

export function format_ISODateString_To_MonthDD(isoDateString: string) {
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const date = new Date(isoDateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();

  const customDateString = `${months[monthIndex]} ${day}`;
  return customDateString;
}

export function format_ISODateString_To_DayOfWeekMonthDD(
  isoDateString: string,
  includeTime: boolean = false
) {
  if (isoDateString === null) {
    return null;
  }
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const date: Date = new Date(isoDateString);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const month = months[monthIndex];
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);

  let customDateString = `${dayOfWeek}, ${month} ${day}`;
  if (includeTime) {
    customDateString += ` - ${hours}:${minutes}`;
  }

  return customDateString;
}

export function format_ISODateString_To_MMssDayOfWeekMonthDD(
  isoDateString: string
) {
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const date: Date = new Date(isoDateString);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const monthIndex = date.getMonth();
  const day = date.getDate();

  const customDateString = `${dayOfWeek}, ${months[monthIndex]} ${day}`;

  return customDateString;
}

export function formatDateTimeForNotification(isoDateString: string) {
  const date = new Date(isoDateString);
  // Hàm lấy tên ngày trong tuần
  const getDayOfWeek = (date: Date) => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getDay()];
  };

  // Hàm lấy tên tháng
  const getMonth = (date: Date) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[date.getMonth()];
  };

  const formattedDate = `${date.getHours()}:${date.getMinutes()}:${String(
    date.getSeconds()
  ).padStart(2, '0')} ${getDayOfWeek(date)}, ${getMonth(
    date
  )} ${date.getDate()}, ${date.getFullYear()}`;

  return formattedDate;
}

// Format time string HH:mm:ss to HH:mm
export function format_Time_To_HHss(inputTime: string) {
  const timeParts = inputTime.split(':'); // Tách chuỗi theo dấu ':'

  if (timeParts.length === 3) {
    // Đảm bảo rằng chuỗi có 3 phần tử (giờ, phút, giây)
    const formattedTime = `${timeParts[0]}:${timeParts[1]}`;
    return formattedTime;
  } else {
    return 'Invalid time format';
  }
}
// Format time string HH:mm:ss to HH:mm
export function format_ISODateString_To_HHss(dateIOSString: string | null) {
  if (dateIOSString === null) {
    return null;
  }
  const timePart = dateIOSString.split('T')[1];
  const hours = timePart.substring(0, 2);
  const minutes = timePart.substring(3, 5);

  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
}

export function format_ISODateString_To_Full(dateISOString: string | null) {
  if (dateISOString === null) {
    return null;
  }

  const [datePart, timePart] = dateISOString.split('T');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes] = timePart.split(':');

  const formattedTime: string = `${hours.padStart(2, '0')}:${minutes}`;

  const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthIndex: number = parseInt(month, 10) - 1;
  const monthString: string = months[monthIndex];

  const formattedDate: string = `${formattedTime} - ${monthString} ${parseInt(
    day,
    10
  )}, ${year}`;

  return formattedDate;
}
export function format_DDMMYYYYYString_To_YYYYMMDate(
  dateString: string | null
) {
  if (dateString !== null) {
    const parts = dateString.split('/');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const date = new Date(formattedDate);

    return date;
  }
  return new Date();
}
