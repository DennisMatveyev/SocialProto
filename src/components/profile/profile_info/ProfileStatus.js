import React from 'react';


// See ProfileStatusWithHooks.js for comparing
class ProfileStatus extends React.Component {
    state = { editMode: false, status: this.props.status };

    activateEditMode() {
        // setState is ASYNC method
        this.setState({ editMode: true } )
    };

    deactivateEditMode() {
        this.setState({ editMode: false } );
        this.props.updateUserProfileStatus(this.state.status)
    };

    onStatusChange(e) {
        this.setState({ status: e.currentTarget.value } )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // This IF is very important, otherwise it would have lead to infinite updating
        if (prevProps.status !== this.props.status) {
            this.setState({ status: this.props.status })
        }
    }

    render() {
        return (
            <div>
                { !this.state.editMode &&
                  <div>
                    <span onDoubleClick={ this.activateEditMode.bind(this) }>
                        { this.props.status }
                    </span>
                  </div>
                }
                { this.state.editMode &&
                  <div>
                    <input autoFocus={ true }
                           onChange={ this.onStatusChange.bind(this) }
                           onBlur={ this.deactivateEditMode.bind(this) }
                           value={ this.state.status } />
                  </div>
                }
            </div>
        );
    }
}


export default ProfileStatus;