import { ResponsiveLine } from "@nivo/line";
import type { Layer, LineSvgProps } from "@nivo/line";
import {
  AxisTickSize,
  AxisTickPadding,
  LegendOffset,
  LightTextColor,
} from "./constants";
import { Tooltip } from "./Tooltip";
import { ActivePoint } from "./ActivePoint";
import { customizedTheme } from "./styles";

export interface LineChartProps {
  data: LineSvgProps["data"];
}

const CustomLegend = ({ data }: LineChartProps) => {
  return (
    <ul className="list-none overflow-x-scroll">
      {data.map((d) => (
        <li key={d.id} className="flex flex-row items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: d.color }}
          />
          {d.id}
        </li>
      ))}
    </ul>
  );
};

export const LineChart = ({ data }: LineChartProps) => (
  <div className="relative h-full w-full flex flex-row gap-0">
    <ResponsiveLine
      data={data}
      curve="natural"
      lineWidth={1}
      margin={{ top: 4, right: 8, bottom: 40, left: 8 }}
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
      pointSize={0}
      crosshairType="x"
      enableSlices="x"
      enablePointLabel={false}
      enableArea={false}
      areaBlendMode="normal"
      areaBaselineValue={0}
      isInteractive
      areaOpacity={0}
      pointLabel=""
      colors={(p) => p.color}
      sliceTooltip={Tooltip}
      tooltip={() => null}
      enableGridY={true}
      enableCrosshair={true}
      pointColor={{ from: "color", modifiers: [] }}
      pointBorderColor={"transparent"}
      pointBorderWidth={0}
      enablePoints={false}
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
          "crosshair",
          "slices",
          "mesh",
          "legends",
          ActivePoint,
        ] as Array<Layer>
      }
    />

    <div className="shrink-0">
      <CustomLegend data={data} />
    </div>
  </div>
);
