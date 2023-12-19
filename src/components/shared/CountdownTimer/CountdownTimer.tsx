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
      if (
        futureDate !== null &&
        futureDate !== undefined &&
        futureDate !== ''
      ) {
        try {
          const currentTime = new Date().getTime();
          // Đổi múi giờ
          let formatTargetTime = new Date(futureDate);
          formatTargetTime.setHours(formatTargetTime.getHours() - 7);
          const targetTime = new Date(formatTargetTime.toISOString()).getTime();
          console.log(
            new Date() + ' oo ' + new Date(formatTargetTime.toISOString())
          );
          const timeDifference = targetTime - currentTime;

          if (timeDifference > 0) {
            const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor(
              (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutesLeft = Math.floor(
              (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const secondsLeft = Math.floor(
              (timeDifference % (1000 * 60)) / 1000
            );

            setTimeLeft(
              `${(String(daysLeft).length === 1 ? '0' : '') + daysLeft}d ${
                (String(hoursLeft).length === 1 ? '0' : '') + hoursLeft
              }h ${
                (String(minutesLeft).length === 1 ? '0' : '') + minutesLeft
              }m ${
                (String(secondsLeft).length === 1 ? '0' : '') + secondsLeft
              }s`
            );
          } else {
            clearInterval(intervalId);
            setTimeLeft('You be unbanned!');
          }
        } catch (error) {
          clearInterval(intervalId);
          setTimeLeft('Invalid Date Time!');
        }
      } else {
        clearInterval(intervalId);
        setTimeLeft('Invalid Date Time!');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [futureDate]);

  return <Text {...otherProps}>{timeLeft}</Text>;
};

export default CountdownTimer;
