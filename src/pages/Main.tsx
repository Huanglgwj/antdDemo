import * as React from 'react';
import { useState } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Menu from './Menu';
import RouterList from '@/router/RouterList';
import MainBreadcrumb from './MainBreadcrumb';
import MainAvatar from './MainAvatar';
import './Main.less';
let _MenuList:any = null
const Main = (props: objectKey) => {
    const { history, userInfo,setHistory } = props;
    React.useEffect(()=>{ 
        if(!userInfo || Object.keys(userInfo).length<=0){
            return history.replace('/admin/login')
        }
        // 设置路由history到redux 
        setHistory(history)
    },[])
    // 获取路由列表
    _MenuList = _MenuList || RouterList.getMainMenu();
    // 菜单栏收缩展开
    const [collapsed, setCollapse] = useState(false);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* {菜单栏} */}
            {/* trigger={<LeftSquareFilled />} */}
            <Layout.Sider collapsible collapsed={collapsed} onCollapse={() => setCollapse(!collapsed)} width="180">
                <div className="main-logo">后台</div>
                <Menu />
            </Layout.Sider>
            {/* {主体内容} */}
            <Layout className="site-layout">
                <Layout.Header
                    className="site-layout-background dis-flex flex-items-center flex-space-between"
                    style={{ padding: '0 20px' }}
                >
                    <MainBreadcrumb />
                    <MainAvatar />
                </Layout.Header>
                <Layout.Content>
                    <div
                        className="site-layout-background main-content"
                    >
                        {(_MenuList||[]).map((item:any) => (
                            <Route
                                key={item.key || item.path}
                                exact={item.exact === undefined ? true : item.exact}
                                component={item.component}
                                path={item.path}
                            ></Route>
                        ))}
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};
function mapStateToProps(state: objectKey) {
    return {
        userInfo:state.reducerUser.userInfo
    };
}
function mapDispatchToProps(dispatch:any,ownProps:any){
    return {
        setHistory:(values:any)=>{
            dispatch({
                type:'SETROUTERHISTORY',
                values:values
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);
