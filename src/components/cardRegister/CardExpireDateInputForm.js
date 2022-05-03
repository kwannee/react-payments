import React, { useEffect } from 'react';

import { CARD_INFO_TYPES } from '../../reducer/types';
import { AutoFocusInputContainer } from '../common/AutoFocusInputContainer';

import {
  InputContainer,
  InputTitle,
  InputBasic,
  InputBox,
} from '../common/styled';

const isInputValueFilledWithZero = (e) =>
  parseInt(e.nativeEvent.data) === 0 &&
  e.target.value.length === 2 &&
  parseInt(e.target.value) < 1;

export const CardExpireDateInputForm = ({ expireDate, onExpireDateInput }) => {
  const handleMonthInput = (e) => {
    if (e.target.value.length > 2) {
      return;
    }

    if (isInputValueFilledWithZero(e)) {
      return;
    }

    if (isNaN(e.nativeEvent.data) || parseInt(e.target.value) > 12) {
      return;
    }

    onExpireDateInput({
      type: CARD_INFO_TYPES.SET_EXPIRE_DATE,
      payload: { key: 'month', date: e.target.value },
    });
  };

  const handleYearInput = (e) => {
    if (isNaN(e.nativeEvent.data) || e.target.value.length > 2) {
      return;
    }

    onExpireDateInput({
      type: CARD_INFO_TYPES.SET_EXPIRE_DATE,
      payload: { key: 'year', date: e.target.value },
    });
  };

  return (
    <InputContainer>
      <InputTitle>만료일</InputTitle>
      <InputBox width="50%" justifyContent="center">
        <AutoFocusInputContainer maxValueLength={2}>
          <InputBasic
            width="25%"
            value={expireDate?.month}
            onChange={handleMonthInput}
            type="text"
            placeholder="MM"
          />
          /
          <InputBasic
            width="25%"
            value={expireDate?.year}
            onChange={handleYearInput}
            type="text"
            placeholder="YY"
          />
        </AutoFocusInputContainer>
      </InputBox>
    </InputContainer>
  );
};
