import { Link, useParams } from "react-router-dom";
import { AiFeed } from "../modules/conversation/components/AiFeed";
import { Button } from "../components/Button";
import { ChartSpline, SquarePen } from "lucide-react";
import { nanoid } from "nanoid";
import { Logo } from "../components/Logo";

const EmptyConversation = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className=" bg-gray-50 text-gray-700 rounded-3xl p-8">
        <div className="flex flex-row gap-4">
          <ChartSpline className="w-16 h-16 animate-fadeIn opacity-0 bg-white rounded-3xl p-4" />

          <div
            className="text-3xl font-bold pt-4 text-center animate-fadeIn opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            Welcome to All for One.
          </div>
        </div>

        <p
          className="text-lg pl-20 max-w-lg animate-fadeIn opacity-0"
          style={{ animationDelay: "1.2s" }}
        >
          Start building <strong>your personal dashboard</strong>. Your first
          AI-powered chart is just a click away.
        </p>
      </div>
    </div>
  );
};

export const ConversationsId = () => {
  const { id } = useParams();

  return (
    <main className="h-full py-4 pt-20 max-w-4xl mx-auto relative">
      <div className="absolute top-4 right-4 flex flex-row justify-between gap-2 w-full items-center">
        <Logo />
        <Button as={Link} to={`/c/${nanoid()}`} icon={<SquarePen />}>
          Start over
        </Button>
      </div>

      <AiFeed id={id!} key={id!} emptyState={<EmptyConversation />} />
    </main>
  );
};
