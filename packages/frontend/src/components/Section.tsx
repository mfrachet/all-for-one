import { ReactNode } from "react";

export interface SectionProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

export const Section = ({ children, title }: SectionProps) => {
  return (
    <section>
      <div className="pb-4">{title}</div>
      <div className="pl-6">{children}</div>
    </section>
  );
};

export interface SectionHeaderProps {
  children: React.ReactNode;
  as?: "h2" | "h3";
  description?: React.ReactNode;
  icon?: ReactNode;
}

export const SectionHeader = ({
  children,
  as: Tag = "h2",
  description,
  icon,
}: SectionHeaderProps) => {
  return (
    <div className="flex flex-row gap-2">
      {icon && <div className="[&>svg]:w-4 [&>svg]:h-4 pt-1">{icon}</div>}
      <div>
        <Tag className="text font-semibold text-gray-800">{children}</Tag>

        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
};
