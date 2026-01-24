import { ScanLine, QrCode } from "lucide-react";
import QrCodeGenerator from "~/components/qr-code-generator"
import ScanCrabWidth from "~/components/scan-crab-width"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useIsMobile } from "~/hooks/use-mobile";

const WeighAndScan = () => {
    const mobile = useIsMobile();
    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

            {
                mobile && 
                <Tabs defaultValue="qr-code-generator">
                    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-0 overflow-x-auto">

                        <TabsList className="w-full grid grid-cols-2">
                            <TabsTrigger value="qr-code-generator">
                                <QrCode className="w-4 h-4" />
                                <span>generate</span>
                            </TabsTrigger>
                            
                            <TabsTrigger value="scan-crab-width">
                                <ScanLine className="w-7 h-7" />
                                <span>scan</span>
                            </TabsTrigger>
                        </TabsList> 

                        <div className="grid auto-rows-min gap-4 sm:grid-cols-1">
                            <TabsContent value="qr-code-generator">
                                <QrCodeGenerator />
                            </TabsContent>
                            <TabsContent value="scan-crab-width">
                                <ScanCrabWidth />
                            </TabsContent>
                        </div>

                    </div>
                </Tabs>
            }
            
            {
                !mobile && 
                <div className="grid auto-rows-min gap-1 md:grid-cols-2">
                    <QrCodeGenerator />
                    <ScanCrabWidth />
                </div>  
            }
  
        </div>
    )
}

export default WeighAndScan