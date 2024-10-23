import { Section, SectionHeader } from "../components/Section";
import { Title } from "../components/Title";
import { BigStat } from "../components/BigStat";
import { LineChart } from "../components/charts/LineChart/LineChart";
import { ChartCard } from "../components/ChartCard";
import { getCharts } from "../modules/charts/services/getCharts";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { AiResponseEntry } from "../types";
import { PieChart } from "../components/charts/PieChart/PieChart";
import { BadgeDollarSign, ChartLine, ChartPie } from "lucide-react";
import { SuggestionList } from "../modules/charts/components/SuggestionList";

export const dashboardIndexLoader: LoaderFunction = async () => {
  const charts = await getCharts();

  return { charts };
};

export const DashboardIndex = () => {
  const { charts } = useLoaderData() as { charts: Array<AiResponseEntry> };

  const paragraphs = charts.filter((c) => c.type === "paragraph");
  const lineCharts = charts.filter((c) => c.type === "lineChart");
  const pieCharts = charts.filter((c) => c.type === "pieChart");

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
          <SuggestionList suggestions={["All", "All", "All", "All"]} />

          <div className="flex flex-row gap-4">
            {paragraphs.map((p) => (
              <BigStat key={p.id} title="title" value={p.data} color="red" />
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
          <SuggestionList suggestions={["All", "All", "All", "All"]} />

          <div className={chartGridCss}>
            {lineCharts.map((c) => (
              <ChartCard key={c.id} title={"Evolutin of the trends"}>
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
          <SuggestionList suggestions={["All", "All", "All", "All"]} />

          <div className={chartGridCss}>
            {pieCharts.map((c) => (
              <ChartCard key={c.id} title={"Evolutin of the trends"}>
                <PieChart data={c.data} />
              </ChartCard>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
};