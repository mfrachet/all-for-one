import { Send } from "lucide-react";
import { useRef } from "react";

export const QuestionInput = ({
  onSubmit,
}: {
  onSubmit: (input: string) => void;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const question = formData.get("question")?.toString() || "";
    form.reset();

    onSubmit(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      btnRef.current?.click();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className="flex relative"
    >
      <label className="sr-only">Search for something</label>
      <textarea
        className="w-full px-4 py-2 text-lg rounded-3xl bg-gray-100 resize-none flex pr-16"
        minLength={0}
        name="question"
        placeholder="Ask a question about your data"
      />

      <button
        type="submit"
        ref={btnRef}
        className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center absolute right-4 top-2"
      >
        <Send className="w-6 h-6 text-white" />
      </button>
    </form>
  );
};
