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

export const formatToISO_8601 = (props: DateProps) => {
  const { dateProp } = props;

  if (dateProp) {
    const dateMoment = moment(dateProp, 'DD/MM/YYYY'); // Định dạng ban đầu là 'DD/MM/YYYY'
    const iso8601Format = dateMoment.format('YYYY-MM-DDTHH:mm:ss'); // Mặc định là ISO 8601

    return iso8601Format;
  } else {
    return '';
  }
};


export const formatToDay = (props: DateProps) => {
  const { dateProp } = props;

  if (dateProp) {
    const dateMoment = moment(dateProp);
    const dateFormat = dateMoment.format('DD');

    return dateFormat;
  } else {
    return '';
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
  if(dateProp) {
    const parsedDate = new Date(dateProp);
    return formatDistanceToNow(parsedDate) + ' ago';
  } else {
    return '';
  }
  
};
