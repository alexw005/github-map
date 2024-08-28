import LegendItem from "./legendItem";

var legendItems = [
    new LegendItem(
        "100,000 +",
        "#00ffcc80",
        (cases) => cases >= 100_000
    ),

    new LegendItem(
        "50,000 - 99,999",
        "#00ffcc60",
        (cases) => cases >= 50_000 && cases < 100_000
    ),

    new LegendItem(
        "20,000 - 49,999",
        "#00ffcc40",
        (cases) => cases >= 20_000 && cases < 50_000,

    ),

    new LegendItem(
        "5,000 - 19,999",
        "#00ffcc20",
        (cases) => cases >= 5_000 && cases < 20_000
    ),

    new LegendItem(
        "0 - 4,999",
        "#00ffcc10",
        (cases) => cases > 0 && cases < 5_000
    ),

    new LegendItem("No Data", "#ffffff", (cases) => true),
];

export default legendItems;


