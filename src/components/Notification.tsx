import * as React from 'react';

import {connect} from 'react-redux';

import {IconButton, Snackbar, Theme} from 'material-ui';

import CloseIcon from '@material-ui/icons/Close';

import {StyleRules, WithStyles, withStyles} from 'material-ui/styles';


interface INotificationProps {
    notification: { message: string }
}

const mapStateToProps = (state: INotificationProps) => {
    return {message: state.notification.message, open: true};
};

interface IMessage {
    message: string,
    key: number
}

interface INotificationState {
    open: boolean,
    messageInfo: IMessage
}

class Notification extends React.Component<WithStyles<ComponentClassNames>, INotificationState> {

    private queue: IMessage[] = [];

    constructor(props: any) {

        super(props);

        this.state = {messageInfo: {message: '', key: 0}, open: false};

        this.handleClose = this.handleClose.bind(this);

        this.handleExited = this.handleExited.bind(this);
    }

    public componentWillReceiveProps(nextProps: any) {
        if (nextProps.message) {

            this.queue.push({
                message: nextProps.message,
                key: new Date().getTime(),
            });

            if (this.state.open) {
                // immediately begin dismissing current message
                // to start showing new one
                this.setState({open: false});
            } else {
                this.processQueue();
            }
        }
    }

    public processQueue() {
        if (this.queue.length > 0) {

            const m = this.queue[0];
            this.queue.shift();

            this.setState({
                messageInfo: m, // messageInfo: this.queue.shift(), type error IMessage | undefined
                open: true,
            });
        }
    }

    public handleClose() {
        this.setState({open: false});
    }

    public handleExited() {
        this.processQueue();
    }

    /**
     * https://material-ui-next.com/demos/snackbars/
     * @returns {any}
     */
    public render() {

        const {classes} = this.props;

        const {message, key} = this.state.messageInfo;

        return (

            <Snackbar
                key={key}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                onExited={this.handleExited}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>,
                ]}
            />
        );
    }
}

type ComponentClassNames =
    | 'close'

const style = (theme: Theme): StyleRules<ComponentClassNames> => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

export default connect(mapStateToProps)(withStyles(style)(Notification));