import { MAX_LENGTH } from '../../constants/card';

export const isValidCardNumbersInput = (cardNumbers) =>
  Object.values(cardNumbers).every(
    (number) => number.length === MAX_LENGTH.EACH_CARD_NUMBER
  );

export const isValidExpireDateInput = ({ year, month }) => {
  if (year === '' || month === '') {
    return false;
  }

  const currentDate = new Date();
  const currentYear = String(currentDate.getFullYear()).slice(2, 4);
  const currentMonth = currentDate.getMonth() + 1;

  if (parseInt(year) < parseInt(currentYear)) {
    return false;
  }

  if (year === currentYear && parseInt(month) < currentMonth) {
    return false;
  }

  if (parseInt(month) > 12 || parseInt(month) < 1) {
    return false;
  }

  return true;
};

export const isValidPasswordInput = (password) =>
  Object.values(password).every((number) => number);

export const isValidCVCInput = (CVC) => CVC.length === MAX_LENGTH.CVC;
