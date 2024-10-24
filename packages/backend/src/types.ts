export type AiContext = Array<{
  role: "user" | "assistant";
  content: string;
}>;

// Keep this and copy paste it in the prompt
export type LineChartOutput = {
  id: string;
  type: "lineChart";
  title: string;
  data: Array<{
    id: string;
    color: string;
    data: Array<{
      x: number | string | Date;
      y: number;
    }>;
  }>;
};

export type ParagraphOutput = {
  id: string;
  title: string;
  type: "paragraph";
  data: string;
  color: string;
};

export type PieChartOutput = {
  id: string;
  type: "pieChart";
  title: string;
  data: Array<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
};

export type FormattedResponse =
  | LineChartOutput
  | ParagraphOutput
  | PieChartOutput;

export type ExpectedOutput = FormattedResponse[];

export type PersistentChart = {
  id: string;
  title: string;
  sqlQuery: string;
  type: "lineChart" | "pieChart" | "paragraph" | "mapChart";
};

export type Suggestion = {
  title: string;
  type: "lineChart" | "pieChart" | "paragraph" | "mapChart";
};

export type ConversationEntry = FormattedResponse & { isResponse?: boolean };

export type Conversation = {
  id: string;
  messages: Array<ConversationEntry>;
};
