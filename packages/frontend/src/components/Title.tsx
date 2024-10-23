export interface TitleProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
}

const tagClasses = {
  h1: "text-2xl font-bold",
  h2: "text-xl font-bold",
  h3: "text-lg font-bold",
};

export interface TitleProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  description?: React.ReactNode;
}

export const Title = ({
  children,
  as: Root = "h1",
  description,
}: TitleProps) => {
  if (description) {
    return (
      <div>
        <Root className={tagClasses[Root]}>{children}</Root>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }

  return <Root className={tagClasses[Root]}>{children}</Root>;
};
