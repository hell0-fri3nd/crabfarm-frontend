


import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Biohazard, ChartNoAxesCombined, Circle, Cloud, CloudFog, Droplet, Droplets, FlaskConical, SprayCan, ThermometerSun, Wind } from 'lucide-react';
import OnlineStatus from '~/components/online-status';
// import { PlaceholderPattern } from '~/components/placeholder-pattern';
// import { Button, Input, Label } from '~/components/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import SensorCard from '~/components/sensor-card';
import type { SensorData } from '~/types';
import CardTemplate from "~/components/card-template";

const dummySensorData: SensorData[] = [
  {
    Icon: ThermometerSun,
    description: 'Temperature',
    value: "28.50°C",
    rangesDescription: 'Range: 0 - 40 °C',
    percentage: (28.5 / 40) * 100,
  },
  {
    Icon: Droplet,
    description: 'pH Level',
    value: "7.20",
    rangesDescription: 'Range: 0 - 14',
    percentage: (7.2 / 14) * 100,
  },
  {
    Icon: Droplets,
    description: 'Salinity (PSU)',
    value: "35.20 PSU",
    rangesDescription: 'Range: 0 - 40 PSU',
    percentage: (35.2 / 40) * 100,
  },
  {
    Icon: FlaskConical,
    description: 'Ammonia',
    value: "0.02 mg/L",
    rangesDescription: 'Range: 0 - 1 mg/L',
    percentage: (0.02 / 1) * 100,
  },
  {
    Icon: Wind,
    description: 'Dissolved Oxygen',
    value: "7.50 mg/L",
    rangesDescription: 'Range: 0 - 15 mg/L',
    percentage: (7.5 / 15) * 100,
  },
  {
    Icon: Biohazard,
    description: 'TDS (Total Dissolved Solids)',
    value: "1850.00 ppm",
    rangesDescription: 'Range: 0 - 2500 ppm',
    percentage: (1850 / 2500) * 100,
  }
];

const Dashbooard = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
      <div className="border-b border-border/40 py-5">
          <div className="max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Real-time monitoring and Prediction for your crab farming operation</p>
        </div>
      </div>
      <Tabs defaultValue="sensors">

        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-0 overflow-x-auto">

            <TabsList className="w-full sm:w-1/4 grid grid-cols-2 sm:grid-cols-2">
              <TabsTrigger value="sensors">
                <Droplet className="w-4 h-4" />
                <span>Sensors</span>
              </TabsTrigger>

              <TabsTrigger value="predictions">
                  <ChartNoAxesCombined className="w-7 h-7" />
                  <span>Predictions</span>
                </TabsTrigger>
            </TabsList> 

          <div className="grid auto-rows-min gap-4 sm:grid-cols-1">

            <TabsContent value="sensors">

              <CardTemplate description="Realtime time update sensor data from all connected devices." status={false} >
                <div className="flex h-full flex-1 flex-col gap-0 rounded-xl overflow-x-auto">
                  <div className="grid auto-rows-min gap-2 sm:grid-cols-3">
                    {dummySensorData.map((sensor, index) => (
                      <SensorCard
                      key={index}
                      Icon={sensor.Icon}
                      description={sensor.description}
                      value={sensor.value}
                      rangesDescription={sensor.rangesDescription}
                      percentage={sensor.percentage}
                      />
                    ))}
                  </div>
                </div>
              </CardTemplate>

            </TabsContent>

            <TabsContent value="predictions">

              <CardTemplate 
              description="Predictive analytics of crab width and weight based on data on previous days and months." 
              status={false} 
              footerText="404">
                Coming soon...
              </CardTemplate>
  
            </TabsContent>
          </div>

        </div>

      </Tabs>
    </div>
  )
}

export default Dashbooard