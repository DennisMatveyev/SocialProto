// При диспатче стор будет отправлять экшены во все редюсеры, поэтому лучше
// обеспечить уникальность имен (например добавив имя редюсера)
const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';


let initialState = {
    dialogs: [
        {id:1, 'name': 'Dima'}, {id:2, 'name': 'Olya'}
    ],
    messages: [
        {id:1, 'msg': 'Hi'}, {id:2, 'msg': 'Yo'}
    ]
};
// !!! Редюсер, как и любая другая чистая функция (например последняя в цепочке функциональня компонента)
// не должен изменять приходящие аргументы, а возвращать копию стейта.
// (Чистая функция должна просто сформировать jsx на основе пришедших props.
const dialogsReducer = (state = initialState, action) => {
    // We cannot work with state object, we always have to create copy
    // and return copy if there is the case (if default -> return just state);
    // moreover !!! REMEMBER DEEP COPY !!!
    // One more thing - in every condition we ONLY copy attrs we are
    // going to change
    switch(action.type) {
        case SEND_MESSAGE: {
            let msg = action.msg;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: msg}]
            }
        }
        default: {
            return state;
        }
    }
};

export const sendMessageActionCreator = (msg) => ({type: SEND_MESSAGE, msg});

export default dialogsReducer;
