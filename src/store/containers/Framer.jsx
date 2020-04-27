import Framer from '@/component/framer';

import { connect } from 'react-redux';

const props = state => ({
  userInfo: state.user.userInfo
});
export default connect(
  props
)(Framer);
