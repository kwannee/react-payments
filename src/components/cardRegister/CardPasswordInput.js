import { useState } from 'react';

import {
  InputContainer,
  InputTitle,
  InputBasic,
  InputBox,
} from '../common/styled';
import Dot from '../common/Dot';
import { AutoFocusInputContainer } from '../common/AutoFocusInputContainer';
import styled from 'styled-components';

export const CardPasswordInput = () => {
  const [password, setPassword] = useState({
    firstNumber: '',
    secondNumber: '',
  });

  const handlePasswordChange = (e, name) => {
    if (isNaN(e.nativeEvent.data) || e.target.value.length > 1) {
      return;
    }

    setPassword((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handlePasswordCompleted = () => {
    console.log('password Completed');
  };

  return (
    <InputContainer>
      <InputTitle>카드 비밀번호</InputTitle>
      <Style.PasswordInputBox>
        <AutoFocusInputContainer
          maxValueLength={1}
          onCompleted={handlePasswordCompleted}
        >
          <Style.PasswordInputBasic
            value={password.firstNumber || ''}
            onChange={(e) => handlePasswordChange(e, 'firstNumber')}
            type="password"
          />
          <Style.PasswordInputBasic
            value={password.secondNumber || ''}
            onChange={(e) => handlePasswordChange(e, 'secondNumber')}
            type="password"
          />
          <Dot />
          <Dot />
        </AutoFocusInputContainer>
      </Style.PasswordInputBox>
    </InputContainer>
  );
};

const Style = {
  PasswordInputBox: styled(InputBox)`
    width: 50%;
    background-color: transparent;
    justify-content: space-between;
  `,
  PasswordInputBasic: styled(InputBasic)`
    width: 20%;
  `,
};
