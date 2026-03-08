import React from 'react'
import { Card } from './ui/card'
import { Download, ImageIcon, Images, Loader2 } from 'lucide-react'
import { Button, Input, Label} from './ui'
import { toPng } from 'html-to-image';

import QRCode from './custom/qr-code'
import IconLogo from './custom/icon-logo'
import SelectDropdown from './select-dropdown';
import type { AppDispatch, RootState } from '~/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { crab } from '~/store/crab-slice';

type QrText = {
    id: number | null;
    name: string | null;
    group_by: string | null;
};

const QrCodeGenerator = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [text, setText] = React.useState<QrText>({
        id: null,
        name: null,   
        group_by: null
    });
    const [group,setGroup] = React.useState<string | null>('A');

    const [isPending, setIsPending] = React.useState(false);
    const captureRef = React.useRef<HTMLDivElement>(null);
    const { groups } = useSelector((state: RootState) => state.crab);

    const groupBy = [
        { index: 1, label: "A", value: "A" },
        { index: 2, label: "B", value: "B" },        
        { index: 3, label: "C", value: "C" },
        { index: 4, label: "D", value: "D" },
        { index: 5, label: "E", value: "E" }
    ]

    React.useEffect(() => {
        dispatch(crab(group));
    }, [dispatch, group]);

    const crabName = React.useMemo(() => {
        if (!groups) return [];

        return groups.map((item, index) => ({
            index: item.id,
            label: item.name,   
            value: item.name
        }));
    }, [groups]);

    const crabMap = React.useMemo(() => {
        const map = new Map();
        (groups ?? []).forEach(item => {
            map.set(String(item.name), item);
        });
        return map;
    }, [groups]);



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
            link.download = `${text.name || "qr-code"}.png`;
            link.click();
        } catch (err) {
            console.error("Download failed:", err);
        } finally {
            setIsPending(false);
            setText({
                id: null,
                name: null,   
                group_by: null
            });
        }
    }, [text]);

    const handleDownloadGroup = React.useCallback(async () => {
        if (!groups || groups.length === 0) return;

        setIsPending(true);

        try {
            for (const item of groups) {

                // update QR content
                setText({
                    id: item.id,
                    name: item.name,
                    group_by: item.group_by
                });

                // wait for React to render
                await new Promise((resolve) => setTimeout(resolve, 300));

                if (!captureRef.current) continue;

                const dataUrl = await toPng(captureRef.current, {
                    cacheBust: true,
                    pixelRatio: 3,
                    backgroundColor: "#1F1E1F",
                });

                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `${item.name}.png`;
                link.click();

                await new Promise((resolve) => setTimeout(resolve, 200));
            }
        } catch (err) {
            console.error("Group download failed:", err);
        } finally {
            setIsPending(false);
            setText({
                id: null,
                name: null,
                group_by: null
            });
        }
    }, [groups]);

    const handleCrabChange = (value: string | null) => {
        if (!value) return;
   
        const selected = crabMap.get(value); 
        if (!selected) {
            console.log("No match found for value:", value);
            return;
        }
        setText(selected);
    };

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
     
                        { (text.name == null) &&                         
                            <div className="flex flex-col items-center justify-center h-48 w-full">
                                <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
                                <p className="text-sm text-muted-foreground"> Unable to generate a empty name</p>
                            </div>
                        }
                        
                        { (text.name != null) && 
       
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
                                        {text.name ?? ''}
                                    </h5>
                                </div>

                                <div className="flex justify-center md:justify-center">
                                    <QRCode id={text.id} name={text.name} group_by={text.group_by}  />
                                </div>

                            </div>
          
                        }

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectDropdown
                            label="Crab group"
                            placeholder="Select group"
                            options={groupBy}
                            value={group ?? ''}
                            onValueChange={setGroup}
                        />

                        <SelectDropdown
                            label="Crab Name"
                            placeholder="Select name"
                            options={crabName}
                            value={text.name ?? ''}
                            onValueChange={handleCrabChange}
                        />
                    </div>

                                
                    <div className="flex w-full gap-1 justify-end md:grid-cols-2">

                        <Button 
                        onClick={handleDownloadGroup} 
                        disabled={isPending || text.name === ''}
                        className="outline">
                            {
                                isPending ? (
                                    <Loader2 className=" animate-spin" />
                                ) : (
                                    <Images  />
                                )
                            }
                            <span className="hidden sm:inline">
                                {isPending ? "Generating Images..." : "Group Downloads"}
                            </span>
                        </Button>
             
                        <Button 
                        onClick={handleDownload} 
                        disabled={isPending || text.name === ''}
                        className="outline">
                        {
                            isPending ? (
                                <Loader2 className=" animate-spin" />
                            ) : (
                                <Download  />
                            )
                        }
                            <span className="hidden sm:inline">
                                {isPending ? "Generating Image..." : "Download Image"}
                            </span>
                        </Button>
                    </div>

                </div>

            </div>
        </Card>
    )
}

export default QrCodeGenerator