import {sendMessageActionCreator} from '../../Redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';


let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    // isAuth: state.auth.isAuth
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageText) => {
      dispatch(sendMessageActionCreator(newMessageText));
    },
  };
};

// compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   withAuthRedirect
// )(Dialogs)

// let AuthRedirectComponent = withAuthRedirect(Dialogs)

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

// export default DialogsContainer;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)
