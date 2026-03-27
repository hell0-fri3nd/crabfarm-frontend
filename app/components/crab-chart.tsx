import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import {
  ChartContainer,
  // ChartTooltip,
  ChartTooltipContent,
  // ChartLegend,
  ChartLegendContent,
} from './ui/chart'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { ChevronDown } from 'lucide-react'
import type { Crab } from '~/types/crab'
import { getCrabLogs } from '~/api/crab'
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useMobileNavigation } from '~/hooks/user-mobile-navigations'
import { accessExpired, clearAuth, logout, refreshExpired } from '~/store/auth/auth-slice'
import { persistor, type AppDispatch } from '~/store/store'

interface ProcessedData {
  date: string
  width: number
  weight: number
}

// Transform raw logs into chart-ready data
function transformLogs(logs: Crab[]): { actual: ProcessedData[]; prediction: ProcessedData[] } {
  const actual = logs
    .filter((log) => log.type === 'actual')
    .map((log) => ({
      date: new Date(log.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      width: log.width,
      weight: log.weight,
    }))

  const prediction = logs
    .filter((log) => log.type === 'prediction')
    .map((log) => ({
      date: new Date(log.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      width: log.width,
      weight: log.weight,
    }))

  return { actual, prediction }
}

function buildCrabData(logs?: Crab[]) {

  const crabMap: Record<string, Crab[]> = {}
  logs?.forEach((log) => {
    if (!crabMap[log.crab_id]) {
      crabMap[log.crab_id] = []
    }
    crabMap[log.crab_id].push(log)
  })

  const CRAB_DATA: Record<string, { actual: ProcessedData[]; prediction: ProcessedData[]; name: string }> = {}

  Object.entries(crabMap).forEach(([crabId, crabLogs]) => {
    const { actual, prediction } = transformLogs(crabLogs)
    const crabName = crabLogs[0]?.crab_name || crabId
    CRAB_DATA[crabId] = { actual, prediction, name: crabName }
  })

  return CRAB_DATA
}

const chartConfig = {
  width: {
    label: 'Width (cm)',
    theme: {
      light: '#22c55e',
      dark: '#16a34a',
    },
  },
  weight: {
    label: 'Weight (g)',
    theme: {
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
  },
}

const CrabChart = () => {

  const { data, isLoading, error } = useQuery<Crab[]>({
    queryKey: ['crabLogs', 'actual'],
    queryFn: () => getCrabLogs('actual'),
    refetchInterval: 500,
    retry: false, 
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cleanup = useMobileNavigation();

  React.useEffect(() => {

    const errStr = error as unknown as string;
    if (!error) return;
    
    if (errStr === 'MISSING_ACCESS_TOKEN') {
      dispatch(accessExpired());
      navigate('/access-token');
    }
    
    if (errStr  === 'MISSING_REFRESH_TOKEN') {
      dispatch(accessExpired());
      dispatch(refreshExpired());
      dispatch(clearAuth());
      cleanup();
      dispatch(logout());
      persistor.purge();
      navigate('/access-token');
    }
    
  }, [error, dispatch, navigate, cleanup]);


  const CRAB_DATA = buildCrabData(data)
  const crabIds = Object.keys(CRAB_DATA)
  const [selectedCrab, setSelectedCrab] = useState<string | null>(null)
  const [isActual, setIsActual] = useState(true)

  React.useEffect(() => {
    if (crabIds.length > 0 && !selectedCrab) {
      setSelectedCrab(crabIds[0])
    }
  }, [crabIds, selectedCrab])

  if (!selectedCrab || !CRAB_DATA[selectedCrab]) {
    return <div className="p-4">No data available...</div>
  }


  const crab_data = CRAB_DATA[selectedCrab]
  const displayData = isActual ? crab_data.actual : crab_data.prediction
  const crabName = crab_data.name

  return (
   <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-lg sm:text-2xl font-bold">
            {crabName} - Growth Monitor
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Daily width and weight measurements over {displayData.length} days
          </CardDescription>
        </div>
        
     
        <div className="flex flex-col gap-3 sm:grid-cols-2 sm:flex-row items-center sm:justify-between">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto justify-between gap-2 border-border/50 hover:bg-accent"
              >
                <span className="truncate">{crabName}</span>
                <ChevronDown className="h-4 w-4 opacity-50   31212hrink-0" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              {crabIds.map((id) => (
                <DropdownMenuItem key={id} onClick={() => setSelectedCrab(id)}>
                  <span className="font-medium truncate">{CRAB_DATA[id].name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center justify-between sm:justify-start gap-2 rounded-lg border border-border/50 bg-muted/30 px-3 py-2 w-full sm:w-auto">
            <span className="text-sm font-medium text-muted-foreground">
              {isActual ? 'Actual' : 'Prediction'}
            </span>
            <Switch
              checked={!isActual}
              onCheckedChange={(checked) => setIsActual(!checked)}
            />
          </div>
        </div>
        
      </CardHeader>

      <CardContent>
        {/* <div className="overflow-x-auto">
          <div className="min-w-[800px]"> */}
        <ChartContainer config={chartConfig} className="h-90 w-full">
              <LineChart
                        width={800}   // 👈 important
          height={350}
                data={displayData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--muted-foreground))"
                  opacity={0.1}
                />

                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />

                <YAxis
                  yAxisId="left"
                  stroke="var(--color-width)"
                  tick={{ fill: 'var(--color-width)', fontSize: 12 }}
                  label={{ value: 'Width (cm)', angle: -90, position: 'insideLeft' }}
                />

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="var(--color-weight)"
                  tick={{ fill: 'var(--color-weight)', fontSize: 12 }}
                  label={{ value: 'Weight (g)', angle: 90, position: 'insideRight' }}
                />

                <Tooltip content={<ChartTooltipContent hideLabel={false} />} />
                <Legend content={<ChartLegendContent />} />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="width"
                  stroke="var(--color-width)"
                  strokeWidth={2.5}
                  dot={{ fill: 'var(--color-width)', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Width (cm)"
                />

                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="weight"
                  stroke="var(--color-weight)"
                  strokeWidth={2.5}
                  dot={{ fill: 'var(--color-weight)', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Weight (g)"
                />
              </LineChart>
        </ChartContainer>
{/* </div>
</div> */}
      </CardContent>

      <CardFooter>
        {/* Data Summary */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 w-full">
          <div className="rounded-lg border border-border/40 bg-muted/20 p-4">
            <p className="text-sm font-medium text-muted-foreground">Width Range</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-600">
                {Math.min(...displayData.map((d) => d.width)).toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">to</span>
              <span className="text-2xl font-bold text-green-600">
                {Math.max(...displayData.map((d) => d.width)).toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">cm</span>
            </div>
          </div>

          <div className="rounded-lg border border-border/40 bg-muted/20 p-4">
            <p className="text-sm font-medium text-muted-foreground">Weight Range</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-blue-600">
                {Math.min(...displayData.map((d) => d.weight)).toFixed(0)}
              </span>
              <span className="text-sm text-muted-foreground">to</span>
              <span className="text-2xl font-bold text-blue-600">
                {Math.max(...displayData.map((d) => d.weight)).toFixed(0)}
              </span>
              <span className="text-sm text-muted-foreground">g</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CrabChart