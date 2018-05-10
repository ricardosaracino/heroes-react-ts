interface INotificationAction {
    type: string,
    message: string
}

const notification = (state = [], action: INotificationAction) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {...state, message: action.message};

        default:
            return state;
    }
}
​
export default notification;