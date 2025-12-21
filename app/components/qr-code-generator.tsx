import React from 'react'
import { Card } from './ui/card'
import { Download, ImageIcon, QrCode } from 'lucide-react'
import { Button, Input, Label} from './ui'

const QrCodeGenerator = () => {
    return (
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
                        <Label htmlFor="crab-input"className="text-xs font-medium tracking-wide text-muted-foreground">
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
    )
}

export default QrCodeGenerator