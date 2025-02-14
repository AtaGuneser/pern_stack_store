import arcjet, { tokenBucket, shield } from "arcjet";
import "dotenv/config";

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE" }),
        detect({
            mode: "LIVE", allow: [
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
    ],
    tokenBucket: {
        mode: "LIVE",
        refillRate: 5,
        interval: 10,
        capacity: 10
    }
});