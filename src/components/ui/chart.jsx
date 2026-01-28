import React, { createContext, useContext, useId } from "react";
import * as Recharts from "recharts";
import { cn } from "../../lib/utils";

/* THEMES */
const THEMES = {
    light: "",
    dark: ".dark",
};

/* CONTEXT */
const ChartContext = createContext(null);

function useChart() {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error("useChart must be used inside ChartContainer");
    }
    return context;
}

/* CONTAINER */
const ChartContainer = React.forwardRef(
    ({ id, className, children, config, ...props }, ref) => {
        const uid = useId();
        const chartId = `chart-${id || uid.replace(/:/g, "")}`;

        return (
            <ChartContext.Provider value={{ config }}>
                <div
                    ref={ref}
                    data-chart={chartId}
                    className={cn(
                        "flex aspect-video justify-center text-xs",
                        className
                    )}
                    {...props}
                >
                    <ChartStyle id={chartId} config={config} />
                    <Recharts.ResponsiveContainer>
                        {children}
                    </Recharts.ResponsiveContainer>
                </div>
            </ChartContext.Provider>
        );
    }
);

ChartContainer.displayName = "ChartContainer";

/* STYLE INJECTOR */
function ChartStyle({ id, config }) {
    const items = Object.entries(config || {}).filter(
        ([_, c]) => c.color || c.theme
    );

    if (!items.length) return null;

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([theme, prefix]) => `
${prefix} [data-chart="${id}"] {
${items
                                .map(([key, cfg]) => {
                                    const color = cfg.theme?.[theme] || cfg.color;
                                    return color ? `--color-${key}: ${color};` : "";
                                })
                                .join("\n")}
}
`
                    )
                    .join("\n"),
            }}
        />
    );
}

/* TOOLTIP */
const ChartTooltip = Recharts.Tooltip;

const ChartTooltipContent = React.forwardRef(
    (
        {
            active,
            payload,
            className,
            indicator = "dot",
            hideLabel = false,
            hideIndicator = false,
            label,
            formatter,
        },
        ref
    ) => {
        const { config } = useChart();

        if (!active || !payload?.length) return null;

        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-lg border bg-white px-3 py-2 text-xs shadow-lg",
                    className
                )}
            >
                {!hideLabel && <div className="mb-1 font-semibold">{label}</div>}

                {payload.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        {!hideIndicator && (
                            <span
                                className="h-2 w-2 rounded"
                                style={{ background: item.color }}
                            />
                        )}
                        <span className="text-gray-500">
                            {config?.[item.name]?.label || item.name}
                        </span>
                        <span className="ml-auto font-mono font-medium">
                            {formatter
                                ? formatter(item.value)
                                : item.value?.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
);

ChartTooltipContent.displayName = "ChartTooltipContent";

/* LEGEND */
const ChartLegend = Recharts.Legend;

const ChartLegendContent = React.forwardRef(
    ({ payload, className }, ref) => {
        const { config } = useChart();
        if (!payload?.length) return null;

        return (
            <div
                ref={ref}
                className={cn("flex flex-wrap justify-center gap-4", className)}
            >
                {payload.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                        <span
                            className="h-3 w-3 rounded"
                            style={{ background: item.color }}
                        />
                        {config?.[item.dataKey]?.label || item.value}
                    </div>
                ))}
            </div>
        );
    }
);

ChartLegendContent.displayName = "ChartLegendContent";

/* EXPORTS */
export {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
};
