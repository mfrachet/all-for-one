import { Section, SectionHeader } from "../components/Section";
import { Title } from "../components/Title";
import { BadgeDollarSign, ChartLine, ChartPie } from "lucide-react";
import { SuggestionList } from "../modules/charts/components/SuggestionList";
import { useCharts } from "../modules/charts/contexts/useCharts";
import { useSuggestions } from "../modules/charts/contexts/useSuggestions";
import { ChartFactory } from "../components/ChartFactory";
import { ActionFunction } from "react-router-dom";
import { pinUnpinChart } from "../modules/charts/services/pinUnpinChart";

export const dashboardIndexAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const chartId = formData.get("chartId")?.toString() ?? "";

  await pinUnpinChart(chartId);

  return null;
};

export const DashboardIndex = () => {
  const { charts } = useCharts();
  const { suggestions, isLoading } = useSuggestions();

  const paragraphs = charts.filter((c) => c.type === "paragraph");
  const lineCharts = charts.filter(
    (c) => c.type === "lineChart" || c.type === "mapChart"
  );
  const pieCharts = charts.filter((c) => c.type === "pieChart");

  const chartGridCss = "grid grid-cols-3 gap-4 pb-4";

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
          {paragraphs.length > 0 && (
            <div className="flex flex-row gap-4 pb-4">
              {paragraphs.map((p) => (
                <ChartFactory chart={p} key={p.id} />
              ))}
            </div>
          )}

          <SuggestionList
            isLoading={isLoading}
            suggestions={suggestions.filter(
              (suggestion) => suggestion.type === "paragraph"
            )}
          />
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
          {lineCharts.length > 0 && (
            <div className={chartGridCss}>
              {lineCharts.map((c) => (
                <ChartFactory chart={c} key={c.id} />
              ))}
            </div>
          )}

          <SuggestionList
            isLoading={isLoading}
            suggestions={suggestions.filter(
              (suggestion) =>
                suggestion.type === "lineChart" ||
                suggestion.type === "mapChart"
            )}
          />
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
          {pieCharts.length > 0 && (
            <div className={chartGridCss}>
              {pieCharts.map((c) => (
                <ChartFactory chart={c} key={c.id} />
              ))}
            </div>
          )}

          <SuggestionList
            isLoading={isLoading}
            suggestions={suggestions.filter(
              (suggestion) => suggestion.type === "pieChart"
            )}
          />
        </Section>
      </div>
    </>
  );
};
