

import { 
    ImageIcon,
    Download,
    QrCode,
    ScanQrCode,
    Save
} from 'lucide-react';
// import { PlaceholderPattern } from '~/components/placeholder-pattern';
import { Button, Input, Label } from '~/components/ui';
import { Card } from '~/components/ui/card';

const WeighAndSnap = () => {
    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">

                <Card className="overflow-hidden border">
                    <div className="p-6">

                        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                A
                            </span>
                            Generate a QR Code for each Crab
                        </h2>

                        <div className="space-y-4">

                            <div className="overflow-hidden rounded-lg border bg-muted p-4">
                                {/* <img

                                    alt="Uploaded preview"
                                    className="h-48 w-full object-cover"
                                /> */}

                                <div className="flex flex-col items-center justify-center h-48 w-full">
                                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
                                    <p className="text-sm text-muted-foreground">Camera is not loaded</p>
                                </div>
                            </div>


                            <div className="space-y-2">
                                <Label htmlFor="crab-input" className="text-xs font-medium tracking-wide text-muted-foreground">
                                    Crab Name 
                                </Label>
                                <Input
                                id="crab-input"
                                placeholder="Enter Crab Name"
                                className="h-10"
                                />
                            </div>
                            
                            <div className="flex w-full justify-center md:justify-end grid auto-rows-min gap-2 md:grid-cols-2">
                                <Button variant="outline">
                                    <QrCode className="h-4 w-4" />
                                    Generate QR Code 
                                </Button>
                                <Button variant="outline">
                                    <Download className="h-4 w-4" />
                                    Download QR Code
                                </Button>
                            </div>

                        </div>

                    </div>
                </Card>


                <Card className="overflow-hidden border">
                    <div className="p-6">

                        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                B
                            </span>
                            Scan the QR Code to measure width
                        </h2>

                        <p className="mb-6 text-sm text-muted-foreground">Align the camera with the QR Code to read the crab’s width.</p>

                        <div className="space-y-4">

                            <div className="overflow-hidden rounded-lg border bg-muted p-4">
                                {/* <img

                                    alt="Uploaded preview"
                                    className="h-48 w-full object-cover"
                                /> */}

                                <div className="flex flex-col items-center justify-center h-48 w-full">
                                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
                                    <p className="text-sm text-muted-foreground">Camera is not loaded</p>
                                </div>
                            </div>
                            
                            <div className="flex w-full justify-center md:justify-end">
                                <Button variant="outline">
                                    <ScanQrCode className="h-4 w-4" />
                                    Scan QR Code
                                </Button>
                            </div>

                        </div>
                
                    </div>

                    <div className="p-6">

                        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                               C
                            </span>
                            Review Crab Details
                        </h2>

                        <p className="mb-6 text-sm text-muted-foreground">These parameters are required for the prediction.</p>

                        <div className="space-y-4">

                            <div className="grid auto-rows-min gap-4 md:grid-cols-3">

                                <div className="space-y-2">
                                    <Label htmlFor="crab-input" className="text-xs font-medium tracking-wide text-muted-foreground">
                                        Crab Name 
                                    </Label>
                                    <Input
                                    id="crab-input"
                                    placeholder="Enter Crab Name"
                                    className="h-10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="crab-weight" className="text-xs font-medium tracking-wide text-muted-foreground">
                                        Crab Weight (grams)
                                    </Label>
                                    <Input
                                    id="crab-input"
                                    placeholder="Enter Crab weight in grams"
                                    className="h-10"
                                    />
                                </div>

                                
                                <div className="space-y-2">
                                    <Label htmlFor="crab-weight" className="text-xs font-medium tracking-wide text-muted-foreground">
                                        Crab Width (cm)
                                    </Label>
                                    <Input
                                    id="crab-width"
                                    placeholder="Enter Crab width in cm"
                                    className="h-10"
                                    />
                                </div>

                            </div>
                            
                            <div className="flex w-full justify-center md:justify-end">
                                <Button variant="outline">
                                    <Save className="h-4 w-4" />
                                    Save Crab data
                                </Button>
                            </div>

                        </div>
                
                    </div>
                </Card>

            </div>
        </div>
    )
}

export default WeighAndSnap