import { ResponsivePie } from "@nivo/pie";

export interface PieChartProps {
  data: Array<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
}

export const PieChart = ({ data }: PieChartProps) => {
  return (
    <div className="w-full h-full relative">
      <div className="flex flex-row items-center absolute left-4 bottom-4 gap-2">
        <div className="text-xs text-gray-500">Total:</div>
        <div className="text-xs font-bold">
          {data.reduce((acc, curr) => acc + curr.value, 0)}
        </div>
      </div>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        colors={{ datum: "data.color" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        fill={[
          {
            match: {
              id: "*",
            },
            id: "lines",
          },
        ]}
      />
    </div>
  );
};
