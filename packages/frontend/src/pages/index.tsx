import { Section, SectionHeader } from "../components/Section";
import { Title } from "../components/Title";
import { BigStat } from "../components/BigStat";
import { LineChart } from "../components/charts/LineChart/LineChart";
import { ChartCard } from "../components/ChartCard";
import { PieChart } from "../components/charts/PieChart/PieChart";
import { BadgeDollarSign, ChartLine, ChartPie } from "lucide-react";
import { SuggestionList } from "../modules/charts/components/SuggestionList";
import { useCharts } from "../modules/charts/contexts/useCharts";
import { useSuggestions } from "../modules/charts/contexts/useSuggestions";

export const DashboardIndex = () => {
  const charts = useCharts();
  const suggestions = useSuggestions();

  const paragraphs = charts.filter((c) => c.type === "paragraph");
  const lineCharts = charts.filter((c) => c.type === "lineChart");
  const pieCharts = charts.filter((c) => c.type === "pieChart");

  const suggestionParagraphs = suggestions.filter(
    (s) => s.type === "paragraph"
  );
  const suggestionLineCharts = suggestions.filter(
    (s) => s.type === "lineChart"
  );
  const suggestionPieCharts = suggestions.filter((s) => s.type === "pieChart");

  const chartGridCss = "grid grid-cols-3 gap-4 pt-4";

  return (
    <>
      <Title description="Only the data you have pinned is showing here.">
        Your personal dashboard
      </Title>

      <div className="flex flex-col gap-24 pt-12">
        <Section
          title={
            <SectionHeader
              icon={<BadgeDollarSign />}
              as="h3"
              description="Here you can see the most important numbers for you."
            >
              Follow your important numbers
            </SectionHeader>
          }
        >
          <SuggestionList suggestions={suggestionParagraphs} />

          <div className="flex flex-row gap-4 pt-4">
            {paragraphs.map((p) => (
              <BigStat
                key={p.id}
                title={p.title}
                value={p.data}
                color={p.color}
              />
            ))}
          </div>
        </Section>

        <Section
          title={
            <SectionHeader
              as="h3"
              description="Here you can see the evolution of your trends."
              icon={<ChartLine />}
            >
              The evolution of your trends
            </SectionHeader>
          }
        >
          <SuggestionList suggestions={suggestionLineCharts} />

          <div className={chartGridCss}>
            {lineCharts.map((c) => (
              <ChartCard key={c.id} title={c.title}>
                <LineChart data={c.data} />
              </ChartCard>
            ))}
          </div>
        </Section>

        <Section
          title={
            <SectionHeader
              as="h3"
              description="Here you can see the repartition of your needs."
              icon={<ChartPie />}
            >
              The repartition of your needs
            </SectionHeader>
          }
        >
          <SuggestionList suggestions={suggestionPieCharts} />

          <div className={chartGridCss}>
            {pieCharts.map((c) => (
              <ChartCard key={c.id} title={c.title}>
                <PieChart data={c.data} />
              </ChartCard>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
};
