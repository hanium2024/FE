import React, {useMemo, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Portal, Snackbar} from 'react-native-paper';
import StatusItem from './StatusItem';
import color from '../styles/color';
import CustomText from './CustomText';
import Diagnosis from './Diagnosis';

const statusItems = [
  '음식을 잘 못 먹음',
  '숨소리/호흡 이상',
  '무기력함',
  '구토 증상',
  '스킨쉽 거부',
  '잦은 기침',
  '코가 축축함',
  '배변 색/상태 이상',
  '잇몸색 변화',
  '체중 변화',
];

const Status = () => {
  const [checkedItems, setCheckedItems] = useState(
    new Array(statusItems.length).fill(false),
  );
  const [isEditMode, setIsEditMode] = useState(true);
  const [visible, setVisible] = useState(false);

  const statusStyle = useMemo(() => {
    const trueCount = checkedItems.filter(Boolean).length;

    let text = '';
    let backgroundColor = '';
    if (trueCount === 0) {
      text = '좋음';
      backgroundColor = color.blue[600];
    } else if (trueCount <= 2) {
      text = '보통';
      backgroundColor = color.blue[400];
    } else if (trueCount <= 5) {
      text = '주의';
      backgroundColor = color.orange[400];
    } else if (trueCount <= 8) {
      text = '경계';
      backgroundColor = color.orange[600];
    } else {
      text = '위험';
      backgroundColor = color.orange[800];
    }
    return {text, backgroundColor};
  }, [checkedItems]);

  const handleEditMode = () => {
    setIsEditMode(true);
    console.log('수정하기 pressed');
  };

  const handleCheckboxToggle = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const submitStatus = () => {
    console.log(checkedItems);
    setIsEditMode(false);
    setVisible(true);
  };

  return (
    <View style={styles.statusContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.statusView}>
          <CustomText style={styles.title}>상태</CustomText>
          {!isEditMode && (
            <CustomText
              style={[
                styles.statusBox,
                {backgroundColor: statusStyle.backgroundColor},
              ]}>
              {statusStyle.text}
            </CustomText>
          )}
        </View>
        {!isEditMode && (
          <TouchableOpacity style={styles.changeBox} onPress={handleEditMode}>
            <CustomText style={styles.change}>수정</CustomText>
          </TouchableOpacity>
        )}
      </View>
      {isEditMode ? (
        <CustomText style={styles.subTitle}>
          반려견의 상태에서 이상 증세가 발견된다면 해당하는 항목을 체크해주세요.
        </CustomText>
      ) : (
        <Diagnosis
          type={statusStyle.text}
          borderColor={statusStyle.backgroundColor}
        />
      )}
      {statusItems.map((item, index) => (
        <StatusItem
          key={index}
          label={item}
          checked={checkedItems[index]}
          isEditMode={isEditMode}
          onPress={() => handleCheckboxToggle(index)}
        />
      ))}
      {isEditMode && (
        <Button mode="contained" style={styles.button} onPress={submitStatus}>
          기록하기
        </Button>
      )}
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label: '확인',
            onPress: () => {
              setVisible(false);
            },
            labelStyle: {color: color.white},
          }}
          duration={3000}
          style={styles.snackbarContainer}>
          건강일지 저장 완료!
        </Snackbar>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.gray[200],
    borderRadius: 10,
    marginHorizontal: 24,
    marginVertical: 8,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBox: {
    fontSize: 12,
    fontWeight: 500,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 12,
    color: color.white,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
  },
  changeBox: {
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: color.gray[200],
    backgroundColor: color.gray[50],
  },
  change: {
    fontSize: 12,
    fontWeight: 500,
    color: color.gray[600],
  },
  subTitle: {
    marginBottom: 16,
    fontSize: 13,
    fontWeight: 500,
  },
  button: {
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: color.blue[600],
  },
  snackbarContainer: {
    backgroundColor: color.blue[900],
    borderRadius: 8,
  },
});

export default Status;
