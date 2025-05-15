'use client'
import classNames from 'classnames';
import {
  BarSeriesOption,
  ComposeOption,
  DatasetComponentOption,
  GaugeSeriesOption,
  GridComponentOption,
  LineSeriesOption,
  PieSeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts';
import { BarChart, GaugeChart, LineChart, PieChart } from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import {
  CSSProperties,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export type ComponentOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | GaugeSeriesOption
>;

const charts = [BarChart, LineChart, PieChart, GaugeChart];
const component = [
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
];

echarts.use([
  ...charts,
  ...component,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const Chart = forwardRef(
  (
    {
      option,
      style,
      className,
    }: {
      option: ComponentOption;
      style?: CSSProperties;
      className?: string;
    },
    ref,
  ) => {
    const chartRef = useRef(null);

    useImperativeHandle(ref, () => ({
      setOption: (newOption: ComponentOption, opts: any) => {
        if (chartRef.current) {
          const chart = echarts.getInstanceByDom(chartRef.current);
          if (chart) {
            chart.setOption(newOption, opts);
          }
        }
      },
    }));

    useEffect(() => {
      const chart = echarts.init(chartRef.current);
      chart.setOption(option);

      const resizeChart = () => {
        chart.resize();
      };

      const resizeObserver = new ResizeObserver(resizeChart);

      if (chartRef.current) {
        resizeObserver.observe(chartRef.current);
      }

      return () => {
        chart.dispose();
        resizeObserver.disconnect();
      };
    }, [option]);

    return (
      <div
        ref={chartRef}
        style={{ width: '100%', height: '100%', ...style }}
        className={classNames('charts-box', className)}
      ></div>
    );
  },
);

export default Chart;
