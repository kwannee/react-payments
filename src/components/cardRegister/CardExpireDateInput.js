import React, { useEffect } from 'react';
import styled from 'styled-components';

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

export const CardExpireDateInput = ({
  expireDate,
  onExpireDateInput,
  onCardExpireCheck,
}) => {
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

  useEffect(() => {
    if (expireDate.year === '' || expireDate.month === '') {
      return;
    }

    const isCardExpireDateCompleted = () => {
      const currentDate = new Date();
      const currentYear = String(currentDate.getFullYear()).slice(2, 4);
      const currentMonth = currentDate.getMonth() + 1;

      if (parseInt(expireDate.year) < parseInt(currentYear)) {
        return false;
      }

      if (
        expireDate.year === currentYear &&
        parseInt(expireDate.month) < currentMonth
      ) {
        return false;
      }

      if (parseInt(expireDate.month) > 12 || parseInt(expireDate.month) < 1) {
        return false;
      }

      return true;
    };

    onCardExpireCheck(isCardExpireDateCompleted());
  }, [expireDate]);

  return (
    <InputContainer>
      <InputTitle>만료일</InputTitle>
      <Style.ExpireDateInputBox>
        <AutoFocusInputContainer maxValueLength={2}>
          <Style.ExpireDateInputBasic
            value={expireDate?.month}
            onChange={handleMonthInput}
            type="text"
            placeholder="MM"
          />
          /
          <Style.ExpireDateInputBasic
            value={expireDate?.year}
            onChange={handleYearInput}
            type="text"
            placeholder="YY"
          />
        </AutoFocusInputContainer>
      </Style.ExpireDateInputBox>
    </InputContainer>
  );
};

const Style = {
  ExpireDateInputBox: styled(InputBox)`
    width: 50%;
    justify-content: center;
  `,
  ExpireDateInputBasic: styled(InputBasic)`
    width: 25%;
  `,
};
