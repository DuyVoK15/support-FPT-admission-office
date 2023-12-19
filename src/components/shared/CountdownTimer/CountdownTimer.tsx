import React, { useState, useEffect, FC } from 'react';
import { TextProps } from 'react-native';
import { StyleProp, Text, TextStyle } from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

interface CountdownTimerProps extends TextProps {
  futureDate: string | number;
}
const CountdownTimer: FC<CountdownTimerProps> = ({
  futureDate,
  ...otherProps
}) => {
  const [timeLeft, setTimeLeft] = useState('00d 00h 00m 00s');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const targetTime = new Date(futureDate).getTime();

      const timeDifference = targetTime - currentTime;

      if (timeDifference > 0) {
        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutesLeft = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft(
          `${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`
        );
      } else {
        clearInterval(intervalId);
        setTimeLeft('Countdown Finished');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [futureDate]);

  return <Text {...otherProps}>{timeLeft}</Text>;
};

export default CountdownTimer;
