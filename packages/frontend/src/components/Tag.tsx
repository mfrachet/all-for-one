export interface TagProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Tag = ({ children, onClick }: TagProps) => {
  return (
    <button
      type="button"
      className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full cursor-pointer border border-gray-200 hover:bg-gray-200 active:bg-gray-300 hover:border-gray-300 active:border-gray-400"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
