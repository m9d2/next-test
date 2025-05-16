'use client'
import {CaretDownOutlined, CaretUpOutlined, EllipsisOutlined,} from '@ant-design/icons';
import {Button, Card, Col, Dropdown, MenuProps, Row, Segmented, Space, Statistic, theme,} from 'antd';
import * as echarts from 'echarts/core';
import {Suspense, useState} from 'react';
import styles from './index.module.scss';
import Chart, {ComponentOption} from "../chart";
import Skeleton from "./components/skeleton";

const {useToken} = theme;

const DataCardPanel = () => {
    const {token} = useToken();
    const colorPrimary = token?.colorPrimary;
    const valueStyle = {fontSize: '30px', fontWeight: 500};
    const option2: ComponentOption = {
        color: ['#c6a6f1'],
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            top: '0',
            containLabel: false,
        },
        xAxis: [
            {
                show: false,
                type: 'category',
                boundaryGap: false,
                data: [
                    '2024-01-03',
                    '2024-01-04',
                    '2024-01-05',
                    '2024-01-06',
                    '2024-01-07',
                    '2024-01-08',
                    '2024-01-09',
                ],
            },
        ],
        yAxis: [
            {
                type: 'value',
                show: false,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        series: [
            {
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 0,
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(128, 255, 165)',
                        },
                        {
                            offset: 1,
                            color: 'rgb(1, 191, 236)',
                        },
                    ]),
                },
                emphasis: {
                    focus: 'series',
                },
                data: [14120, 4320, 4620, 5120, 9120, 3120, 300],
            },
        ],
    };

    const option4: ComponentOption = {
        resize: true,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            top: '0',
            containLabel: false,
        },
        xAxis: {
            show: false,
            type: 'category',
            data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月',
            ],
        },
        yAxis: {
            show: false,
            type: 'value',
        },
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220, 301, 100, 300, 210, 390],
            },
        ],
        color: [colorPrimary],
    };

    const cards = [
        <Card key='1'>
            <div className={styles.title}>
                <span>总销售额</span>
                <Statistic valueStyle={valueStyle} value={126560} prefix="￥"/>
            </div>
            <div className={styles.chart}>
                <div>
                    <span>周同比</span>
                    <span style={{marginLeft: 8}}>12%</span>
                    <CaretUpOutlined className="red"/>
                </div>
                <div>
                    <span>日同比</span>
                    <span style={{marginLeft: 8}}>11%</span>
                    <CaretDownOutlined className="green"/>
                </div>
            </div>
            <div className={styles.footer}>
                <span>日销售额</span>
                <span>￥123,54</span>
            </div>
        </Card>,
        <Card key='2'>
            <div className={styles.title}>
                <span>访问量</span>
                <Statistic valueStyle={valueStyle} value={8846}/>
            </div>
            <div className={styles.chart}>
                <Chart option={option2}/>
            </div>
            <div className={styles.footer}>
                <span>日访问量</span>
                <span>1234</span>
            </div>
        </Card>,
        <Card key='3'>
            <div className={styles.title}>
                <span>支付笔数</span>
                <Statistic valueStyle={valueStyle} value={8846}/>
            </div>
            <div className={styles.chart}>
                <Chart option={option4}/>
            </div>
            <div className={styles.footer}>
                <span>转化率</span>
                <span>60%</span>
            </div>
        </Card>,
        <Card key='4'>
            <div className={styles.title}>
                <span>访问量</span>
                <Statistic valueStyle={valueStyle} value={8846}/>
            </div>
            <div className={styles.chart}>
                <div>
                    <span>周同比</span>
                    <span>12%</span>
                    <CaretUpOutlined className="red"/>
                </div>
                <div>
                    <span>日同比</span>
                    <span>11%</span>
                    <CaretDownOutlined className="green"/>
                </div>
            </div>
            <div className={styles.footer}>
                <span>日访问量</span>
                <span>1234</span>
            </div>
        </Card>,
    ];

    return (
        <Row gutter={[15, 15]}>
            {cards.map((card, index) => {
                const key = `col-${index}`;
                return (
                    <Col key={key} span={6}>
                        {card}
                    </Col>
                );
            })}
        </Row>
    );
};

const Dashboard = () => {
    const [options, setOptions] = useState<string[]>(['全部渠道', '线上', '门店']);
    const [value, setValue] = useState<string | number>('全部渠道');
    const {token} = useToken();
    const colorPrimary = token?.colorPrimary;

    const option: ComponentOption = {
        resize: true,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月',
            ],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220, 301, 100, 300, 210, 390],
            },
        ],
        color: [colorPrimary],
    };
    const option3: ComponentOption = {
        title: {
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: 1048, name: 'Search Engine'},
                    {value: 735, name: 'Direct'},
                    {value: 580, name: 'Email'},
                    {value: 484, name: 'Union Ads'},
                    {value: 300, name: 'Video Ads'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: '操作1',
        },
        {
            key: '2',
            label: '操作2',
        },
    ];
    const onChange = (value: string | number) => {
        setValue(value);
    };

    const extra = (
        <>
            <Segmented value={value} options={options} onChange={onChange}/>
            <Dropdown menu={{items}} placement="bottom">
                <Button type="link" className={styles.more}>
                    <EllipsisOutlined/>
                </Button>
            </Dropdown>
        </>
    );
    return (
        <Suspense fallback={<Skeleton/>}>
            <Space direction="vertical" style={{width: '100%'}}>
                <DataCardPanel/>
                <Card title="年销售额" extra={extra}>
                    <Chart option={option} style={{height: '400px'}}/>
                </Card>
                <Row gutter={[15, 15]} wrap>
                    <Col span={12}>
                        <Card title="年销售额" extra={extra}>
                            <Chart option={option} style={{height: '400px'}}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="推广渠道占比" extra={extra}>
                            <Chart option={option3} style={{height: '400px'}}/>
                        </Card>
                    </Col>
                </Row>
            </Space>
        </Suspense>
    );
};

export default Dashboard;
