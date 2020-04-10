import pool from './PgConnectionPool';

export type Product = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
    active: boolean,
    categoryId: number,
    shopId: number,
    shopName: string,
    product_type_id: number,
    product_type_name: string,
    avg_rating: number,
    count_rating: number
}

export class ProductRepository {
    async get(order:string|null) {

        const orderQuery = this.getOrderQuery(order);
        const res = await pool.query<Product>(`
            SELECT products.id, products.name, products.image, products.description, products.price, products.active, products.category_id as categoryId, products.shop_id as shopId, shops.name as shopName, product_type.id as product_type_id, product_type.name as product_type_name, Avg(product_review.rating) as avg_rating, count(product_review.rating) as count_rating
            FROM products 
                INNER JOIN shops ON products.shop_id = shops.id
                INNER JOIN product_type ON products.product_type_id = product_type.id
                LEFT JOIN product_review ON product_review.product_id = products.id
            GROUP BY products.id, shops.name, product_type.id ${orderQuery}
        `);

        return res.rows;
    }

    async getByCategory(categoryId: number, order:string|null) {
        const orderQuery = this.getOrderQuery(order);

        const res = await pool.query<Product>(`
            SELECT products.id, products.name, products.image, products.description, products.price, products.active, products.category_id as categoryId, products.shop_id as shopId, shops.name as shopName, product_type.id as product_type_id, product_type.name as product_type_name, Avg(product_review.rating) as avg_rating, count(product_review.rating) as count_rating
            FROM products 
                INNER JOIN shops ON products.shop_id = shops.id 
                INNER JOIN product_type ON products.product_type_id = product_type.id
                LEFT JOIN product_review ON product_review.product_id = products.id
            WHERE products.category_id = ${categoryId}
            GROUP BY products.id, shops.name, product_type.id ${orderQuery}
        `);

        return res.rows;
    }
    
    async getByName(name: string, order:string|null) {
        const searchName = name.replace(/\s/g, ' | ');
        const orderQuery = this.getOrderQuery(order);
        const orderQuerySwitch = orderQuery ? orderQuery : "ORDER BY score DESC"

        const res = await pool.query<Product>(`
            SELECT id, name, image, description, price, active, categoryId, shopId, shopName, score, product_type_id, product_type_name, avg_rating, count_rating
                FROM (
                    SELECT ts_rank_cd(name_tokens, to_tsquery('${searchName}')) AS score, products.id as id, products.name as name, image, description, price, active, category_id AS categoryId, shop_id AS shopId, shops.name as shopName, product_type.id as product_type_id, product_type.name as product_type_name, Avg(product_review.rating) as avg_rating, count(product_review.rating) as count_rating
                    FROM products 
                        INNER JOIN shops ON products.shop_id = shops.id
                        INNER JOIN product_type ON products.product_type_id = product_type.id
                        LEFT JOIN product_review ON product_review.product_id = products.id
                    GROUP BY products.id, shops.name, product_type.id, products.name_tokens
                ) S
            WHERE score > 0
            ${orderQuerySwitch}
        `);

        return res.rows;
    }

    getOrderQuery(order:string|null) {
        switch(order) {
            case 'priceAsc':
              return 'ORDER BY price asc';
            case 'priceDesc':
              return 'ORDER BY price desc';
            case 'rating':
              return "ORDER BY avg_rating";
            case 'distance':
              return "";
            default:
              return "";
        }
    }
}