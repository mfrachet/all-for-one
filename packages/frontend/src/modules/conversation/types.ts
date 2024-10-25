import { AiResponseEntry } from "../../types";

type LineChartOutput = {
  id: string;
  title: string;
  type: "lineChart";
  data: Array<{
    id: string;
    color: string;
    data: Array<{
      x: number;
      y: number;
    }>;
  }>;
  sqlQuery?: string;
};

type ParagraphOutput = {
  id: string;
  title: string;
  type: "paragraph";
  data: string;
  color: string;
  sqlQuery?: string;
};

type PieChartOutput = {
  id: string;
  title: string;
  type: "pieChart";
  data: Array<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
  sqlQuery?: string;
};

export type MapChartOutput = {
  id: string;
  type: "mapChart";
  title: string;
  data: Array<{
    id: string;
    value: number;
    color: string;
  }>;
  sqlQuery?: string;
};

export type TableOutput = {
  id: string;
  type: "table";
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<Record<string, any>>;
  sqlQuery?: string;
};

export type ConversationResponse =
  | LineChartOutput
  | ParagraphOutput
  | PieChartOutput
  | MapChartOutput
  | TableOutput;

export type Conversation = {
  id: string;
  messages: Array<AiResponseEntry>;
};
