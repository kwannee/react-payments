import React, { useEffect } from 'react';

import { CARD_INFO_TYPES } from '../../reducer/types';

import {
  InputContainer,
  InputTitle,
  InputBasic,
  InputBox,
} from '../common/styled';
import Dot from '../common/Dot';

export const CardPasswordInputForm = ({
  password,
  handlePasswordInput,
  handleCardPasswordCheck,
}) => {
  const handlePasswordChange = (e, name) => {
    if (isNaN(e.nativeEvent.data) || e.target.value.length > 1) {
      return;
    }

    handlePasswordInput({
      type: CARD_INFO_TYPES.SET_PASSWORD,
      payload: { key: name, password: e.nativeEvent.data },
    });
  };

  useEffect(() => {
    const isCompletePassword = Object.values(password).every(
      (number) => number
    );

    handleCardPasswordCheck(isCompletePassword);
  }, [password]);

  return (
    <InputContainer>
      <InputTitle>카드 비밀번호</InputTitle>
      <InputBox
        width="50%"
        backgroundColor="transparent"
        justifyContent="space-between"
      >
        <InputBasic
          value={password.firstNumber || ''}
          onChange={(e) => handlePasswordChange(e, 'firstNumber')}
          type="password"
          width="20%"
        />
        <InputBasic
          value={password.secondNumber || ''}
          onChange={(e) => handlePasswordChange(e, 'secondNumber')}
          type="password"
          width="20%"
        />
        <Dot />
        <Dot />
      </InputBox>
    </InputContainer>
  );
};
