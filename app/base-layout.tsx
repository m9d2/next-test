"use client";
import React, {useState} from "react";
import {
    Badge,
    Button,
    ConfigProvider,
    Dropdown,
    Layout,
    Menu,
    MenuProps,
    Popover,
    Skeleton,
    theme,
    ThemeConfig,
} from "antd";
import {usePathname, useRouter} from "next/navigation";
import Icon from "@/app/components/Icon";
import {menuService} from "@/app/service";
import {
    BellOutlined,
    CompressOutlined,
    DownOutlined,
    ExpandOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import useSWR from "swr";
import Image from "next/image";
import useCollapsedStore from "@/app/hooks/useCollapsedStore";

const {Header, Sider} = Layout;
const logo = "https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg";

const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
};

const logoStyle: React.CSSProperties = {
    height: "32px",
    margin: "16px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffffb3",
};

const logoTextStyle: React.CSSProperties = {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 700,
};

const headerLeft: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
};
const headerRight: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
};

const primaryColor = "#3f78e0";
const menuBgColor = "#1a1a1a";

const themeConfig: ThemeConfig = {
    cssVar: true,
    algorithm: [theme.defaultAlgorithm],
    token: {
        borderRadius: 4,
        colorPrimary: primaryColor,
        fontSize: 13,
        colorLink: primaryColor,
        colorText: "rgba(51, 51, 51, 1)",
        colorBgLayout: "#ecf1f5",
        // colorBgLayout: "linear-gradient(#ffffff, #f5f5f5 28%)",
        paddingXS: 15,
    },
    components: {
        Menu: {
            subMenuItemBorderRadius: 4,
            itemBorderRadius: 4,
            itemBg: menuBgColor,
            itemColor: "#ffffffb3",
            itemSelectedBg: "#1a1a1a",
            itemSelectedColor: "#ffffff",
            subMenuItemBg: "#000",
            itemActiveBg: "#1a1a1a",
            itemHoverColor: "#fff",
            itemMarginInline: 15,
            subMenuItemSelectedColor: "#fff",
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
            borderColor: `rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(
                primaryColor.slice(3, 5),
                16
            )}, ${parseInt(primaryColor.slice(5, 7), 16)}, 0.3)`,
            headerBg: `rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(
                primaryColor.slice(3, 5),
                16
            )}, ${parseInt(primaryColor.slice(5, 7), 16)}, 0.08)`,
        },
        Card: {
            paddingLG: 15,
        },
        Layout: {
            siderBg: menuBgColor,
            headerPadding: 20,
            headerHeight: 56,
        },
    },
};

const SiderComponent = () => {
    const {collapsed} = useCollapsedStore()
    const pathname = usePathname();
    const router = useRouter();
    const {data, error, isLoading} = useSWR({}, menuService.getMenus);
    let menus = [];
    if (data) {
        menus = data.map((item: any) => ({
            key: item.url,
            label: item.name,
            icon: <Icon name={item.icon}/>,
            children: item.children?.map((child: any) => ({
                key: child.url,
                label: child.name,
                icon: child.icon ? <Icon name={child.icon}/> : null,
            })),
        }));
    }

    if (collapsed) {
        logoTextStyle.display = "none";
    } else {
        logoTextStyle.display = "block";
    }
    return <ConfigProvider
        theme={{
            components: {
                Skeleton: {
                    gradientFromColor: "rgba(255, 255, 255, 0.3)",
                    gradientToColor: "rgba(255, 255, 255, 0.2)",
                },
            },
        }}
    >
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={siderStyle}
        >
            <Skeleton loading={isLoading} active={true} paragraph={{rows: 6}} style={{padding: 16}}>
                <a style={logoStyle} href={"/"}>
                    <Image src={logo} width={32} height={32} alt={""}/>
                    {!collapsed && (
                        <span
                            style={{
                                marginLeft: 10,
                                fontSize: 20,
                                fontWeight: 700,
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                transition: "width 0.3s, opacity 0.3s",
                                width: collapsed ? 0 : "auto",
                                opacity: collapsed ? 0 : 1,
                            }}
                        >
                    Ant Design
                  </span>
                    )}
                </a>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    defaultOpenKeys={[
                        pathname.substring(0, pathname.lastIndexOf("/")),
                    ]}
                    items={menus}
                    onClick={(e) => {
                        router.push(e.key);
                    }}
                />
            </Skeleton>
        </Sider>
    </ConfigProvider>
};

const HeaderComponent = () => {
    const {collapsed, toggle} = useCollapsedStore()
    const [fullScreen, setFullScreen] = useState(false);
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: "退出登录",
            onClick: () => {
            },
        },
    ];

    const toggleFullScreen = () => {
        const element = document.documentElement;
        if (isFullScreen()) {
            document.exitFullscreen().then(() => {
                setFullScreen(false);
            });
        } else {
            element.requestFullscreen().then(() => {
                setFullScreen(true);
            });
        }
    };

    const isFullScreen = () => {
        return document.fullscreenElement;
    };
    return <ConfigProvider
        theme={{
            components: {
                Button: {
                    paddingInline: 8,
                    paddingBlock: 0,
                },
                Layout: {
                    headerPadding: 20,
                    headerHeight: 10,
                },
            },
        }}
    >
        <Layout
            style={{
                backgroundColor: "hsla(0,0%,100%,.8)",
                backdropFilter: "blur(8px)",
                display: "flex",
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "space-between",
                position: "absolute",
                top: 0,
                zIndex: 999,
                width: "100%",
                height: "64px",
                borderBottom: "1px solid #e8e8e8",
                paddingInline: 16,
            }}
        >
            <Button
                type="text"
                icon={
                    collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>
                }
                onClick={toggle}
                style={{
                    fontSize: "16px",
                }}
            />
            <div style={headerRight}>
                <Popover placement="bottom" trigger="click">
                    <Button className="scale-animated-wrapper" type="text">
                        <Badge dot={true}>
                            <BellOutlined className="scale-animated"/>
                        </Badge>
                    </Button>
                </Popover>
                <Button
                    className="scale-animated-wrapper"
                    type="text"
                    onClick={toggleFullScreen}
                >
                    {fullScreen ? (
                        <CompressOutlined className="scale-animated"/>
                    ) : (
                        <ExpandOutlined className="scale-animated"/>
                    )}
                </Button>
                <Dropdown menu={{items}}>
                    <Button type="text">
                        {"管理员"}
                        <DownOutlined/>
                    </Button>
                </Dropdown>
            </div>
        </Layout>
    </ConfigProvider>
};

const BaseLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <ConfigProvider theme={themeConfig}>
                <Layout style={{height: "100vh", display: "flex", flexDirection: "row"}}>
                    <SiderComponent/>
                    <Layout style={{position: "relative"}}>
                        <HeaderComponent/>
                        <Layout style={{overflow: "auto", padding: 16, paddingTop: 76}}>
                            {children}
                        </Layout>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </>
    );
};

export default BaseLayout;
