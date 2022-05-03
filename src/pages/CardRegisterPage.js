import React, { useState, useEffect, useReducer } from 'react';

import { cardInfoReducer } from '../reducer/cardInfo';

import { COMPONENTS, initialCardInfo, CARD_TYPES } from '../constants/card';

import { CardExpireDateInputForm } from '../components/CardRegister/CardExpireDateInputForm';
import { CardNumbersInputForm } from '../components/CardRegister/CardNumbersInputForm';
import { CardOwnerInputForm } from '../components/CardRegister/CardOwnerInputForm';
import { CardPasswordInputForm } from '../components/CardRegister/CardPasswordInputForm';
import { CVCInputForm } from '../components/CardRegister/CVCInputForm';
import { CardSelectModal } from '../components/CardRegister/CardSelectModal';
import { CVCHelperModal } from '../components/CardRegister/CVCHelperModal';
import { Button } from '../components/common/Button';
import { PageTitle } from '../components/common/PageTitle';
import { ModalSelector } from '../components/common/ModalSelector';
import { useModalSelector } from '../hooks/useModalSelector';
import { CardPreview } from '../components/CardRegister/CardPreview';
import {
  isValidCardNumbersInput,
  isValidCVCInput,
  isValidExpireDateInput,
  isValidPasswordInput,
} from '../utils/validators/cardInput';

export const CardRegisterPage = () => {
  const [cardInfo, dispatch] = useReducer(cardInfoReducer, initialCardInfo);

  const [openedModalComponent, openModal, closeModal] = useModalSelector();

  const [allCompleted, setAllCompleted] = useState(false);
  const [checkInputCompleted, setCheckInputCompleted] = useState({
    cardNumbers: false,
    cardExpireDate: false,
    cardCVC: false,
    cardPassword: false,
    cardType: false,
  });

  useEffect(() => {
    const isCompleted = isValidCardNumbersInput(cardInfo.cardNumbers);
    if (isCompleted === checkInputCompleted[COMPONENTS.NUMBERS]) {
      return;
    }

    setCheckInputCompleted((prev) => ({
      ...prev,
      [COMPONENTS.NUMBERS]: isCompleted,
    }));

    if (isCompleted) {
      openModal(COMPONENTS.CARD_TYPE);
    }
  }, [cardInfo.cardNumbers]);

  useEffect(() => {
    setCheckInputCompleted((prev) => ({
      ...prev,
      [COMPONENTS.EXPIRE_DATE]: isValidExpireDateInput(cardInfo.expireDate),
    }));
  }, [cardInfo.expireDate]);

  useEffect(() => {
    setCheckInputCompleted((prev) => ({
      ...prev,
      [COMPONENTS.PASSWORD]: isValidPasswordInput(cardInfo.password),
    }));
  }, [cardInfo.password]);

  useEffect(() => {
    setCheckInputCompleted((prev) => ({
      ...prev,
      [COMPONENTS.CVC]: isValidCVCInput(cardInfo.CVC),
    }));
  }, [cardInfo.CVC]);

  useEffect(() => {
    setAllCompleted(Object.values(checkInputCompleted).every((check) => check));
  }, [checkInputCompleted]);

  return (
    <>
      <PageTitle>카드 추가</PageTitle>
      <CardPreview
        cardInfo={cardInfo}
        onClick={() => openModal(COMPONENTS.CARD_TYPE)}
      />
      <CardNumbersInputForm
        cardType={cardInfo.cardType}
        cardNumbers={cardInfo.cardNumbers}
        onCardNumbersInput={dispatch}
      />
      <CardExpireDateInputForm
        expireDate={cardInfo.expireDate}
        onExpireDateInput={dispatch}
      />
      <CardOwnerInputForm
        ownerName={cardInfo.ownerName}
        onOwnerNameInput={dispatch}
      />
      <CVCInputForm
        CVC={cardInfo.CVC}
        onCVCInput={dispatch}
        openModal={() => openModal(COMPONENTS.CVC)}
      />
      <CardPasswordInputForm
        password={cardInfo.password}
        onPasswordInput={dispatch}
      />
      <ModalSelector selected={openedModalComponent} closeModal={closeModal}>
        <CardSelectModal
          name={COMPONENTS.CARD_TYPE}
          cardTypes={CARD_TYPES}
          closeModal={closeModal}
          onCardType={dispatch}
        />
        <CVCHelperModal name={COMPONENTS.CVC} />
      </ModalSelector>

      <Button disabled={allCompleted ? false : true}>다음</Button>
    </>
  );
};
