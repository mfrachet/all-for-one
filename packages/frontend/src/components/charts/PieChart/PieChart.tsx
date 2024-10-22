import { ResponsivePie } from "@nivo/pie";
import { Tooltip, TooltipData } from "./Tooltip";
import { PieChartText } from "./PieChartText";
import { capitalize } from "../../../helpers/capitalize";

export interface PieChartProps {
  data: Array<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
}

type LayerProps = {
  centerX: number;
  centerY: number;
};

const ChartText = ({
  centerX,
  centerY,
  title,
}: LayerProps & { title: string }) => (
  <PieChartText
    centerX={centerX}
    centerY={centerY}
    title={title}
    description={"items counted"}
  />
);
const getChartText = (title: string) => (props: LayerProps) =>
  <ChartText {...props} title={title} />;

const margin = 60;

export const PieChart = ({ data }: PieChartProps) => {
  const count = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <ResponsivePie
      animate={false}
      colors={{ datum: "data.color" }}
      margin={{ top: margin, right: margin, bottom: margin + 16, left: margin }}
      data={data}
      innerRadius={0.6}
      padAngle={1}
      enableArcLinkLabels={true}
      enableArcLabels={true}
      arcLinkLabel={(d) => {
        return capitalize(d.data.label);
      }}
      legends={[]}
      layers={[
        "arcLabels",
        "arcLinkLabels",
        "legends",
        "arcs",
        getChartText(count.toString()),
      ]}
      tooltip={({ datum }) => <Tooltip datum={datum as TooltipData} />}
    />
  );
};
