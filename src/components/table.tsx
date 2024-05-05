"use client";

import { SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

export interface IUser {
  name: string;
  email: string;
}

const columnHelper = createColumnHelper<IUser>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
  }),
];

interface TableProps {
  initialData: IUser[];
}

export const Table = ({ initialData }: TableProps) => {
  const [data, _] = useState<IUser[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headersGroup) => {
            return (
              <tr>
                {headersGroup.headers.map((header) => {
                  return <th onClick={() => header.column.toggleSorting()}>{flexRender(header.column.columnDef.header, header.getContext())}</th>;
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr>
                {row.getVisibleCells().map((cell) => {
                  return <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
