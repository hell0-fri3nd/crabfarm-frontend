import React from 'react'
import { Card } from './ui/card'
import { ImageIcon, Loader2, Save, ScanQrCode } from 'lucide-react'
import { Button, Input, Label } from './ui'
import type { AppDispatch, RootState } from '~/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { status,start } from '~/store/camera-slice'
import { useNavigate } from 'react-router';

const ScanCrabWidth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [statusDetails, setStatusDetails] = React.useState({
        camera_status: false,
        pending: false,
        camera_url: ``
    });
    const { data, error } = useSelector((state: RootState) => state.camera);

    React.useEffect(() => {
        const fetchStatus = async () => {

            await dispatch(status());
            setStatusDetails({
                ...statusDetails,
                camera_status: true
            });


            if (error === 'TOKEN_EXPIRED') {
                setStatusDetails({ 
                    ...statusDetails, 
                    pending: false,
                    camera_status: false,
                    camera_url: ``
                });
                navigate('/refresh-token/pin');
            }
        };
        fetchStatus();

        const intervalId = setInterval(fetchStatus, 2000); 
        return () => clearInterval(intervalId); 
    }, [dispatch]);

    const startCamera = async (e: React.SyntheticEvent) => {
        try {
            e.preventDefault(); 
            setStatusDetails({ 
                ...statusDetails, 
                pending: true,
                camera_status: false,
                camera_url: ""
            });
            const result = await dispatch(start());
            // console.log(result);
        } catch (err: unknown) {
            console.error('Login failed:', err);
            setStatusDetails({ 
                ...statusDetails, 
                pending: false,
                camera_status: false,
                camera_url: ``
            });
        } finally {
            setStatusDetails({ 
                ...statusDetails, 
                pending: false,
                camera_status: true,
                camera_url: `http://192.168.100.11:4573/camera/stream`
            });
        }
    };

    return (
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

                    <div className="overflow-hidden rounded-lg border bg-muted w-full h-60 md:h-[480px] md: w-[280px] p-4">

                 
                        <div className="flex flex-col items-center justify-center h-full w-full">

                            {
                                data?.camera_status ? (     
                                    <img
                                    alt="Uploaded preview"
                                    className="h-full w-full object-cover"
                                    src={statusDetails.camera_url}
                                    />
                                ) : (
                                    <div>
                                        <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
                                        <p className="text-sm text-muted-foreground">Camera is not loaded</p>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                                
                    <div className="flex w-full justify-center md:justify-end">
                        <Button variant="outline" onClick={startCamera} disabled={data?.camera_status}>
                            {
                                statusDetails.pending ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <ScanQrCode className="h-4 w-4" />
                                )
                            }
                            {statusDetails.pending ? "" : "Scan QR Code"}
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
                            value={data?.extracted_data}
                            readOnly
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
                            value={data?.width_cm}
                            readOnly
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
    )
}

export default ScanCrabWidth