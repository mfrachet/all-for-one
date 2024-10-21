import { SquarePen } from "lucide-react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { Container } from "./Container";

export const Navbar = () => {
  return (
    <nav className="fixed top-4 w-full">
      <Container>
        <div className="flex justify-between items-center">
          <Logo />
          <Button as={Link} to={`/c/${nanoid()}`} icon={<SquarePen />}>
            New conversation
          </Button>
        </div>
      </Container>
    </nav>
  );
};
