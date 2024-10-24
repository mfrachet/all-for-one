import f from "./features.json";
import { ChoroplethProps, ResponsiveChoropleth } from "@nivo/geo";

export interface MapChartProps {
  data: ChoroplethProps["data"];
}

export const MapChart = ({ data }: MapChartProps) => (
  <ResponsiveChoropleth
    data={data}
    features={f.features}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    colors="nivo"
    domain={[0, 1000000]}
    unknownColor="#666666"
    label="properties.name"
    valueFormat=".2s"
    projectionTranslation={[0.5, 0.5]}
    projectionRotation={[0, 0, 0]}
    enableGraticule={true}
    graticuleLineColor="#dddddd"
    borderWidth={0.5}
    borderColor="#152538"
  />
);
