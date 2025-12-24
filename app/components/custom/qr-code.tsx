import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import type { Options } from "qr-code-styling";
import rawOptions from "../../assets/json/options.json";

const options = rawOptions as unknown as Partial<Options>;

const QRCode = ({text}: {text: string}) => {
    
    const qrRef = useRef<HTMLDivElement>(null);
    const qrCodeRef = useRef<QRCodeStyling | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        qrCodeRef.current = new QRCodeStyling(options);

        if (qrRef.current && qrCodeRef.current) {
            qrCodeRef.current.append(qrRef.current);
        }
    }, []);

    useEffect(() => {
        if (!qrCodeRef.current) return;
        qrCodeRef.current.update({ data: text });
    }, [text]);

    return (
        <div className="inline-block overflow-hidden rounded-xl shadow-lg">
            <div ref={qrRef} />
        </div>
    );
};

export default QRCode;
