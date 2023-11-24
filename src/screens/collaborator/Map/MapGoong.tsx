// import React, { useEffect, useRef, useState } from 'react';
// import { StyleSheet, View } from 'react-native';
// import MapboxGL from '@rnmapbox/maps';


// MapboxGL.setConnected(true); // áp dụng cho android
// MapboxGL.setAccessToken('<YOUR_ACCESSTOKEN>');

// const MapGoong = () => {
//   const [loadMap] = useState<string>("");
//   /*sử dụng Load Map*/ // kiểu URL cho bản đồ
//   const [coordinates] = useState<number[] | []>([105.83991, 21.028]); // Vị trí mà bản đồ nên căn giữa. [lng, lat]

//   const camera = useRef(null);

//   return (
//     <View style={{ flex: 1 }}>
//       <MapboxGL.MapView
//         styleURL={loadMap}
//         // onPress={handleOnPress}
//         style={{ flex: 1 }}
//         projection="globe" //Phép chiếu được sử dụng khi hiển thị bản đồ
//         zoomEnabled={true}
//       >
//         <MapboxGL.Camera
//           ref={camera}
//           zoomLevel={6} // Mức thu phóng của bản đồ
//           centerCoordinate={coordinates}
//         />
//       </MapboxGL.MapView>
//     </View>
//   );
// };

// export default MapGoong;
// // sk.eyJ1IjoiZHV5YnB6IiwiYSI6ImNscDlrdmRwajJzcHAyaXFrajJjc3FudGEifQ.4TbniJZr48IR_1LebbzORA