import React from "react";
import { ILegendItem } from "../lib/legend/legendItem"; // Adjust the import path

interface LegendProps {
    legendItems: ILegendItem[];
}

const Legend: React.FC<LegendProps> = ({ legendItems }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "stretch",
            }}
        >
            {legendItems.map((item) => (
                <div
                    key={item.title}
                    style={{
                        backgroundColor: item.color,
                        flex: 1,
                        display: "flex",
                        alignItems: "center", // vertical
                        justifyContent: "center", // horizontal
                        color: item.textColor ?? "black", // Use nullish coalescing
                        fontWeight: "bolder",
                        fontSize: "1em",
                        height: "10vh",
                    }}
                >
                    <span>{item.title}</span>
                </div>
            ))}
        </div>
    );
};

export default Legend;
