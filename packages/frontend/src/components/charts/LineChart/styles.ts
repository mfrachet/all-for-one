import { LineSvgProps } from "@nivo/line";
import {
  LightTextColor,
  LightDashedGridColor,
  LegendFontSize,
} from "./constants";

export const customizedTheme = (): LineSvgProps["theme"] => ({
  axis: {
    ticks: {
      text: {
        fill: LightTextColor,
      },
    },
  },
  crosshair: {
    line: {
      stroke: LightDashedGridColor,
      strokeWidth: 1,
    },
  },
  grid: {
    line: {
      stroke: LightDashedGridColor,
      strokeWidth: 0.5,
    },
  },
  legends: {
    text: {
      fontSize: LegendFontSize,
    },
  },
});
