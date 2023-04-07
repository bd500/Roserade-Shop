import slugify from "slugify";

const brand = [
    {
        name: "SÉZANE",
        url: "sezane",
    },
    {
        name: "Rebecca Taylor",
        url: slugify("Rebecca Taylor"),
    },
    {
        name: "CarHarrt",
        url: slugify("CarHarrt"),
    },
    {
        name: "Freepeople",
        url: slugify("Freepeople"),
    },
    {
        name: "Nike",
        url: slugify("Nike"),
    },
];

export default brand;
