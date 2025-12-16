


import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Biohazard, ChartNoAxesCombined, Circle, Cloud, CloudFog, Droplet, Droplets, FlaskConical, SprayCan, ThermometerSun, Wind } from 'lucide-react';
import OnlineStatus from '~/components/online-status';
// import { PlaceholderPattern } from '~/components/placeholder-pattern';
// import { Button, Input, Label } from '~/components/ui';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import SensorCard from '~/components/sensor-card';

const Dashbooard = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
      <Tabs defaultValue="sensors">

        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

          <div className="grid auto-rows-min gap-4 sm:grid-cols-5">

            <TabsList >

              <div className="grid auto-rows-min gap-2 sm:grid-cols-2">
    
                <TabsTrigger
                value="sensors"
                className="
                  flex items-center gap-2 px-4 py-2 rounded-md 
                  data-[state=active]:bg-primary data-[state=active]:text-primary-foreground 
                  data-[state=active]:shadow-sm transition-all
                  relative
                ">
                  <Droplet className="w-4 h-4" />
                  <span>Sensors</span>
                  <span
                  className="
                    absolute bottom-0 left-0 right-0 h-[2px] 
                    bg-primary rounded-full 
                    opacity-0 data-[state=active]:opacity-100 transition-opacity
                  "/>
                </TabsTrigger>

                <TabsTrigger
                value="predictions"
                className="
                  flex items-center gap-2 px-4 py-2 rounded-md 
                  data-[state=active]:bg-primary data-[state=active]:text-primary-foreground 
                  data-[state=active]:shadow-sm transition-all
                  relative
                ">
                  <ChartNoAxesCombined className="w-7 h-7" />
                  <span>Predictions</span>
                  <span
                  className="
                    absolute bottom-0 left-0 right-0 h-[2px] 
                    bg-primary rounded-full 
                    opacity-0 data-[state=active]:opacity-100 transition-opacity
                  "/>
                </TabsTrigger>
              
              </div>
            </TabsList> 

          </div>

          <div className="grid auto-rows-min gap-4 sm:grid-cols-1">

            <TabsContent value="sensors">

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"> 
                    <OnlineStatus status={false} />
                    Sensor Data
                  </CardTitle>
                  <CardDescription>
                    Realtime time update sensor data from all connected devices.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
          
                  <div className="flex h-full flex-1 flex-col gap-0 rounded-xl overflow-x-auto">
                    <div className="grid auto-rows-min gap-2 sm:grid-cols-5">
                      
                      <SensorCard Icon={ThermometerSun} description='Temperature' value='39 °C' />

                    </div>
                  </div>

                </CardContent>
              </Card>

            </TabsContent>

            <TabsContent value="predictions">
      
                <Card>
                  <CardHeader>
                    <CardTitle>Prediction</CardTitle>
                    <CardDescription>
                      to followup
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    coming soon...
                  </CardContent>
                  <CardFooter>
                    404
                  </CardFooter>
                </Card>
            </TabsContent>
          </div>

        </div>

      </Tabs>
    </div>
  )
}

export default Dashbooard