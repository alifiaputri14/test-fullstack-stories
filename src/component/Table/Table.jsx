// Table.jsx
import React from "react";

const Table = ({ data, columns, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.field}
                className="py-2 px-4 border-b border-gray-300 font-semibold text-gray-700 text-left"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              {columns.map((column) => (
                <td
                  key={column.field}
                  className="py-2 px-4 border-b border-gray-300 text-left"
                >
                  {column.field === "action" ? (
                    column.render(item, onEdit, onDelete)
                  ) : column.field.includes(".") ? (
                    column.field.split(".").reduce((acc, prop) => acc && acc[prop], item)
                  ) : (
                    item[column.field]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
