import { LineSvgProps, ResponsiveLine } from "@nivo/line";

export interface LineChartProps {
  data: LineSvgProps["data"];
}

export const LineChart = ({ data }: LineChartProps) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
    xScale={{ type: "linear" }}
    yScale={{ type: "linear" }}
    yFormat=" >-.2f"
    curve="monotoneX"
    axisTop={null}
    axisRight={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: ".2s",
      legend: "",
      legendOffset: 0,
    }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: ".2f",
      legend: "price",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: ".2s",
      legend: "volume",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    enableGridX={false}
    colors={{ scheme: "spectral" }}
    lineWidth={1}
    pointSize={4}
    pointColor={{ theme: "background" }}
    pointBorderWidth={1}
    pointBorderColor={{ from: "serieColor" }}
    pointLabel="data.yFormatted"
    pointLabelYOffset={-12}
    enableTouchCrosshair={true}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 140,
        translateY: 0,
        itemsSpacing: 2,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 12,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);
