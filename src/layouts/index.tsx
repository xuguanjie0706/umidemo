import React from 'react';
import ProLayout, { getMenuData } from '@ant-design/pro-layout';
import { Link, connect } from 'umi';
import Icon, { HomeOutlined, createFromIconfontCN } from '@ant-design/icons';
// import { ConfigProvider } from 'antd';
// import zhCN from 'antd/es/locale/zh_CN';
// import logo from '@/assets/pro_icon.svg';

interface props {
  route: Route;
  children: any;
  collapsed: boolean;
  dispatch: any;
}
interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  path: string;
}
interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  path: string;
  [key: string]: any;
}

interface Route {
  path: string;
  routes: Array<{
    exact?: boolean;
    icon: string;
    name: string;
    path: string;
    // optional secondary menu
    children?: Route['routes'];
  }>;
}
// const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
//   return menuList.map(item => {
//     const localItem = {
//       ...item,
//       children: item.children ? menuDataRender(item.children) : [],
//     };
//     return Authorized.check(item.authority, localItem, null) as MenuDataItem;
//   });
// };
// const MyIcon = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_1186596_28kbipxildf.js', // 在 iconfont.cn 上生成
// });

const Custom = (props: props) => {
  // console.log(props);
  const { children, route, collapsed, dispatch } = props;
  console.log(route, collapsed, props);
  // const { breadcrumb, menuData } = getMenuData(
  //   route,
  //   // menu,
  //   // formatMessage,
  //   // menuDataRender,
  // );
  // console.log(breadcrumb, menuData);

  // const menuDataRender = (menuList: any[]) => {
  //   console.log(menuList);
  //   menuList.map(item => {
  //     const localItem = {
  //       ...item,
  //       children: item.children ? menuDataRender(item.children) : [],
  //     };
  //     // return localItem;
  //     // return Authorized.check(item.authority, localItem, null);
  //   });
  // };
  /* 控制菜单伸缩 */
  const handleMenuCollapse = (payload: any) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  return (
    <>
      <ProLayout
        // logo={logo}
        title="管理后台"
        //  menuHeaderRender={() => (
        //   <Link to="/">
        //     {collapsed ? 1 : 2}
        //     {/* <img src={collapsed ? logoSmall : logo} alt="" /> */}
        //   </Link>
        // )} // 菜单上方 title logo 只能选其一
        fixSiderbar
        loading={false}
        fixedHeader
        collapsed={collapsed}
        locale="zh-CN"
        // siderWidth={140}
        onCollapse={handleMenuCollapse}
        onPageChange={e => console.log(e)} //页面改变是执行
        // PageHeaderWrapper={{ content: '123' }}
        menuItemRender={(menuItemProps: any, defaultDom) => {
          console.log(menuItemProps, defaultDom);

          if (
            menuItemProps.isUrl ||
            menuItemProps.children ||
            !menuItemProps.path
          ) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: 'Home',
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        // menuDataRender={menuDataRender}
        iconfontUrl="//at.alicdn.com/t/font_1186596_28kbipxildf.js"
        // footerRender={<span>1232</span>}
        // menuItemRender={(menuItemProps, defaultDom) => {
        //   console.log(menuItemProps);

        //   if (
        //     menuItemProps.isUrl ||
        //     menuItemProps.children ||
        //     !menuItemProps.path
        //   ) {
        //     return defaultDom;
        //   }
        //   return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        // }}
        // menuDataRender={props.route.routes}
        // itemRender={(route, params, routes, paths) => {
        //   const first = routes.indexOf(route) === 0;
        //   return first ? (
        //     <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        //   ) : (
        //     <span>{route.breadcrumbName}</span>
        //   );
        // }}
        // menuProps
        route={route}
        // links={[() => <span>1236</span>]}
        // pageTitleRender={() => <p>123</p>}
        rightContentRender={() => <p>123</p>} // 导航栏上方（page 上方）
        // footerRender={() => <p>123</p>} // 导航栏上方（page 下方）
      >
        {children}
        {/* <ConfigProvider locale={zhCN}>{children}</ConfigProvider> */}
      </ProLayout>
    </>
  );
};

export default connect(({ global }) => ({
  collapsed: global.collapsed,
}))(Custom);
