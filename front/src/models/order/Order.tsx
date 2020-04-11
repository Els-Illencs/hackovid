export interface Order {
    id: number,
    userid: number,
    createdat: string,
    updatedat: string,
    trackingstage: number,
    ordertype: number,
    ispaid: boolean
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