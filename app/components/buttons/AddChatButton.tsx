"use client";

import { useUserId } from "@/app/context/UserContext";
import { useState } from "react";

function AddChatButton() {
    const [loading, setLoading] = useState(false);
    const userId = useUserId();

    async function createChat() {
        setLoading(true);

        // Pedimos al usuario con quién quiere chatear
        const other = prompt("Ingrese el UUID del otro usuario:");
        if (!other) {
            setLoading(false);
            return;
        }

        const chatId = `${userId}_${other}`;

        await fetch("/api/chats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: chatId })
        });

        setLoading(false);
    }

    return (
        <button
            onClick={createChat}
            className="h-12 w-12 cursor-pointer rounded-full flex items-center justify-center bg-gray-800 dark:bg-blue-600 hover:bg-gray-200 hover:dark:bg-blue-800"
        >
            {loading ? <svg fill="hsl(228, 97%, 42%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"><animateTransform id="spinner_XR07" begin="0;spinner_npiH.begin+0.4s" attributeName="transform" calcMode="spline" type="translate" dur="1.2s" values="12 12;0 0" keySplines=".52,.6,.25,.99"/><animateTransform begin="0;spinner_npiH.begin+0.4s" attributeName="transform" calcMode="spline" additive="sum" type="scale" dur="1.2s" values="0;1" keySplines=".52,.6,.25,.99"/><animate begin="0;spinner_npiH.begin+0.4s" attributeName="opacity" calcMode="spline" dur="1.2s" values="1;0" keySplines=".52,.6,.25,.99"/></path><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"><animateTransform id="spinner_r5ci" begin="spinner_XR07.begin+0.4s" attributeName="transform" calcMode="spline" type="translate" dur="1.2s" values="12 12;0 0" keySplines=".52,.6,.25,.99"/><animateTransform begin="spinner_XR07.begin+0.4s" attributeName="transform" calcMode="spline" additive="sum" type="scale" dur="1.2s" values="0;1" keySplines=".52,.6,.25,.99"/><animate begin="spinner_XR07.begin+0.4s" attributeName="opacity" calcMode="spline" dur="1.2s" values="1;0" keySplines=".52,.6,.25,.99"/></path><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"><animateTransform id="spinner_npiH" begin="spinner_XR07.begin+0.8s" attributeName="transform" calcMode="spline" type="translate" dur="1.2s" values="12 12;0 0" keySplines=".52,.6,.25,.99"/><animateTransform begin="spinner_XR07.begin+0.8s" attributeName="transform" calcMode="spline" additive="sum" type="scale" dur="1.2s" values="0;1" keySplines=".52,.6,.25,.99"/><animate begin="spinner_XR07.begin+0.8s" attributeName="opacity" calcMode="spline" dur="1.2s" values="1;0" keySplines=".52,.6,.25,.99"/></path></svg> : 
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="oklch(42.4% 0.199 265.638)" stroke="none">
                <path d="M155 456 c-60 -28 -87 -56 -114 -116 -36 -79 -19 -183 42 -249 33 -36 115 -71 167 -71 52 0 134 35 167 71 34 37 63 110 63 159 0 52 -35 134 -71 167 -37 34 -110 63 -159 63 -27 0 -65 -10 -95 -24z m180 -15 c128 -58 164 -223 72 -328 -101 -115 -283 -88 -348 52 -79 171 104 354 276 276z"/>
                <path d="M240 295 c0 -33 -2 -35 -35 -35 -19 0 -35 -4 -35 -10 0 -5 16 -10 35 -10 33 0 35 -2 35 -35 0 -19 5 -35 10 -35 6 0 10 16 10 35 0 33 2 35 35 35 19 0 35 5 35 10 0 6 -16 10 -35 10 -33 0 -35 2 -35 35 0 19 -4 35 -10 35 -5 0 -10 -16 -10 -35z"/>
                </g>
            </svg>}
        </button>
    );
}

export default AddChatButton;
