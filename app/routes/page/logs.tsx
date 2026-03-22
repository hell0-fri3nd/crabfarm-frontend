

import { DataColumns } from '~/components/data-columns';
import { DataTable } from '~/components/data-table';
import type { Crab } from '~/types/crab';


const dummyCrabs: Crab[] = [
  {
    crab_id: '1',
    type: 'actual',
    width: 15.5,
    weight: 2.1,
    group_by: 'A',
  },
  {
    crab_id: '2',
    type: 'actual',
    width: 18.2,
    weight: 3.5,
    group_by: 'B',
  },
  {
    crab_id: '3',
    type: 'actual',
    width: 16.8,
    weight: 2.8,
    group_by: 'C',
  },
  {
    crab_id: '4',
    type: 'actual',
    width: 25.3,
    weight: 6.2,
    group_by: 'D',
  },
  {
    crab_id: '5',
    type: 'actual',
    width: 19.5,
    weight: 4.1,
    group_by: 'E',
  },
  {
    crab_id: '6',
    type: 'actual',
    width: 14.2,
    weight: 1.9,
    group_by: 'A',
  },
  {
    crab_id: '7',
    type: 'actual',
    width: 17.6,
    weight: 3.2,
    group_by: 'B',
  },
  {
    crab_id: '8',
    type: 'actual',
    width: 26.1,
    weight: 7.1,
    group_by: 'C',
  },
  {
    crab_id: '9',
    type: 'actual',
    width: 20.3,
    weight: 4.5,
    group_by: 'E',
  },
  {
    crab_id: '10',
    type: 'actual',
    width: 15.9,
    weight: 2.4,
    group_by: 'A',
  },
];

const Logs = () => {
    return (
        <div className="flex h-full flex-1 flex-col gap-0 rounded-xl p-4 overflow-x-auto">
            <div className="border-b border-border/40 py-5">
                <div className="max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Crab Logs</h1>
                    <p className="text-muted-foreground">View and manage crab data with sorting, filtering, and pagination</p>
                </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-8">
                <div className="w-full max-w-5xl">
                    <DataTable columns={DataColumns} data={dummyCrabs} />
                </div>
            </div>
        </div>
    )
}

export default Logs