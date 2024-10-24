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
};

type ParagraphOutput = {
  id: string;
  title: string;
  type: "paragraph";
  data: string;
  color: string;
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
};

export type ConversationResponse =
  | LineChartOutput
  | ParagraphOutput
  | PieChartOutput;

export type Conversation = {
  id: string;
  messages: Array<AiResponseEntry>;
};
