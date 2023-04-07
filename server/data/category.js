import slugify from "slugify";

const category = [
    {
        name: "Coat",
        url: "coat",
    },
    {
        name: "Dresses",
        url: slugify("Dresses"),
    },
    {
        name: "Sweater",
        url: slugify("Sweater"),
    },
    {
        name: "Hat",
        url: slugify("Hat"),
    },
    {
        name: "Sneakers",
        url: slugify("Sneakers"),
    },
];

export default category;
