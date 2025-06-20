import ProductTable from "../comp-1/DataTable/data-table";
const products = [
    {
        id: 1,
        name: 'Bamboo Standing Desk',
        category: 'Office Furniture',
        status: 'In Stock',
        price: 329.99,
        quantity: 42,
    },
    {
        id: 2,
        name: 'Wireless Mouse Pro',
        category: 'Accessories',
        status: 'In Stock',
        price: 49.99,
        quantity: 20,
    },
    {
        id: 3,
        name: 'Smart LED Bulb',
        category: 'Home Automation',
        status: 'Out of Stock',
        price: 12.5,
        quantity: 0,
    },
    {
        id: 4,
        name: 'Ceramic Coffee Mug',
        category: 'Kitchenware',
        status: 'In Stock',
        price: 9.99,
        quantity: 100,
    },
    {
        id: 5,
        name: 'Fitness Tracker Band',
        category: 'Wearables',
        status: 'In Stock',
        price: 89.0,
        quantity: 34,
    },
];

export default function Products (){

    return (
        <>
            <ProductTable products={products} />
        </>
    )
}