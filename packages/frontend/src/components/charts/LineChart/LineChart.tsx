import { ResponsiveLine } from "@nivo/line";
import type { Layer, LineSvgProps } from "@nivo/line";
import { AxisTickSize, AxisTickPadding } from "./constants";
import { Tooltip } from "./Tooltip";
import { ActivePoint } from "./ActivePoint";
import { customizedTheme } from "./styles";

export interface LineChartProps {
  data: LineSvgProps["data"];
}

const CustomLegend = ({ data }: LineChartProps) => {
  return (
    <ul className="list-none overflow-x-scroll p-0 m-0 flex flex-col gap-2">
      {data.map((d) => (
        <li
          key={d.id}
          className="flex flex-row items-center gap-2 p-0 m-0 text-sm text-gray-700 capitalize"
        >
          <div
            className="w-4 h-4 rounded border-2 border-white"
            style={{ background: d.color }}
          />
          {d.id}
        </li>
      ))}
    </ul>
  );
};

const margin = 60;

export const LineChart = ({ data }: LineChartProps) => (
  <div className="relative h-full w-full flex flex-row gap-0">
    <ResponsiveLine
      data={data}
      curve="natural"
      lineWidth={2}
      margin={{ top: margin, right: margin, bottom: margin + 16, left: margin }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: AxisTickSize,
        tickPadding: AxisTickPadding,
        tickValues: 10,
      }}
      axisLeft={null}
      enableGridX={false}
      crosshairType="x"
      enableSlices="x"
      enablePointLabel={false}
      enableArea={false}
      areaBlendMode="normal"
      areaBaselineValue={0}
      areaOpacity={0}
      isInteractive
      colors={(p) => p.color}
      sliceTooltip={Tooltip}
      tooltip={() => null}
      enableGridY={true}
      enableCrosshair={true}
      pointSize={0}
      pointColor={{ from: "color", modifiers: [] }}
      pointBorderColor={"transparent"}
      pointBorderWidth={0}
      useMesh={true}
      debugMesh={false}
      debugSlices={false}
      theme={customizedTheme()}
      layers={
        [
          "grid",
          "axes",
          "areas",
          "lines",
          "points",
          "crosshair",
          "slices",
          "mesh",
          "legends",
          ActivePoint,
        ] as Array<Layer>
      }
    />

    <div className="shrink-0 bg-gray-50 p-4 flex items-center w-[160px]">
      <CustomLegend data={data} />
    </div>
  </div>
);
