import { TableOutput } from "../../modules/conversation/types";

export interface TableProps {
  data: TableOutput["data"];
}

export const Table = ({ data }: TableProps) => {
  const hasData = data.length > 0;
  if (!hasData) {
    return <p className="text-gray-700">No data to display.</p>;
  }

  const firstRow = data[0];
  const columns = Object.keys(firstRow);

  return (
    <table className="w-full table-auto overflow-hidden -translate-y-px">
      <thead className="border-y border-gray-100">
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              className="bg-gray-50 text-gray-800 font-semibold text-sm capitalize py-2 px-4 border-r border-gray-100 last:border-r-0"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-b border-gray-100 last:border-b-0"
          >
            {columns.map((column, columnIndex) => (
              <td
                key={`${rowIndex}-${columnIndex}`}
                className="text-gray-600 text-sm py-2 px-4 border-r border-gray-100 last:border-r-0"
              >
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
