export interface PieChartTextProps {
  centerX: number;
  centerY: number;
  title: string;
  description: string;
}

export const PieChartText = ({
  centerX,
  centerY,
  title,
  description,
}: PieChartTextProps) => {
  const mainTextColor = "rgba(0, 0, 0)";
  const secondTextColor = "rgba(0, 0, 0, 0.59)";

  return (
    <g transform={`translate(${centerX}, ${centerY})`}>
      <text
        y="-6px"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "24px",
          fontWeight: "600",
          fill: mainTextColor,
        }}
      >
        {title}
      </text>
      <text
        y="14"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "12px",
          fill: secondTextColor,
        }}
      >
        {description}
      </text>
    </g>
  );
};
