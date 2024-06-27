import { ParentSize } from "@visx/responsive";
import dayjs from "dayjs";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Chart } from "./Chart";

const ResponsiveGridLayout = WidthProvider(ReactGridLayout);

function App() {
  return (
    <div>
      <ResponsiveGridLayout cols={12} rowHeight={40} width={1200}>
        {data[0].charts?.map((chartCard) => (
          <div key={chartCard.id} data-grid={chartCard.position}>
            <ParentSize debounceTime={10}>
              {({ width, height }) => (
                <Chart
                  width={width}
                  height={height}
                  actualsEndMonth={dayjs().format("YYYY-MM")}
                  data={chartCard.dataGroups}
                  months={months}
                />
              )}
            </ParentSize>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;

const months = [
  "2023-01",
  "2023-02",
  "2023-03",
  "2023-04",
  "2023-05",
  "2023-06",
  "2023-07",
  "2023-08",
  "2023-09",
  "2023-10",
  "2023-11",
  "2023-12",
  "2024-01",
  "2024-02",
  "2024-03",
  "2024-04",
  "2024-05",
  "2024-06",
  "2024-07",
  "2024-08",
  "2024-09",
  "2024-10",
  "2024-11",
  "2024-12",
];

const data = [
  {
    __typename: "Dashboard",
    createdAt: "2024-06-27T00:11:08Z",
    entityId: "B513CBEE-DB33-11EE-B276-ACDE48001122",
    id: "C0B9F6A0-3419-11EF-B341-ACDE48001122",
    name: "Dashboard",
    updatedAt: "2024-06-27T00:11:08Z",
    charts: [
      {
        __typename: "Chart",
        createdAt: "2024-06-27T00:11:08Z",
        dashboardId: "C0B9F6A0-3419-11EF-B341-ACDE48001122",
        id: "C0BE4B4C-3419-11EF-B341-ACDE48001122",
        updatedAt: "2024-06-27T00:11:08Z",
        name: "Income vs Expense",
        position: {
          __typename: "Position",
          h: 6,
          w: 6,
          x: 0,
          y: 0,
        },
        dataGroups: [
          {
            __typename: "DataGroup",
            id: "c0bc49fa-3419-11ef-b341-acde48001122",
            type: "Bar",
            data: [
              {
                __typename: "Data",
                accountId: "4",
                color: "#6A5B9B",
                id: "c0bc4ba8-3419-11ef-b341-acde48001122",
                name: "Income",
                reportId: "1",
                reportItemId: null,
                monthData: [
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2023-01",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2023-02",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2023-03",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2023-04",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2023-05",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2023-06",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2023-07",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2023-08",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2023-09",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2023-10",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2023-11",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2023-12",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2024-01",
                  },
                  {
                    __typename: "MonthData",
                    actual: 100000,
                    forecast: 0,
                    month: "2024-02",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-03",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-04",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-05",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-06",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-07",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-08",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-09",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-10",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-11",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-12",
                  },
                ],
              },
            ],
          },
          {
            __typename: "DataGroup",
            id: "c0bc4cca-3419-11ef-b341-acde48001122",
            type: "Bar",
            data: [
              {
                __typename: "Data",
                accountId: "7",
                color: "#C480FF",
                id: "c0bc4d7e-3419-11ef-b341-acde48001122",
                name: "Expense",
                reportId: "1",
                reportItemId: null,
                monthData: [
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2023-01",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2023-02",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2023-03",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2023-04",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2023-05",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2023-06",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2023-07",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2023-08",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2023-09",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2023-10",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2023-11",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2023-12",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2024-01",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2024-02",
                  },
                  {
                    __typename: "MonthData",
                    actual: 207850,
                    forecast: 0,
                    month: "2024-03",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-04",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-05",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-06",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-07",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-08",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-09",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-10",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-11",
                  },
                  {
                    __typename: "MonthData",
                    actual: 0,
                    forecast: 0,
                    month: "2024-12",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        __typename: "Chart",
        createdAt: "2024-06-27T00:11:08Z",
        dashboardId: "C0B9F6A0-3419-11EF-B341-ACDE48001122",
        id: "C0C3BBF4-3419-11EF-B341-ACDE48001122",
        updatedAt: "2024-06-27T00:11:08Z",
        name: "Bank Balance",
        position: {
          __typename: "Position",
          h: 6,
          w: 6,
          x: 6,
          y: 0,
        },
        dataGroups: [
          {
            __typename: "DataGroup",
            id: "c0c2c30c-3419-11ef-b341-acde48001122",
            type: "Line",
            data: [
              {
                __typename: "Data",
                accountId: null,
                color: "#5091F3",
                id: "c0c2c4e2-3419-11ef-b341-acde48001122",
                name: "Available Starting Balance",
                reportId: "1",
                reportItemId: "1",
                monthData: [
                  {
                    __typename: "MonthData",
                    actual: -14489604,
                    forecast: -14955074,
                    month: "2023-01",
                  },
                  {
                    __typename: "MonthData",
                    actual: -14955074,
                    forecast: -15392764,
                    month: "2023-02",
                  },
                  {
                    __typename: "MonthData",
                    actual: -15392764,
                    forecast: -15837614,
                    month: "2023-03",
                  },
                  {
                    __typename: "MonthData",
                    actual: -15837614,
                    forecast: -16278884,
                    month: "2023-04",
                  },
                  {
                    __typename: "MonthData",
                    actual: -16278884,
                    forecast: -16720154,
                    month: "2023-05",
                  },
                  {
                    __typename: "MonthData",
                    actual: -16720154,
                    forecast: -17161424,
                    month: "2023-06",
                  },
                  {
                    __typename: "MonthData",
                    actual: -17161424,
                    forecast: -17602694,
                    month: "2023-07",
                  },
                  {
                    __typename: "MonthData",
                    actual: -17602694,
                    forecast: -18043964,
                    month: "2023-08",
                  },
                  {
                    __typename: "MonthData",
                    actual: -18043964,
                    forecast: -18485234,
                    month: "2023-09",
                  },
                  {
                    __typename: "MonthData",
                    actual: -18485234,
                    forecast: -18926504,
                    month: "2023-10",
                  },
                  {
                    __typename: "MonthData",
                    actual: -18926504,
                    forecast: -19367774,
                    month: "2023-11",
                  },
                  {
                    __typename: "MonthData",
                    actual: -19367774,
                    forecast: -19809044,
                    month: "2023-12",
                  },
                  {
                    __typename: "MonthData",
                    actual: -19809044,
                    forecast: -20250314,
                    month: "2024-01",
                  },
                  {
                    __typename: "MonthData",
                    actual: -20250314,
                    forecast: -20691584,
                    month: "2024-02",
                  },
                  {
                    __typename: "MonthData",
                    actual: -20691584,
                    forecast: -21100700,
                    month: "2024-03",
                  },
                  {
                    __typename: "MonthData",
                    actual: -21100700,
                    forecast: 90600,
                    month: "2024-04",
                  },
                  {
                    __typename: "MonthData",
                    actual: 90600,
                    forecast: 90600,
                    month: "2024-05",
                  },
                  {
                    __typename: "MonthData",
                    actual: 90600,
                    forecast: 90600,
                    month: "2024-06",
                  },
                  {
                    __typename: "MonthData",
                    actual: 90600,
                    forecast: 90600,
                    month: "2024-07",
                  },
                  {
                    __typename: "MonthData",
                    actual: 90600,
                    forecast: 90600,
                    month: "2024-08",
                  },
                  {
                    __typename: "MonthData",
                    actual: 90700,
                    forecast: 90700,
                    month: "2024-09",
                  },
                  {
                    __typename: "MonthData",
                    actual: 90800,
                    forecast: 90800,
                    month: "2024-10",
                  },
                  {
                    __typename: "MonthData",
                    actual: 90900,
                    forecast: 90900,
                    month: "2024-11",
                  },
                  {
                    __typename: "MonthData",
                    actual: 91000,
                    forecast: 91000,
                    month: "2024-12",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    endMonth: "2024-12",
    startMonth: "2023-01",
  },
];
