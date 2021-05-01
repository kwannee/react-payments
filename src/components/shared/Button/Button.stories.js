import Button from '.';
import { MINT } from '../../../constants/palette';

export default {
  component: Button,
  title: 'Common/Button',
};

const Template = args => <Button {...args}>다음</Button>;

export const Default = Template.bind({});
Default.args = {
  color: MINT[500],
};