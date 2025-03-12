import { formatNumber } from "@/lib/utils";
import React from "react";

interface StatItemProps {
    label: string;
    value: number | null;
    className: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, className }) => {
    return (
        <div>
            <div className="flex gap-1.5 items-center">
                <p className="text-muted-foreground">{label}</p>
                <div className={`h-3 w-3 rounded-full ${className}`}></div>
            </div>
            <h2 className="text-xl font-bod">{formatNumber(value)}</h2>
        </div>
    );
};

export default StatItem;
