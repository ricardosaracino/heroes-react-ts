import * as React from 'react';

import Snackbar from 'material-ui/Snackbar';


interface INotificationState {
    open: boolean,
    message?: string;
}

// https://redux.js.org/basics/example-todo-list
// https://stackoverflow.com/questions/41386427/showing-snackbar-with-react-redux

class Notification extends React.Component<{},INotificationState>{

    constructor(props: any) {
        super(props);
        this.state = {open: false};
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.sending) {
            this.setState({ open: true })
        } else {
            this.setState({ open: false })
        }
    }

    closeNotification(){
        this.setState({ open: false })
    }

    render() {
        return (
            <Snackbar
                open={this.state.open}
                autoHideDuration={8000}
                SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                }}

                message={<span id='message-id'>{this.state.message}</span>}
            />
        )
    }
}

export default Notification