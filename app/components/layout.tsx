'use client'
import {GithubFilled, LogoutOutlined,} from '@ant-design/icons';
import {PageContainer, ProCard, ProLayout} from '@ant-design/pro-components';
import React from "react";
import {Dropdown, Spin} from "antd";
import useMenu from "@/app/hooks/useMenu";
import Link from "next/link";
import {usePathname} from "next/navigation";

const bgLayoutImgList = [
    {
        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
        left: 85,
        bottom: 100,
        height: '303px',
    },
    {
        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
        bottom: -68,
        right: -45,
        height: '303px',
    },
    {
        src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
        bottom: 0,
        left: 0,
        width: '331px',
    },
]

const logo = 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg'

const layoutToken = {
    sider: {

    }
}


const Layout = ({children}: { children: React.ReactNode }) => {
    const {menus, error, isLoading} = useMenu()
    const pathname = usePathname()
    console.log('layout')

    if (error || isLoading) {
        return (
            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Spin delay={0} size='large'/>
            </div>
        );
    }

    return (
        <div
            id="layout"
            style={{
                height: '100vh',
            }}
        >
            <ProLayout
                fixSiderbar
                logo={logo}
                siderWidth={216}
                bgLayoutImgList={bgLayoutImgList}
                loading={isLoading}
                menu={{
                    loading: isLoading,
                    request: async () => menus,
                }}
                siderMenuType='sub'
                location={{
                    pathname,
                }}
                layout='side'
                token={layoutToken}
                avatarProps={{
                    src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                    title: '七妮妮',
                    size: 'small',
                    render: (props, dom) => {
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'logout',
                                            icon: <LogoutOutlined/>,
                                            label: '退出登录',
                                        },
                                    ],
                                }}
                            >
                                {dom}
                            </Dropdown>
                        );
                    }
                }}

                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    if (typeof window === 'undefined') return [];
                    return [
                        <GithubFilled key="GithubFilled"
                                      onClick={() => (window.open('https://github.com/ant-design/ant-design-pro-layout'))}/>,
                    ];
                }}
                menuItemRender={(item, dom) => (
                    <Link href={item.path || '/'}>
                        {dom}
                    </Link>
                )}
            >
                <PageContainer
                    ghost
                    title=''
                    header={{
                        breadcrumb: {},
                    }}>
                    <ProCard
                    >
                        {children}
                    </ProCard>
                </PageContainer>
            </ProLayout>
        </div>
    );
};

export default Layout;
