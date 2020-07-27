// 菜单reducer
import { getStorage, setStorage } from '@/utils/util';
// 缓存的菜单数组
let defaultMenuList = getStorage('menuList') || [];
let defaultMenuListId = getMenuListID(defaultMenuList,[])
const defaultState = {
    menuList: defaultMenuList,
    menuListId: defaultMenuListId,
};
// 菜单提取id,用于判断权限
function getMenuListID(list: objectKey[], idArray: number[]) {
    list.filter((item: objectKey) => {
        idArray.push(item.id);
        if (item._child && item._child.length > 0) {
            getMenuListID(item._child, idArray);
        }
    });
    return idArray;
}
function reducerMenu(state = defaultState, action: objectKey) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        // 设置菜单
        case 'SETMENULIST':
            setStorage('menuList', action.values, 1);
            newState.menuList = action.values;
            newState.menuListId = getMenuListID(action.values,[]);
            return newState;
        default:
            return newState;
    }
}
export default reducerMenu;
