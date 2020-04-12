ALTER TABLE orders
    ADD COLUMN tracking_stage INTEGER NOT NULL,
    ADD COLUMN order_type INTEGER NOT NULL,
    ADD COLUMN rating INTEGER NOT NULL,
    ADD COLUMN is_paid BOOLEAN NOT NULL,
    ADD COLUMN address_lat float,
    ADD COLUMN address_lng float,
    ADD COLUMN price FLOAT;