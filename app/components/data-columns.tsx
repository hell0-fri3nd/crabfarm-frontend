import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from './ui/button';
import type { Crab } from '~/types/crab';

type SortableHeaderProps = {
  column: any;
  label: string;
  center?: boolean;
};

const SortableHeader = ({ column, label, center = false }: SortableHeaderProps) => {
  return (
    <div className='flex justify-center'>
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export const DataColumns: ColumnDef<Crab>[] = [
    {
        accessorKey: 'crab_id',
        header: ({ column }) => (
            <SortableHeader column={column} label="Crab ID" />
        ),
        cell: ({ row }) => <div className="font-medium text-center">{row.getValue('crab_id')}</div>,
    },
    {
        accessorKey: 'type',
        header: ({ column }) => (
            <SortableHeader column={column} label="Type" />
        ),
        cell: ({ row }) => <div className="text-center">{row.getValue('type')}</div>,
    },
    {
        accessorKey: 'width',
        header: ({ column }) => (
             <SortableHeader column={column} label="Width (cm)" />
        ),
        cell: ({ row }) => (
        <div className="text-center">{(row.getValue('width') as number).toFixed(2)}</div>
        ),
    },
    {
        accessorKey: 'weight',
        header: ({ column }) => (
            <SortableHeader column={column} label="Weight (kg)" />
        ),
        cell: ({ row }) => (
        <div className="text-center">{(row.getValue('weight') as number).toFixed(2)}</div>
        ),
    },
    {
    accessorKey: 'group_by',
    header: ({ column }) => (
        <SortableHeader column={column} label="Group" />
    ),
    cell: ({ row }) => {
        const group = row.getValue('group_by') as string;
        const groupColors: Record<string, string> = {
        'A': 'bg-blue-100 text-blue-800',
        'B': 'bg-green-100 text-green-800',
        'C': 'bg-purple-100 text-purple-800',
        'D': 'bg-cyan-100 text-cyan-800',
        'E': 'bg-indigo-100 text-indigo-800',
        };
        return (
            <div className="flex justify-center">
                <div
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                        groupColors[group] || 'bg-gray-100 text-gray-800'
                    }`}
                    >
                    {group}
                </div>
            </div>
  
        );
    },
  },
];
