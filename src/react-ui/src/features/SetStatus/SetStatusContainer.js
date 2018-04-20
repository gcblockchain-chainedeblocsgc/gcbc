import { connect } from 'react-redux';
import SetStatus from './SetStatus';
import * as actions from '../../redux/modules/setStatus';

const mapStateToProps = ({ setStatus }) => ({
  isFetching: setStatus.isFetching,
  error: setStatus.error
});

export default connect(mapStateToProps, actions)(SetStatus);