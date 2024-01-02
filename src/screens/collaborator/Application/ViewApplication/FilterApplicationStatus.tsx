import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC } from 'react';
import APPLICATION_STATUS_ENUM from '../../../../enums/collaborator/ApplicationStatus';
import { COLORS } from '../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../constants/Fonts';

interface FilterApplicationStatusProps {
  selectedStatus: { status: number };
  setSelectedStatus: React.Dispatch<
    React.SetStateAction<{
      status: number;
    }>
  >;
}
const FilterApplicationStatus: FC<FilterApplicationStatusProps> = (Props) => {
  const statusKeys = Object.keys(APPLICATION_STATUS_ENUM)
    .filter((key) => !isNaN(Number(key)))
    .map((key: any) => Number(key));
  console.log(statusKeys);

  const handeSelectItem = (num: number) => {
    Props.setSelectedStatus({status: num});
    console.log(num);
  };

  const renderItem = ({ item }: { item: number }) => {
    return (
      <TouchableOpacity
        onPress={() => handeSelectItem(item)}
        style={{
          borderWidth: 3,
          borderRadius: 20,
          borderColor: (() => {
            switch (Props.selectedStatus.status) {
              case APPLICATION_STATUS_ENUM.PENDING:
                return COLORS?.orange_button;
              case APPLICATION_STATUS_ENUM.APPROVED:
                return COLORS?.green_status;
              case APPLICATION_STATUS_ENUM.REJECTED:
                return COLORS?.red_status;
              default:
                return '#FFF';
            }
          })(),
          backgroundColor:
            item === Props.selectedStatus.status
              ? (() => {
                  switch (Props.selectedStatus.status) {
                    case APPLICATION_STATUS_ENUM.PENDING:
                      return COLORS?.orange_button;
                    case APPLICATION_STATUS_ENUM.APPROVED:
                      return COLORS?.green_status;
                    case APPLICATION_STATUS_ENUM.REJECTED:
                      return COLORS?.red_status;
                    default:
                      return '#FFF';
                  }
                })()
              : '#FFF',
          marginRight: 10,
        }}
      >
        <View style={{ marginVertical: 8, marginHorizontal: 10 }}>
          <View>
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                color:
                  item !== Props.selectedStatus.status
                    ? (() => {
                        switch (Props.selectedStatus.status) {
                          case APPLICATION_STATUS_ENUM.PENDING:
                            return COLORS?.orange_button;
                          case APPLICATION_STATUS_ENUM.APPROVED:
                            return COLORS?.green_status;
                          case APPLICATION_STATUS_ENUM.REJECTED:
                            return COLORS?.red_status;
                          default:
                            return '#FFF';
                        }
                      })()
                    : '#FFF',
              }}
            >
              {(() => {
                switch (item) {
                  case APPLICATION_STATUS_ENUM.PENDING:
                    return 'Pending';
                  case APPLICATION_STATUS_ENUM.APPROVED:
                    return 'Approved';
                  case APPLICATION_STATUS_ENUM.REJECTED:
                    return 'Rejected';
                  default:
                    return 'No Status';
                }
              })()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={statusKeys}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />
    </View>
  );
};

export default FilterApplicationStatus;

const styles = StyleSheet.create({});
