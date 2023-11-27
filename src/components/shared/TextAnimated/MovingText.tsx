import React from 'react';
import { Animated, Easing, Text, View, StyleSheet } from 'react-native';

export default function MovingText() {
  const ref = React.useRef(View.prototype);
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [xPos, setXPos] = React.useState(0);

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      delay: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }

  React.useEffect(() => {
    ref.current.measure((x, y, w, h, xAbs, yAbs) => setXPos(xAbs));
    startAnimation();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -xPos]
  })

  return (
    
      <Animated.View ref={ref} style={{ transform: [{ translateX }] }}>
        <Text>Some Text</Text>
      </Animated.View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});