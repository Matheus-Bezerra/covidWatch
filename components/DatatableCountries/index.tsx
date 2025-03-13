"use client"
import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export type CountryData = {
    country: string;
    confirmed: number;
    deaths: number;
    suspects: number;
};

export const columns: ColumnDef<CountryData>[] = [
    {
        accessorKey: "country",
        header: () => (
            <div className="flex gap-1.5 items-center">
                <span>Países</span>
                <Globe className="h-4 w-4" />
            </div>
        )
    },
    {
        accessorKey: "confirmed",
        header: () => (
            <div className="flex gap-1.5 items-center">
                <span>Casos Confirmados</span>
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
        ),
        cell: ({ row }) => {
            const value = row.getValue("confirmed") as number;
            return isNaN(value) ? "-" : new Intl.NumberFormat("pt-BR").format(value);
        },
    },
    {
        accessorKey: "deaths",
        header: () => (
            <div className="flex gap-1.5 items-center">
                <span>Óbitos</span>
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            </div>
        ),
        cell: ({ row }) => {
            const value = row.getValue("deaths") as number;
            return isNaN(value) ? "-" : new Intl.NumberFormat("pt-BR").format(value);
        },
    },
    {
        accessorKey: "suspects",
        header: () => (
            <div className="flex gap-1.5 items-center">
                <span>Suspeitos</span>
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
            </div>
        ),
        cell: ({ row }) => {
            const value = row.getValue("suspects") as number;
            return isNaN(value) ? "-" : new Intl.NumberFormat("pt-BR").format(value);
        },
    },
];

// Tradução das Keys das colunas para Português
const columnLabels: { [key: string]: string } = {
    country: "Países",
    confirmed: "Casos Confirmados",
    deaths: "Óbitos",
    suspects: "Suspeitos",
};

export function DataTableCountries({ data }: { data: CountryData[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full h-96 overflow-y-auto pr-3">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Procurar País"
                    value={(table.getColumn("country")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("country")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colunas <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {columnLabels[column.id] || column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Nenhum resultado encontrado
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} linha(s) afetadas.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próxima
                    </Button>
                </div>
            </div>
        </div>
    )
}
