import { useHistory } from 'react-router-dom';
import { Container } from '../common/common.styles';
import Styled from './CardAddForm.styles';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import InputBox from '../../components/InputBox/InputBox';
import ToolTip from '../../components/ToolTip/ToolTip';
import PinNumberInput from '../../components/PinNumberInput/PinNumberInput';
import Button from '../../components/Button/Button';
import useInput from '../../hooks/useInput';

const CardAddForm = () => {
  const history = useHistory();

  const ownerName = useInput('');
  const CVC = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Header hasBackButton text="카드 추가" onClickBackButton={history.goBack} />
      <Styled.Container>
        <Card bgColor="#d2d2d2" ownerName="NAME" expiryDate="MM / YY" />
        <form onSubmit={handleSubmit}>
          <Styled.Row>
            <InputBox labelText="카드 번호" maxLength={16 + 9} textAlign="center" required />
          </Styled.Row>
          <Styled.Row>
            <Styled.ExpiryDate>
              <InputBox labelText="만료일" maxLength={4 + 3} textAlign="center" required />
            </Styled.ExpiryDate>
          </Styled.Row>
          <Styled.Row>
            <InputBox
              value={ownerName.value}
              onChange={ownerName.onChange}
              labelText="카드 소유자 이름 (선택)"
              maxLength={30}
              hasLengthCounter
            />
          </Styled.Row>
          <Styled.Row>
            <Styled.CVC>
              <InputBox
                type="password"
                pattern="[0-9]*"
                inputmode="numeric"
                value={CVC.value}
                onChange={CVC.onChange}
                labelText="보안 코드 (CVC/CVV)"
                maxLength={3}
                required
              />
            </Styled.CVC>
            <Styled.ToolTip>
              <ToolTip buttonText="?" contentText="카드 뒷면의 3자리 숫자를 입력해주세요" />
            </Styled.ToolTip>
          </Styled.Row>
          <Styled.Row>
            <PinNumberInput
              labelText="카드 비밀번호"
              values={['', '']}
              dotCount={2}
              errorMessage=""
              isError={false}
              required
            />
          </Styled.Row>
          <Styled.Row right>
            <Button>다음</Button>
          </Styled.Row>
        </form>
      </Styled.Container>
    </Container>
  );
};
export default CardAddForm;
