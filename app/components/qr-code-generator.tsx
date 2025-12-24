import React from 'react'
import { Card } from './ui/card'
import { Download, ImageIcon, Loader2 } from 'lucide-react'
import { Button, Input, Label} from './ui'
import { toPng } from 'html-to-image';

import QRCode from './custom/qr-code'
import IconLogo from './custom/icon-logo'

const QrCodeGenerator = () => {
    const [text, setText] = React.useState('');
    const [isPending, setIsPending] = React.useState(false);
    const captureRef = React.useRef<HTMLDivElement>(null);

    const handleDownload = React.useCallback(async () => {
        if (!captureRef.current) return;
        setIsPending(true);

        try {
            const dataUrl = await toPng(captureRef.current, {
                cacheBust: true,
                pixelRatio: 3,
                backgroundColor: "#1F1E1F", 
            });

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `${text || "qr-code"}.png`;
            link.click();
        } catch (err) {
            console.error("Download failed:", err);
        } finally {
            setIsPending(false);
            setText('');
        }
    }, [text]);

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
                        
                        { text == '' &&                         
                            <div className="flex flex-col items-center justify-center h-48 w-full">
                                <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
                                <p className="text-sm text-muted-foreground"> Unable to generate a empty name</p>
                            </div>
                        }
                        
                        { text != '' && 
       
                            <div ref={captureRef} className="grid auto-rows-min gap-0 md:grid-cols-2 p-2">
                                
                                <div className="flex flex-col items-center justify-center md:items-center md:justify-center gap-1">
                                    <div className="flex h-10 w-20 items-center justify-center rounded-md">
                                        <IconLogo className="size-20 fill-current text-[var(--foreground)] dark:text-white" />
                                    </div>

                                    <div className="space-y-2 text-center md:text-center">
                                        <h1 className="text-xl font-large">CrabFarm</h1>
                                        <p className="text-medium text-muted-foreground">IoT and Machine learning based aquaculture</p>
                                    </div>

                                    <h5 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                        {text}
                                    </h5>
                                </div>

                                <div className="flex justify-center md:justify-center">
                                    <QRCode text={text} />
                                </div>

                            </div>
          
                        }

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="crab-input"className="text-xs font-medium tracking-wide text-muted-foreground">
                            Crab Name 
                        </Label>
                        <Input
                        id="crab-input"
                        placeholder="Enter Crab Name"
                        className="h-10"
                        onChange={(e)=>setText(e.target.value)}
                        />
                    </div>
                                
                    <div className="flex w-full justify-center gap-2 md:justify-end md:grid-cols-2">
                        {/* <Button variant="outline">
                            <Loader2 className="h-4 w-4" />
                            Generate QR Code 
                        </Button> */}
                        <Button 
                        onClick={handleDownload} 
                        disabled={isPending || text === ''}
                        className="outline">
                        {
                            isPending ? (
                                <Loader2 className=" animate-spin" />
                            ) : (
                                <Download  />
                            )
                        }
                            {isPending ? "Generating Image..." : "Download Image"}
                        </Button>
                    </div>

                </div>

            </div>
        </Card>
    )
}

export default QrCodeGenerator