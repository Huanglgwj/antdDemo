import * as React from 'react';
import { Menu } from 'antd';
import { Link ,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import MenuIcon from '@/assets/menuIcon'
interface menuProps {
    menuList: object[];
    history:any
}
// 过滤type =2隐藏的菜单
function checkMenu(list: object[]) {
    return list.filter((item: objectKey) => {
        if (item._child && item._child.length > 0) {
            item._child = checkMenu(item._child);
        }
        if (item.type === 1) {
            return item;
        }
    });
}
// 菜单icon
const IconHtml = (props:objectKey)=>{
    const {id} = props
    const _MenuIcon:objectKey = MenuIcon
    const name = 'Id'+id;
    const nameActive = 'Id'+id+'Active';
    return (
        <>
        <i className='menu-icon default-icon anticon anticon-appstore' style={{backgroundImage:`url(${_MenuIcon[name]})`}}></i>
        <i className='menu-icon active-icon anticon anticon-appstore' style={{backgroundImage:`url(${_MenuIcon[nameActive]})`}}></i>
        </>
    )
}
const MenuContent = (props: menuProps) => {
    let { menuList = [] ,history} = props;
    const [_menuList,setmenuList] = React.useState<objectKey[]>([])
    const pathname:string = (history && history.location) ? history.location.pathname : ''
    // 默认选中的菜单
    let selectedKeys:string[] = [pathname]
    // 默认展开的菜单
    let defaultOpenKeys:string[] = ['']
    React.useEffect(()=>{
        setmenuList(checkMenu(menuList))
    },[menuList])
    return (
        <Menu selectedKeys={selectedKeys} defaultOpenKeys={defaultOpenKeys} mode="inline" className="fs-15">
            {_menuList.map((item: objectKey) => {
                if (item._child && item._child.length > 0) {
                    return (
                        <Menu.SubMenu key={item.id} icon={<IconHtml id={item.id}/>} title={item.name}>
                            {item._child.map((itemChild: objectKey) => {
                                return (
                                    <Menu.Item key={'/'+itemChild.act}>
                                        <Link to={'/'+itemChild.act}>{itemChild.name}</Link>
                                    </Menu.Item>
                                );
                            })}
                        </Menu.SubMenu>
                    );
                } else {
                    return (
                    <Menu.Item key={'/'+item.act} icon={<IconHtml id={item.id}/>}>
                            <Link to={'/'+item.act}>{item.name}</Link>
                        </Menu.Item>
                    );
                }
            })}
        </Menu>
    );
};
function mapStateToProps(state: objectKey) {
    return {
        menuList: state.reducerMenu.menuList,
    };
}
export default withRouter(connect(mapStateToProps)(MenuContent));
