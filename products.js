const products = [
    { category: "coffee", name: "Irish coffee", description: "Fragrant black coffee with Jameson Irish whiskey and whipped milk", price: 7, image: "resources/coffee-1.jpg" },
    { category: "coffee", name: "Kahlua coffee", description: "Classic coffee with milk and Kahlua liqueur under a cap of frothed milk", price: 7, image: "resources/coffee-2.jpg" },
    { category: "coffee", name: "Honey raf", description: "Espresso with frothed milk, cream and aromatic honey", price: 5.5, image: "resources/coffee-3.jpg" },
    { category: "coffee", name: "Ice cappuccino", description: "Cappuccino with soft thick foam in summer version with ice", price: 5, image: "resources/coffee-4.jpg" },
    { category: "coffee", name: "Espresso", description: "Classic black coffee", price: 4.5, image: "resources/coffee-5.jpg" },
    { category: "coffee", name: "Latte", description: "Espresso coffee with the addition of steamed milk and dense milk foam", price: 5.5, image: "resources/coffee-6.jpg" },
    { category: "coffee", name: "Latte macchiato", description: "Espresso with frothed milk and chocolate", price: 5.5, image: "resources/coffee-7.jpg" },
    { category: "coffee", name: "Coffee with cognac", description: "Fragrant black coffee with cognac and whipped cream", price: 6.5, image: "resources/coffee-8.jpg" },
    { category: "tea", name: "Moroccan", description: "Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint", price: 4.5, image: "resources/tea-1.png" },
    { category: "tea", name: "Ginger", description: "Original black tea with fresh ginger, lemon and honey", price: 5, image: "resources/tea-2.png" },
    { category: "tea", name: "Cranberry", description: "Invigorating black tea with cranberry and honey", price: 5, image: "resources/tea-3.png" },
    { category: "tea", name: "Sea buckthorn", description: "Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon", price: 5.5, image: "resources/tea-4.png" },
    { category: "dessert", name: "Marble cheesecake", description: "Philadelphia cheese with lemon zest on a light sponge cake and red currant jam", price: 3.5, image: "resources/dessert-1.png" },
    { category: "dessert", name: "Red velvet", description: "Layer cake with cream cheese frosting", price: 4, image: "resources/dessert-2.png" },
    { category: "dessert", name: "Cheesecakes", description: "Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar", price: 4.5, image: "resources/dessert-3.png" },
    { category: "dessert", name: "Creme brulee", description: "Delicate creamy dessert in a caramel basket with wild berries", price: 4, image: "resources/dessert-4.png" },
    { category: "dessert", name: "Pancakes", description: "Tender pancakes with strawberry jam and fresh strawberries", price: 4.5, image: "resources/dessert-5.png" },
    { category: "dessert", name: "Honey cake", description: "Classic honey cake with delicate custard", price: 4.5, image: "resources/dessert-6.png" },
    { category: "dessert", name: "Chocolate cake", description: "Cake with hot chocolate filling and nuts with dried apricots", price: 5.5, image: "resources/dessert-7.png" },
    { category: "dessert", name: "Black forest", description: "A combination of thin sponge cake with cherry jam and light chocolate mousse", price: 6.5, image: "resources/dessert-8.png" },
];

const productOptions = {
    coffee: {
        sizes: [
            { code: "S", label: "200 ml", price: 0 },
            { code: "M", label: "300 ml", price: 0.5 },
            { code: "L", label: "400 ml", price: 1 },
        ],
        additives: [
            { name: "Sugar", price: 0.5 },
            { name: "Cinnamon", price: 0.5 },
            { name: "Syrup", price: 0.5 },
        ],
    },
    tea: {
        sizes: [
            { code: "S", label: "200 ml", price: 0 },
            { code: "M", label: "300 ml", price: 0.5 },
            { code: "L", label: "400 ml", price: 1 },
        ],
        additives: [
            { name: "Sugar", price: 0.5 },
            { name: "Lemon", price: 0.5 },
            { name: "Syrup", price: 0.5 },
        ],
    },
    dessert: {
        sizes: [
            { code: "S", label: "50 g", price: 0 },
            { code: "M", label: "100 g", price: 0.5 },
            { code: "L", label: "200 g", price: 1 },
        ],
        additives: [
            { name: "Berries", price: 0.5 },
            { name: "Nuts", price: 0.5 },
            { name: "Jam", price: 0.5 },
        ],
    },
};

products.forEach((product) => Object.assign(product, productOptions[product.category]));
