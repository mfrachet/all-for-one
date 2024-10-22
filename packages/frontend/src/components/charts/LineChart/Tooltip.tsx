import type { Point, SliceTooltipProps } from "@nivo/line";
import type { ReactNode } from "react";

type LineChartPoint = { data: Point["data"] & { Icon?: ReactNode } } & Point;

export const Tooltip = ({ slice }: SliceTooltipProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 min-w-[200px] px-2 py-1">
      <p className="font-bold text-sm p-0 m-0 text-xs capitalize">
        {String(slice.points[0].data.x)}
      </p>

      <ul className="flex flex-col list-none p-0 m-0 text-xs">
        {slice.points.map((point: LineChartPoint) => (
          <li
            key={point.id}
            className="flex flex-row items-center gap-2 p-0 m-0 text-sm text-gray-700 capitalize"
          >
            <div
              className="w-4 h-4 rounded border-2 border-white"
              style={{ background: point.serieColor }}
            />
            {point.serieId}:
            <div>
              <strong>{point.data.yFormatted}</strong>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
