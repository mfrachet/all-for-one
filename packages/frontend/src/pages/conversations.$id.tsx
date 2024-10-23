import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { AiFeed } from "../modules/conversation/components/AiFeed";
import { Button } from "../components/Button";
import { SquarePen } from "lucide-react";

export const ConversationsId = () => {
  const { id } = useParams();

  return (
    <>
      <Navbar>
        <li>
          <Button icon={<SquarePen />}>New conversation</Button>
        </li>
      </Navbar>

      <main className="h-full py-4 pt-20">
        <AiFeed id={id!} />
      </main>
    </>
  );
};
