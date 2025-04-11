'use client'
import {PageContainer, ProCard, ProLayout} from '@ant-design/pro-components';
import React from "react";
import useSWR from "swr";
import {ConfigProvider, Dropdown, message, Spin, theme, ThemeConfig} from "antd";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Icon from "@/app/components/Icon";
import { getFetcher } from '../utils/fetcher';
import { url } from 'inspector';

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


const primaryColor = "#0060b7";
const menuBgColor = "#1A1A1A"

const themeConfig: ThemeConfig = {
    cssVar: true,
    algorithm: [theme.defaultAlgorithm],
    token: {
        borderRadius: 4,
        colorPrimary: primaryColor,
        fontSize: 13,
        colorLink: primaryColor,
        colorText: 'rgba(51, 51, 51, 1)',
        colorBgLayout: '#ecf1f5',
        paddingXS: 15,
    },
    components: {
        Modal: {
        },
        Menu: {
            // subMenuItemBorderRadius: 4,
            // itemBorderRadius: 4,
            // itemBg: menuBgColor,
            // itemColor: '#ffffffb3',
            // itemSelectedBg: menuBgColor,
            // itemSelectedColor: '#FFFFFF',
            // subMenuItemBg: '#000000',
            // itemActiveBg: menuBgColor,
            // itemHoverColor: 'rgb(255, 255, 255)',
            // itemMarginInline: 15,
        },
        Input: {},
        Button: {
            controlHeight: 30,
            paddingBlock: 0,
            contentLineHeight: 1,
        },
        Pagination: {},
        Table: {
            cellPaddingBlock: 12,
            borderColor: '#cfdbfa',
            headerBg: 'rgba(4, 66, 225, 0.08)',
        },
        Card: {
            paddingLG: 15,
        },
        Layout: {
            siderBg: 'red',
            headerPadding: 20,
            headerHeight: 56,
        },
    },
};


const Layout = ({children}: { children: React.ReactNode }) => {
    const {data, error, isLoading} = useSWR({url: '/menu/tree'}, getFetcher)
    const [ _, contextHolder] = message.useMessage();

    const pathname = usePathname()

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
        <>
            {contextHolder}
            <ConfigProvider theme={themeConfig}>

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
                            request: async () => {
                                return (data?.data || []).map((item: any) => ({
                                    path: item.url,
                                    name: item.name,
                                    icon: <Icon name={item.icon}/>,
                                    routes: item.children?.map((child: any) => ({
                                        path: child.url,
                                        name: child.name,
                                        icon: <Icon name={item.icon}/>,
                                    }))
                                }));
                            },
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
                                                    icon: <Icon name="LogoutOutlined" />,
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
                                <Icon name="GithubFilled" key="GithubFilled"
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
            </ConfigProvider>
        </>
    );
};

export default Layout;

