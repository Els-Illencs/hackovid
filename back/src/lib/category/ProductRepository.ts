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
    count_rating: number,
    shop_lat: number,
    shop_lng: number,
    quantity?: number
}
export class ProductRepository {
    async get(order:string|null, minPrice:number|null, maxPrice:number|null, rating:number|null, distance:number|null, lat: number | null, lng: number | null) {

        const orderQuery = this.getOrderQuery(order);
        let filterQuery: string = this.getFilterQuery(minPrice, maxPrice, rating, distance);
        filterQuery = filterQuery && filterQuery != '' ? 'HAVING ' + filterQuery : '';

        const res = await pool.query<Product>(`
            SELECT products.id, products.name, products.image, products.description, products.price, products.active, products.category_id as categoryId, products.shop_id as shopId, shops.name as shopName, shops.lat as shop_lat, shops.lng as shop_lng, product_type.id as product_type_id, product_type.name as product_type_name, Avg(COALESCE(product_review.rating, 0)) as avg_rating, count(product_review.rating) as count_rating
            FROM products 
                INNER JOIN shops ON products.shop_id = shops.id
                INNER JOIN product_type ON products.product_type_id = product_type.id
                LEFT JOIN product_review ON product_review.product_id = products.id
            GROUP BY products.id, shops.name, product_type.id, shops.lat, shops.lng ${orderQuery}
            ${filterQuery}
        `);

        res.rows = this.filterByDistance(res.rows, distance, lat, lng);
        return this.orderByDistance(res.rows, order, lat, lng);
    }

    async getByCategory(categoryId: number, order:string|null, minPrice:number|null, maxPrice:number|null, rating:number|null, distance:number|null, lat: number | null, lng: number | null) {
        const orderQuery = this.getOrderQuery(order);
        let filterQuery: string = this.getFilterQuery(minPrice, maxPrice, rating, distance);
        filterQuery = filterQuery && filterQuery != '' ? ' AND ' + filterQuery : '';

        const res = await pool.query<Product>(`
            SELECT products.id, products.name, products.image, products.description, products.price, products.active, products.category_id as categoryId, products.shop_id as shopId, shops.name as shopName, shops.lat as shop_lat, shops.lng as shop_lng, product_type.id as product_type_id, product_type.name as product_type_name, Avg(COALESCE(product_review.rating, 0)) as avg_rating, count(product_review.rating) as count_rating
            FROM products 
                INNER JOIN shops ON products.shop_id = shops.id 
                INNER JOIN product_type ON products.product_type_id = product_type.id
                LEFT JOIN product_review ON product_review.product_id = products.id
            GROUP BY products.id, shops.name, product_type.id, shops.lat, shops.lng ${orderQuery}
            HAVING products.category_id = ${categoryId} ${filterQuery}
        `);

        res.rows = this.filterByDistance(res.rows, distance, lat, lng);
        return this.orderByDistance(res.rows, order, lat, lng);
    }
    
    async getByName(name: string, order:string|null, minPrice:number|null, maxPrice:number|null, rating:number|null, distance:number|null, lat: number | null, lng: number | null) {
        const searchName = name.replace(/\s/g, ' | ');
        const orderQuery = this.getOrderQuery(order);
        const orderQuerySwitch = orderQuery ? orderQuery : "ORDER BY score DESC";
        let filterQuery: string = this.getFilterQuery(minPrice, maxPrice, rating, distance);
        filterQuery = filterQuery && filterQuery != '' ? 'HAVING ' + filterQuery : '';

        const res = await pool.query<Product>(`
            SELECT id, name, image, description, price, active, categoryId, shopId, shopName, shop_lat, shop_lng, score, product_type_id, product_type_name, avg_rating, count_rating
                FROM (
                    SELECT ts_rank_cd(name_tokens, to_tsquery('${searchName}')) AS score, products.id as id, products.name as name, image, description, price, active, category_id AS categoryId, shop_id AS shopId, shops.name as shopName, shops.lat as shop_lat, shops.lng as shop_lng, product_type.id as product_type_id, product_type.name as product_type_name, Avg(COALESCE(product_review.rating, 0)) as avg_rating, count(product_review.rating) as count_rating
                    FROM products 
                        INNER JOIN shops ON products.shop_id = shops.id
                        INNER JOIN product_type ON products.product_type_id = product_type.id
                        LEFT JOIN product_review ON product_review.product_id = products.id
                    GROUP BY products.id, shops.name, product_type.id, products.name_tokens, shop_lat, shop_lng
                    ${filterQuery}
                ) S
                WHERE score > 0
            ${orderQuerySwitch}
        `);

        res.rows = this.filterByDistance(res.rows, distance, lat, lng);
        return this.orderByDistance(res.rows, order, lat, lng);
    }

    orderByDistance(elements: Array<Product>, order: string | null, lat: number | null, lng: number | null) {
        if (order === 'distance' && lat && lng) {
            elements.sort((a: Product, b: Product) => {
                return this.getDistance(lat, lng, a.shop_lat, a.shop_lng) - this.getDistance(lat, lng, b.shop_lat, b.shop_lng);
            });
        }

        return elements;
    }

    filterByDistance(elements: Array<Product>, distance: number | null, userLat: number | null, userLng: number |null) {
        if(elements && distance && userLat && userLng) {
            let subElements: Array<Product> = [];
            for (let product of elements) {
                if(Number(this.getDistance(userLat, userLng, product.shop_lat, product.shop_lng)) <= Number(distance)) {
                    subElements.push(product);
                }
            }
            return subElements;
        }
        return elements;
    }

    getOrderQuery(order:string|null) {
        switch(order) {
            case 'priceAsc':
              return 'ORDER BY price asc';
            case 'priceDesc':
              return 'ORDER BY price desc';
            case 'rating':
              return "ORDER BY avg_rating DESC";
            case 'distance':
              return "";
            default:
              return "";
        }
    }

    getDistance(lat1 : number, lng1: number, lat2: number, lng2: number): number {
        var earthRadius = 6371; // km
    
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lng2 - lng1);
        var latitude1 = this.toRad(lat1);
        var latitude2 = this.toRad(lat2);
    
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latitude1) * Math.cos(latitude2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = earthRadius * c;
        return Math.round(d * Math.pow(10, 6)) / Math.pow(10, 6);
    };

    toRad(number: number) {
        return number * Math.PI / 180;
    }

    getFilterQuery(minPrice:number|null, maxPrice:number|null, rating:number|null, distance:number|null) {
        let query: string = '';
        const separator: string = ' AND ';

        if(minPrice && minPrice > 0) {
            query += 'price >= ' + minPrice;
        }

        if(maxPrice && maxPrice > 0) {
            query = query != '' ? query + separator : query;
            query += 'price <= ' + maxPrice;
        }

        if(rating && rating > 0) {
            query = query != '' ? query + separator : query;
            query += 'Avg(COALESCE(product_review.rating, 0)) >= ' + rating;
        }

        return query
    }
}