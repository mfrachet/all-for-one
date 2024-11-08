import { ResponsiveLine } from "@nivo/line";
import type { Layer, LineSvgProps } from "@nivo/line";
import { AxisTickSize, AxisTickPadding } from "./constants";
import { Tooltip } from "./Tooltip";
import { ActivePoint } from "./ActivePoint";
import { customizedTheme } from "./styles";
import { formatDate } from "../../../modules/misc/helpers/formatDate";

export interface LineChartProps {
  data: LineSvgProps["data"];
}

const margin = 60;

export const LineChart = ({ data }: LineChartProps) => {
  const mappedData = data.map((item) => ({
    ...item,
    data: item.data.map((d) => ({
      ...d,
      x: new Date(d.x as string),
    })),
  }));
  return (
    <ResponsiveLine
      data={mappedData}
      curve="monotoneX"
      lineWidth={2}
      margin={{ top: margin, right: margin, bottom: margin + 30, left: margin }}
      xScale={{ type: "time" }}
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
        tickRotation: -45,
        tickValues: 8,
        format: (value) => formatDate(value),
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
  );
};
