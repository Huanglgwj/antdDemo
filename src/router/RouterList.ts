import Loadable from 'react-loadable';
import Loading from './RouterLoading';
import store from '@/redux/store';
import routerParams from './RouterParams'
const RouterParams:objectKey = routerParams
const RouterListIndex: any[] = [
    {
        path: '/admin/login',
        exact: false,
        component: Loadable({
            loader: () => import('@/pages/login'),
            loading: Loading,
        }),
    },
    {
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => import('@/pages/Main'),
            loading: Loading,
        })
    },
    {
        path: '/admin/',
        exact: false,
        component: Loadable({
            loader: () => import('@/pages/Main'),
            loading: Loading,
        })
    },
 
];
let RouterListMain: any[] = [
];
function getMainMenu(){
    const storeData: objectKey = store.getState();
    const menuList = storeData.reducerMenu.menuList || [];
    let RouterListMainAdd: any[] = [];
    // 已添加的菜单，用于去重
    let hasAddMenuList:string[] = []
    function addMenuList(list: any[]) {
        list.filter((item: objectKey,index:number) => {
            if ( item.act && !hasAddMenuList.includes(item.act)) {
                hasAddMenuList.push(item.act)
                // 替换admin或者\admin开头的路径
                let act = item.act.replace(/^admin||\/admin/, '');
                RouterListMainAdd.push({
                    path: `/${RouterParams[item.act] || item.act}`,
                    key:`${item.act}${index}`,
                    component: Loadable({
                        loader: () => import('@/pages' + act),
                        loading: Loading,
                    }),
                });
            }
            if (item._child && item._child.length > 0) {
                addMenuList(item._child);
            }
        });
    }
    addMenuList(menuList);
    return [...RouterListMain,...RouterListMainAdd]
}
export default { Index: RouterListIndex, Main: RouterListMain ,getMainMenu:getMainMenu};
