// 用户信息reducer
import { getStorage, setStorage } from '@/utils/util';
// 缓存的用户数据
let defaultUserInfo = getStorage('userInfo') || {};
const defaultState = {
    userInfo: defaultUserInfo,
    routerHistory:null
};
function reducerUser(state = defaultState, action: objectKey) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        // 设置用户数据
        case 'SETUSERINFO':
            setStorage('userInfo', action.values, 1);
            newState.userInfo = action.values;
            return newState;
        // 设置路由history对象
        case 'SETROUTERHISTORY':
                setStorage('routerHistory', action.values, 1);
                newState.routerHistory = action.values;
            return newState;
        default:
            return newState;
    }
}
export default reducerUser;
