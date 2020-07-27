import React from 'react';
import { Breadcrumb } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
const MainBreadcrumb = (props: objectKey) => {
    const { history, menuList } = props;
    const [breadCrumb, setBreadCrumb] = React.useState<object[]>([]);

    // 路由改变修改面包屑
    React.useEffect(() => {
        if (history && history.location && history.location.pathname) {
            toSetBreadCrumb(history.location.pathname);
        } else {
            setBreadCrumb([{ path: '', name: '首页' }]);
        }
        // 监听路由改变修改面包屑
        history.listen((route: objectKey) => {
            toSetBreadCrumb(route.pathname);
        });
    }, []);
    // 设置面包屑
    function toSetBreadCrumb(path: string) {
        const _menuList = JSON.parse(JSON.stringify(menuList));
        // 递归菜单列表，根据路由获取对应层级
        function RecursionMenuList(list: objectKey[]) {
            let inPathItem: objectKey[] = [];
            (list || []).filter((item: objectKey) => {
                // 如果有子级，继续递归子级
                if (item._child) {
                    const backInPathItem = RecursionMenuList(item._child);

                    // 如果子级有返回有数据的数组，则把自己加入
                    if (backInPathItem && backInPathItem.length > 0) {
                        const act = item.act ? '/' + item.act : '';
                        inPathItem = [{ path: act, name: item.name }, ...backInPathItem];
                    }
                }
                // 如果路由一样，则是最后一级
                if (item.act && path === '/' + item.act) {
                    inPathItem.push({ path: '/' + item.act, name: item.name });
                }
            });
            return inPathItem;
        }
        const breadCrumbList: objectKey[] = RecursionMenuList(_menuList);
        setBreadCrumb(breadCrumbList);
    }
    // 上一页
    function goBack() {
        if (history.go) {
            history.go(-1);
        }
    }
    return (
        <>
            <div className="dis-flex flex-items-center flex-1">
                <div
                    onClick={goBack}
                    style={{
                        width: '30px',
                        height: '30px',
                        textAlign: 'center',
                        lineHeight: '30px',
                        borderRadius: '50%',
                        background: '#F7F7F7',
                        cursor: 'pointer',
                    }}
                >
                    <ArrowLeftOutlined style={{ fontWeight: 'bold', color: '#333333' }} />
                </div>
                <span style={{ color: '#333333', fontWeight: 'bold', paddingLeft: '15px' }}>当前位置：</span>
                <Breadcrumb style={{ margin: '16px 0' }} separator=">">
                    {(breadCrumb || []).map((item: objectKey) => (
                        <Breadcrumb.Item key={item.name}>{item.name}</Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
        </>
    );
};
function mapStateToProps(state: objectKey) {
    return {
        menuList: state.reducerMenu.menuList,
    };
}
export default connect(mapStateToProps)(withRouter(MainBreadcrumb));
