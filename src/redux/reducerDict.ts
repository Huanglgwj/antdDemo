// 字典reducer
const defaultState = {
    dictList: {},
};
function reducerDict(state = defaultState, action: objectKey) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        // 设置字典
        case 'SETMENULIST':
            const {name,value} = action.values
            newState.dictList[name] = value;
            return newState;
        default:
            return newState;
    }
}
export default reducerDict;
