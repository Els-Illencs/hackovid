import pool from './PgConnectionPool';

export type Order = {
    id: number,
    userId: number
    createdAt: string,
    updatedAt: string,
    trackingStage: number,
    orderType: number,
    rating: number,
    isPaid: number,
}

export type OrderProducts = {
    id: number,
    orderId: number;
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
    count_rating: number,
    shop_lat: number,
    shop_lng: number
    quantity: number,
}

export class OrderRepository {
    async getByUser(userId: number) {
        const res = await pool.query<Order>(`
            SELECT id, user_id as userId, created_at as createdAt, updated_at as updatedAt, tracking_stage as trackingStage, order_type as orderType, rating as rating, is_paid as isPaid
            FROM orders
            WHERE user_id = ${userId}
        `);

        return res.rows;
    }

    async getOrderDetail(orderId: number) {
        const res = await pool.query<Order>(`
            SELECT id, user_id as userId, user_id as userId, created_at as createdAt, updated_at as updatedAt, tracking_stage as trackingStage, order_type as orderType, rating as rating, is_paid as isPaid
            FROM orders 
            WHERE order_id = ${orderId}
            LIMIT 1
        `);

        return res.rows;
    }

    async getProductsByOrder(orderId: number) {
        const res = await pool.query<OrderProducts>(`
        SELECT order_products.order_id as orderId, order_products.id as id, order_products.quantity as quantity, products.id, products.name, products.image, products.description, products.price, products.active, products.category_id as categoryId, products.shop_id as shopId, shops.name as shopName, shops.lat as shop_lat, shops.lng as shop_lng, product_type.id as product_type_id, product_type.name as product_type_name, Avg(COALESCE(product_review.rating, 0)) as avg_rating, count(product_review.rating) as count_rating
        FROM products 
            INNER JOIN order_products ON products.id = order_products.product_id
            INNER JOIN shops ON products.shop_id = shops.id
            INNER JOIN product_type ON products.product_type_id = product_type.id
            LEFT JOIN product_review ON product_review.product_id = products.id
            WHERE order_products.order_id = ${orderId}
        GROUP BY products.id, shops.name, product_type.id, shops.lat, shops.lng, order_products.order_id, order_products.id, order_products.quantity
        `);

        return res.rows;
    }
}