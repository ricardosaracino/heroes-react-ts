import * as React from 'react';

import {Snackbar} from 'material-ui';

import {connect} from 'react-redux';


interface INotificationProps {
    notification: {message: string}
}

// getting here
const mapStateToProps = (state: INotificationProps) => {
    return {message: state.notification.message, open: true};
};

interface INotificationState {
    open: boolean,
    message?: string;
}

class Notification extends React.Component<{}, INotificationState> {

    constructor(props: any) {
        super(props);
        this.state = {open: false};
    }

    public componentWillReceiveProps(nextProps: any) {
        if (nextProps.message) {
            this.setState({message: nextProps.message, open:true})
        }
    }

    public closeNotification() {
        this.setState({open: false})
    }

    public render() {
        return (

            <Snackbar
                open={this.state.open}
                autoHideDuration={10}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id='message-id'>{this.state.message}</span>}
            />
        )
    }
}

export default connect(mapStateToProps)(Notification);