export class ProductService {
    static getProducts() {
        return Promise.resolve([
            {
                id: 1,
                name: 'Lemon',
                category: 'good',
                quantity: 62,
                inventoryStatus: 'В наличии',
                image: '1.jpg'
            },
            {
                id: 2,
                name: 'Milk',
                category: 'old',
                quantity: 602,
                inventoryStatus: 'В наличии',
                image: '2.jpg'
            },
            {
                id: 3,
                name: 'Bread',
                category: 'bad',
                quantity: 620,
                inventoryStatus: 'В наличии',
                image: '3.jpg'
            },
            {
                id: 4,
                name: 'Clementine',
                category: 'moderate',
                quantity: 62062,
                inventoryStatus: 'В наличии',
                image: '4.jpg'
            },
            {
                id: 5,
                name: 'Eggs',
                category: 'moderate',
                quantity: 6262,
                inventoryStatus: 'В наличии',
                image: '5.jpg'
            },
        ]);
    }
}