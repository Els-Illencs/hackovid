export interface Order {
    id: number,
    userid: number,
    createdat: string,
    updatedat: string,
    trackingstage: number,
    ordertype: number,
    ispaid: boolean,
    price: number,
    address_lat: number,
    address_lng: number,
};

export type OrderProducts = {
    id: number,
    orderid: number;
    name: string,
    image: string,
    description: string,
    price: number,
    active: boolean,
    categoryid: number,
    shopid: number,
    shopname: string,
    product_type_id: number,
    product_type_name: string,
    avg_rating: number,
    count_rating: number,
    shop_lat: number,
    shop_lng: number
    quantity: number,
}

export interface CreateOrder {
    type: number,
    rating: number,
    products: {
        id: number,
        quantity: number,
        price: number,
    }[],
    isPaid: boolean,
    address_lat: number,
    address_lng: number,
};

/*export module OrderType {
    export const PICK_UP_ORDER: number = 0;
    export const DELIVER_ORDER: number = 1;
};

export module TrackingStageDeliver {
    export const PENDING: number = 0;
    export const PREPARING: number = 1;
    export const READY: number = 2;
    export const DELIVERING: number = 3;
    export const DELIVER: number = 4;
};

export module TrackingStagePickup {
    export const PENDING: number = 0;
    export const PREPARING: number = 1;
    export const READY: number = 2;
    export const DELIVER: number = 3;
};*/