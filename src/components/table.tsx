"use client";

import {
  ExpandedState,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { IUser } from "@/types/user";

const columnHelper = createColumnHelper<IUser>();

const columns = [
  columnHelper.accessor("id", {
    cell: ({ row }) => (
      <input
        {...{
          type: "checkbox",
          checked: row.getIsSelected(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
          disabled: !row.getCanSelect(),
        }}
      />
    ),
  }),
  columnHelper.accessor("subRows", {
    cell: ({ row }) => {
      return (
        <div style={{ paddingLeft: `${row.depth * 12}px` }}>
          {row.getCanExpand() ? <button onClick={row.getToggleExpandedHandler()}>{row.getIsExpanded() ? "o" : ">"}</button> : "--->"}
        </div>
      );
    },
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("website", {
    cell: (info) => info.getValue(),
  }),
];

interface TableProps {
  initialData: IUser[];
}

export const Table = ({ initialData }: TableProps) => {
  const [data, _] = useState<IUser[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting, globalFilter, expanded },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subRows,
  });

  return (
    <div>
      <section className="flex gap-4">
        {table.getAllColumns().map((column) => {
          if (column.id === "name") return null;
          return (
            <div key={column.id}>
              <input id={column.id} type="checkbox" checked={column.getIsVisible()} onChange={column.getToggleVisibilityHandler()} />
              <label htmlFor={column.id}>{column.id}</label>
            </div>
          );
        })}
      </section>
      <input onChange={(e) => setGlobalFilter(e.target.value)} className="p-4 border rounded-lg w-full" />
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
      <div className="flex gap-3">
        <button className="bg-indigo-500 text-white font-medium p-2 rounded-lg" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <button className="bg-indigo-500 text-white font-medium p-2 rounded-lg" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
      </div>
    </div>
  );
};
