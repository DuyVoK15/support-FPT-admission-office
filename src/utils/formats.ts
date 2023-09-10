import { formatDistanceToNow } from 'date-fns';
import moment from 'moment';

type DateProps = {
  dateProp: string | null;
};

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
