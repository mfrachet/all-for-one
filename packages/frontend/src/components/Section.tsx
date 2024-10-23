export interface SectionProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

export const Section = ({ children, title }: SectionProps) => {
  return (
    <section>
      <div className="pb-4">{title}</div>
      {children}
    </section>
  );
};

export interface SectionHeaderProps {
  children: React.ReactNode;
  as?: "h2" | "h3";
  description?: React.ReactNode;
}

export const SectionHeader = ({
  children,
  as: Tag = "h2",
  description,
}: SectionHeaderProps) => {
  if (description) {
    return (
      <div>
        <Tag className="text font-semibold text-gray-800">{children}</Tag>

        <p className="text-sm text-gray-500">{description}</p>
      </div>
    );
  }

  return <Tag className="text font-semibold text-gray-800">{children}</Tag>;
};
