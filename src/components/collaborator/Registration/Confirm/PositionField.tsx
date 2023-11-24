// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';

// const PositionField = () => {
//   return (
//     <View key={INDEX} style={styles.containerEveryPosition}>
//                       <View style={styles.everyPosition}>
//                         <TouchableOpacity
//                           onPress={() => handleSetPositionId(position?.id)}
//                           style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                           }}
//                         >
//                           <View style={{ flex: 1 }}>
//                             <Text style={styles.textPositionNum}>
//                               Position: {''}
//                               <Text style={styles.textPositionNum_2}>
//                                 {position?.positionName
//                                   ? position?.positionName
//                                   : 'No value'}
//                               </Text>
//                             </Text>
//                           </View>

//                           <View
//                             style={{
//                               paddingHorizontal: 5,
//                               paddingVertical: 2,
//                             }}
//                           >
//                             {positionId === position?.id ? (
//                               <Entypo
//                                 name="chevron-small-up"
//                                 size={26}
//                                 color="black"
//                               />
//                             ) : (
//                               <Entypo
//                                 name="chevron-small-down"
//                                 size={26}
//                                 color="black"
//                               />
//                             )}
//                           </View>
//                         </TouchableOpacity>
//                         {positionId === position?.id && (
//                           <View style={{}}>
//                             <DashedLine
//                               style={{ marginVertical: 10 }}
//                               dashGap={0}
//                               dashThickness={1}
//                               dashLength={10}
//                               dashColor={COLORS.super_light_grey}
//                             />
//                             <View>
//                               <View style={styles.column}>
//                                 <View style={styles.contentRow}>
//                                   <Ionicons
//                                     name="md-calendar"
//                                     size={28}
//                                     color={COLORS.orange_icon}
//                                   />
//                                 </View>
//                                 <View style={{ marginLeft: 15 }}>
//                                   <View style={{ marginBottom: 4 }}>
//                                     <Text
//                                       style={{
//                                         fontFamily:
//                                           FONTS_FAMILY.Ubuntu_500Medium,
//                                         fontSize: 16,
//                                       }}
//                                     >
//                                       {position?.date
//                                         ? format_ISODateString_To_DayOfWeekMonthDDYYYY(
//                                             position?.date
//                                           )
//                                         : ''}
//                                     </Text>
//                                   </View>
//                                   <View style={{ marginBottom: 4 }}>
//                                     <Text
//                                       style={{
//                                         fontFamily:
//                                           FONTS_FAMILY.Ubuntu_400Regular,
//                                         fontSize: 14,
//                                       }}
//                                     >
//                                       {position?.timeFrom && position?.timeTo
//                                         ? format_Time_To_HHss(
//                                             position?.timeFrom
//                                           ) +
//                                           ' - ' +
//                                           format_Time_To_HHss(
//                                             position?.timeTo
//                                           ) +
//                                           ' (GMT +7)'
//                                         : ''}
//                                     </Text>
//                                   </View>
//                                 </View>
//                               </View>
//                               {/* COLUMN 2 */}
//                               <View style={styles.column}>
//                                 <View style={styles.contentRow}>
//                                   <Ionicons
//                                     name="location-sharp"
//                                     size={28}
//                                     color={COLORS.orange_icon}
//                                   />
//                                 </View>
//                                 <View style={{ marginLeft: 15 }}>
//                                   <View style={{ marginBottom: 4 }}>
//                                     <Text
//                                       style={{
//                                         fontFamily:
//                                           FONTS_FAMILY.Ubuntu_500Medium,
//                                         fontSize: 16,
//                                       }}
//                                     >
//                                       {position?.schoolName
//                                         ? position?.schoolName
//                                         : ''}
//                                     </Text>
//                                   </View>
//                                   <View
//                                     style={{
//                                       marginBottom: 4,
//                                       maxWidth: ScreenWidth * 0.6,
//                                     }}
//                                   >
//                                     <Text
//                                       style={{
//                                         fontFamily:
//                                           FONTS_FAMILY.Ubuntu_400Regular,
//                                         fontSize: 14,
//                                       }}
//                                     >
//                                       {position?.location
//                                         ? position?.location
//                                         : ''}
//                                     </Text>
//                                   </View>
//                                 </View>
//                               </View>
//                               {/* COLUMN 3 */}
//                               <View
//                                 style={[styles.column, { marginBottom: 0 }]}
//                               >
//                                 <View style={styles.contentRow}>
//                                   <Ionicons
//                                     name="md-calendar"
//                                     size={28}
//                                     color={COLORS.orange_icon}
//                                   />
//                                 </View>
//                                 <View style={{ marginLeft: 15 }}>
//                                   <View style={{ marginBottom: 4 }}>
//                                     <Text
//                                       style={{
//                                         fontFamily:
//                                           FONTS_FAMILY.Ubuntu_500Medium,
//                                         fontSize: 16,
//                                       }}
//                                     >
//                                       Attendee Number
//                                     </Text>
//                                   </View>
//                                   <View style={{ marginBottom: 4 }}>
//                                     <Text
//                                       style={{
//                                         fontFamily:
//                                           FONTS_FAMILY.Ubuntu_400Regular,
//                                         fontSize: 14,
//                                       }}
//                                     >
//                                       {position?.positionRegisterAmount ||
//                                       position?.amount
//                                         ? position?.positionRegisterAmount +
//                                           ' / ' +
//                                           position?.amount +
//                                           ' collaborators'
//                                         : ''}
//                                     </Text>
//                                   </View>
//                                 </View>
//                               </View>
//                             </View>

//                             <DashedLine
//                               style={{ marginVertical: 10 }}
//                               dashGap={0}
//                               dashThickness={1}
//                               dashLength={10}
//                               dashColor={COLORS.super_light_grey}
//                             />

//                             <View style={styles.section}>
//                               <Text style={styles.paragraph}>
//                                 * Bus Service?
//                               </Text>
//                               <Switch
//                                 disabled={position?.isBusService ? false : true}
//                                 value={isSelectedBusOption[index]}
//                                 onValueChange={(value) =>
//                                   selectedBusOption(index)
//                                 }
//                                 color={'#fcc995'}
//                                 thumbColor={
//                                   isSelectedBusOption[index]
//                                     ? COLORS.orange_button
//                                     : '#fff'
//                                 }
//                                 // style={{marginLeft: 10}}
//                               />
//                             </View>
//                             <View>
//                               <SubmitButton
//                                 onPress={showAlertHandler}
//                                 style={{
//                                   marginHorizontal: 40,
//                                   height: 40,
//                                   borderRadius: 10,
//                                 }}
//                                 textStyle={{ fontSize: 16 }}
//                                 titleButton="SEND REQUEST"
//                               />
//                               <ConfirmAlert
//                                 show={showAlert}
//                                 title="CONFIRM"
//                                 message={`Are you sure want to apply for ${position?.positionName} position?`}
//                                 confirmText="Yes"
//                                 cancelText="No"
//                                 confirmButtonColor={COLORS.orange_button}
//                                 onConfirmPressed={() =>
//                                   handleChangePosition(
//                                     list?.data?.[0].id,
//                                     position?.id
//                                   )
//                                 }
//                                 onCancelPressed={hideAlertHandler}
//                               />
//                             </View>                          
//                           </View>
//                         )}
//                       </View>
//                     </View>
//   );
// };

// export default PositionField;

// const styles = StyleSheet.create({});
