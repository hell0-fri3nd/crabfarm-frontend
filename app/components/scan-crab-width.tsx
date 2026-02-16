import React from 'react'
import { Card } from './ui/card'
import { ImageIcon, Loader2, Save, ScanQrCode } from 'lucide-react'
import { Button, Input, Label } from './ui'
import { persistor, type AppDispatch, type RootState } from '~/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { status,start } from '~/store/camera-slice'
import { useNavigate } from 'react-router';
import { accessExpired, clearAuth, logout, refreshExpired } from '~/store/auth/auth-slice'
import { useMobileNavigation } from '~/hooks/user-mobile-navigations'
import { useQuery } from '@tanstack/react-query';
interface CameraData {
  camera_status: boolean;
  camera_url?: string;
  extracted_data?: string;
  width_cm?: number;
}

const ScanCrabWidth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const cleanup = useMobileNavigation();

    const { data, error, isLoading } = useQuery<CameraData | null, string>({
        queryKey: ['camera-status'],
        queryFn: async () => {
            try {
                const data = await dispatch(status()).unwrap();
                return {
                    camera_status: data?.camera_status,
                    camera_url: data?.camera_url,
                    extracted_data: data?.extracted_data,
                    width_cm: data?.width_cm
                };
            } catch (err: any) {
                throw err?.message || 'UNKNOWN_ERROR';
            }
        },
        refetchInterval: 1000,
        retry: false,
    });


    React.useEffect(() => {
        if (!error) return;

        if (error === 'TOKEN_ACCESS_EXPIRED') {
            dispatch(accessExpired());
            navigate('/access-token');
        }

        if (error === 'TOKEN_REFRESH_EXPIRED') {
            dispatch(accessExpired());
            dispatch(refreshExpired());
            dispatch(clearAuth());
            cleanup();
            dispatch(logout());
            persistor.purge();
            navigate('/access-token');
        }
    }, [error, dispatch]);

    const startCamera = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await dispatch(start());
        } catch (err) {
            console.error(err);
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
                                    src={data.camera_url}
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
                                isLoading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <ScanQrCode className="h-4 w-4" />
                                )
                            }
                            {isLoading ? "" : "Scan QR Code"}
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
                            value={data?.width_cm}
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