import React from 'react';
import classes from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {

  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateUserStatus(this.state.status)
  }

  onStatusChange = (event) => {
    this.setState({
      status: event.currentTarget.value
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
    console.log('componentDidUpdate')
  }

  render() {
    return (
      <div>
        {!this.state.editMode && 
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || 'No Status'}</span>
          </div>
        }

        {this.state.editMode && 
          <div>
            <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
          </div>
        }
      </div>
    );
  }
}
export default ProfileStatus;
