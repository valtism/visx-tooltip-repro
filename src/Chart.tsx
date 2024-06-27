import { AxisBottom } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { LegendLabel, LegendOrdinal } from "@visx/legend";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { Bar, BarStack, LinePath } from "@visx/shape";
import { defaultStyles, useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { max, min } from "@visx/vendor/d3-array";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useSize } from "./useSize";

type TooltipData = {
  month: string;
  lineData: {
    id: string;
    name: string;
    color: string;
    actual: number;
  }[];
  barData: {
    id: string;
    bars: {
      id: string;
      name: string;
      color: string;
      actual: number;
    }[];
  }[];
};

const defaultMargin = { top: 10, right: 10, bottom: 25, left: 10 };

const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface ChartProps {
  width: number;
  height: number;
  data: any;
  months: readonly string[];
  actualsEndMonth?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
}
export function Chart({
  width,
  height,
  data,
  months,
  actualsEndMonth = "2024-03",
  margin = defaultMargin,
}: ChartProps) {
  const [legendRef, { height: legendHeight }] = useSize();

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom - legendHeight;

  const lineData = data.filter((d) => d.type === "Line");
  const barData = data.filter((d) => d.type === "Bar");

  const lines = lineData
    .filter((line) => line.data.length)
    .map((line) => {
      return {
        id: line.data[0].id,
        name: line.data[0].name,
        color: line.data[0].color,
        data: months.map((month) => {
          const monthDatum = line.data[0].monthData.find(
            (d) => d.month === month,
          );
          return {
            month,
            actual: monthDatum?.actual || 0,
            forecast: monthDatum?.forecast || 0,
          };
        }),
      };
    });

  const barStackGroups = barData.map((barGroup) => {
    return {
      id: barGroup.id,
      keys: barGroup.data.map((d) => d.id),
      names: barGroup.data.reduce<Record<string, string>>((names, barData) => {
        names[barData.id] = barData.name;
        return names;
      }, {}),
      colors: barGroup.data.reduce<Record<string, string>>(
        (colors, barData) => {
          colors[barData.id] = barData.color;
          return colors;
        },
        {},
      ),
      data: months.map((month) => ({
        month,
        ...barGroup.data.reduce<Record<string, number>>((bars, barData) => {
          const barMonthData = barData.monthData.find((d) => d.month === month);
          const isForecast = dayjs(month).isAfter(dayjs(actualsEndMonth));
          const barAmount = isForecast
            ? barMonthData?.forecast
            : barMonthData?.actual;
          bars[barData.id] = barAmount || 0;
          return bars;
        }, {}),
      })),
    };
  });

  const lineTotals = lines.reduce<number[]>((totals, lineGroup) => {
    lineGroup.data.forEach((datum) => {
      totals.push(datum.actual);
    });
    return totals;
  }, []);

  const barStackTotals = barStackGroups.reduce<number[]>((totals, barStack) => {
    barStack.data.forEach((datum) => {
      // Split into positive and negative totals to account for negative bars reaching downwards
      const positiveTotals = barStack.keys
        // @ts-expect-error Can't type a Record with a fixed property of a different type
        .filter((key) => datum[key] > 0)
        // @ts-expect-error
        .reduce((sum, key) => sum + datum[key], 0);
      const negativeTotals = barStack.keys
        // @ts-expect-error
        .filter((key) => datum[key] < 0)
        // @ts-expect-error
        .reduce((sum, key) => sum + datum[key], 0);
      totals.push(positiveTotals);
      totals.push(negativeTotals);
    });
    return totals;
  }, []);

  const lineColors = lines.map((line) => ({
    id: line.id,
    name: line.name,
    color: line.color,
  }));

  const barColors = barStackGroups.reduce<
    { id: string; name: string; color: string }[]
  >((colors, barStack) => {
    barStack.keys.forEach((key) => {
      colors.push({
        id: key,
        name: barStack.names[key],
        color: barStack.colors[key],
      });
    });
    return colors;
  }, []);

  const allColors = [...lineColors, ...barColors];

  const barGroupKeys = barData.map((barGroup) => barGroup.id);

  const allTotals = lineTotals.concat(barStackTotals);

  // scales
  const dateBandScale = useMemo(
    () =>
      scaleBand({
        range: [margin.left, innerWidth + margin.left],
        domain: months.map((month) => month),
        padding: 0.2,
      }),
    [innerWidth, margin.left, months],
  );
  const amountLinearScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight + margin.top, margin.top],
        domain: [
          Math.min(min(allTotals, (total) => total) || 0, 0),
          max(allTotals, (total) => total) || 0,
        ],
      }),
    [allTotals, innerHeight, margin.top],
  );
  const groupBandScale = scaleBand({
    range: [0, dateBandScale.bandwidth()],
    domain: barGroupKeys,
    padding: 0,
  });
  const colorOrdinalScale = scaleOrdinal({
    domain: allColors.map((d) => d.id),
    range: allColors.map((d) => ({ color: d.color, name: d.name })),
  });

  const { TooltipInPortal, containerRef } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  });

  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } =
    useTooltip<TooltipData>();

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-white shadow"
      ref={containerRef}
    >
      <svg width={width} height={height - legendHeight} className="bg-white">
        <AxisBottom
          scale={dateBandScale}
          top={innerHeight + margin.top}
          hideTicks
          axisLineClassName="stroke-bg-2"
          tickLabelProps={{
            fill: "#828385",
            fontFamily: "var(--preferred-sans)",
            fontWeight: "600",
            fontSize: 13,
            transform: "translate(0, -4)",
          }}
          // Scale number of ticks to size of labels
          numTicks={width / 38}
          tickFormat={(d) => dayjs(d.valueOf()).format("MMM")}
        />

        {tooltipData && (
          <rect
            x={
              (dateBandScale(tooltipData.month) || 0) +
              dateBandScale.bandwidth() / 2
            }
            y={margin.top}
            width={2}
            height={innerHeight}
            fill="#E6E6E6"
          />
        )}

        <Group>
          {barStackGroups.map((barStackGroup, i) => (
            <BarStack
              key={i}
              data={barStackGroup.data}
              keys={barStackGroup.keys}
              x={(d) => d.month}
              xScale={dateBandScale}
              yScale={amountLinearScale}
              color={(key) => barStackGroup.colors[key]}
              offset="diverging"
            >
              {(barStacks) =>
                barStacks.map((barStack) =>
                  barStack.bars.map((bar) => (
                    <Bar
                      key={`${bar.key}-${bar.index}`}
                      x={bar.x + (groupBandScale(barStackGroup.id) || 0)}
                      y={bar.y}
                      height={bar.height}
                      className="stroke-white stroke-2"
                      width={groupBandScale.bandwidth()}
                      fill={bar.color}
                    />
                  )),
                )
              }
            </BarStack>
          ))}
        </Group>

        {lines.map((line) => (
          <LinePath
            key={line.id}
            data={line.data}
            x={(d) =>
              (dateBandScale(d.month) || 0) + dateBandScale.bandwidth() / 2
            }
            y={(d) => amountLinearScale(d.actual)}
            strokeWidth={2}
            stroke={line.color}
            curve={curveMonotoneX}
          />
        ))}

        <Bar
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          onPointerMove={(event) => {
            const { x, y } = localPoint(event) || { x: 0, y: 0 };
            const step = dateBandScale.step();
            const months = dateBandScale.domain();
            const bandPadding = dateBandScale(months[0])!;
            const monthIndex = Math.floor((x - bandPadding) / step);
            const month = months[monthIndex];

            if (!month) return;

            const lineData = lines.map((line) => ({
              id: line.id,
              name: line.name,
              color: line.color,
              actual: line.data.find((d) => d.month === month)?.actual || 0,
            }));

            const barData = barStackGroups.map((barStackGroup) => ({
              id: barStackGroup.id,
              bars: barStackGroup.keys.map((barKey) => ({
                id: barKey,
                name: barStackGroup.names[barKey],
                color: barStackGroup.colors[barKey],
                actual:
                  // @ts-expect-error
                  barStackGroup.data.find((d) => d.month === month)?.[barKey] ||
                  0,
              })),
            }));

            const tooltipLeft = (dateBandScale(month) || 0) + step / 2;

            showTooltip({
              tooltipData: {
                month,
                lineData,
                barData,
              },
              tooltipLeft: tooltipLeft,
              tooltipTop: y,
            });
          }}
          onPointerLeave={() => hideTooltip()}
        />
      </svg>

      {tooltipData && (
        <TooltipInPortal
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={defaultStyles}
          className="z-[100] flex w-56 flex-col gap-2 !py-3 font-sans !shadow-xl"
        >
          <div className="font-bold">
            {dayjs(tooltipData.month).format("MMMM YYYY")}
          </div>
          <div className="overflow-auto">
            {tooltipData.lineData.map((line) => (
              <div
                key={line.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 overflow-auto">
                  <div
                    style={{
                      width: 16,
                      height: 2,
                      backgroundColor: line.color,
                      flexShrink: 0,
                    }}
                  />
                  <div title={line.id} className="truncate">
                    {line.name}
                  </div>
                </div>
                <div className="tabular-nums">
                  {currencyFormat.format(line.actual)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {tooltipData.barData.map((barGroup) => (
              <div key={barGroup.id}>
                {barGroup.bars.map((bar) => (
                  <div
                    key={bar.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 overflow-auto">
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          backgroundColor: bar.color,
                          flexShrink: 0,
                        }}
                      />
                      <div title={bar.id} className="truncate">
                        {bar.name}
                      </div>
                    </div>
                    <div className="tabular-nums">
                      {currencyFormat.format(bar.actual)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </TooltipInPortal>
      )}
      <div ref={legendRef} className="px-1 py-2">
        <LegendOrdinal scale={colorOrdinalScale}>
          {(labels) => (
            <div className="flex flex-wrap gap-2">
              {labels.map((label, i) => (
                <div
                  key={`legend-quantile-${i}`}
                  className="flex items-center gap-1.5 rounded-full bg-bg-1 px-3"
                >
                  <svg width={12} height={12}>
                    <rect
                      fill={label.value?.color}
                      width={12}
                      height={12}
                      rx={6}
                    />
                  </svg>
                  <LegendLabel align="left" margin="0 0 0 4px">
                    {label.value?.name}
                  </LegendLabel>
                </div>
              ))}
            </div>
          )}
        </LegendOrdinal>
      </div>
    </div>
  );
}
