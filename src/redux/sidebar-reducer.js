let initialState = {};

// !!! Редюсер, как и любая другая чистая функция (например последняя в цепочке функциональня компонента)
// не должен изменять приходящие аргументы, а возвращать копию стейта.
// (Чистая функция должна просто сформировать jsx на основе пришедших props.
const sidebarReducer = (state = initialState, action) => {
    return state;
};

export default sidebarReducer;
