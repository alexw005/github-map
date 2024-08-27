// Define an interface for LegendItem
export interface ILegendItem {
    title: string;
    color: string;
    isFor: (cases: number) => boolean;
    textColor?: string;
}

// Implement the LegendItem class
export default class LegendItem implements ILegendItem {
    title: string;
    color: string;
    isFor: (cases: number) => boolean;
    textColor?: string;

    constructor(
        title: string,
        color: string,
        isFor: (cases: number) => boolean,
        textColor?: string
    ) {
        this.title = title;
        this.color = color;
        this.isFor = isFor;
        this.textColor = textColor != null ? textColor : "black";
    }
}