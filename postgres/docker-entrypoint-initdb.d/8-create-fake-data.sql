INSERT INTO shops (name, lat, lng) VALUES
('El rei de la fruita', 39.5802357, 2.6495576),
('Carnisseria Josep', 39.5826063, 2.6479361),
('Nou Forn', 39.5826063, 2.6479361),
('Peixateria Ca''n Toni', 39.5827026, 2.6489449),
('Vinotèca Gran Reserva', 39.5808238, 2.6491828),
('Ca''n Martell', 39.5802357, 2.6495576),
('Verdures d''aquí', 39.5848573, 2.6723381);

DELETE FROM PRODUCTS;
ALTER SEQUENCE products_id_seq RESTART WITH 3;


INSERT INTO PRODUCTS (name, image, description, price, active, shop_id, category_id, product_type_id, name_tokens) VALUES
('Llimones', 'https://cdn.pixabay.com/photo/2017/02/05/12/31/lemons-2039830_960_720.jpg', 'Llimones de Mallorca al pes', 0.91, true, 2, 1, 2, to_tsvector('Llimones. Llimones de Mallorca al pes. Fruita. Fruta')),
('Pera Rocha', 'https://cdn.pixabay.com/photo/2016/07/22/09/59/fruit-1534494_960_720.jpg', 'Peres del tipus Rocha al pes', 1.89, true, 2, 1, 2, to_tsvector('Pera Rocha. Peres del tipus Rocha al pes. Fruita. Fruta')),
('Meduixa Premium', 'https://cdn.pixabay.com/photo/2018/06/11/12/32/strawberry-3468445_960_720.jpg', 'Meduixa premium de Mallorca al pes', 4.35, true, 2, 1, 2, to_tsvector('Meduixa. Meduixa premium de Mallorca al pes. Fruita. Fruta. Fresa')),
('Poma Golden', 'https://cdn.pixabay.com/photo/2013/08/22/20/32/apple-174861_960_720.jpg', 'Pomes del tipus Golden al pes', 1.89, true, 2, 1, 2, to_tsvector('Poma golden. Pomes del tipus Golden al pes. Fruita. Fruta. Manzana')),
('Poma Pink Lady', 'https://cdn.pixabay.com/photo/2016/11/29/03/23/apples-1867043_960_720.jpg', 'Pomes del tipus Pink Lady al pes', 2.69, true, 8, 1, 2, to_tsvector('Poma Pink Lady. Pomes del tipus Pink Lady al pes. Fruita. Fruta. Manzana')),
('Plàtan de Canàries', 'https://cdn.pixabay.com/photo/2018/09/24/20/12/bananas-3700718_960_720.jpg', 'Plàtans de canàries al pes', 2.89, true, 2, 1, 2, to_tsvector('Plàtan de canàries. Plàtans de canàries al pes. Fruita. Fruta')),
('Kiwi Zespri Green', 'https://cdn.pixabay.com/photo/2013/01/08/01/43/kiwi-74363_960_720.jpg', 'Kiwis del tipus Zespri Green', 4.13, true, 2, 1, 2, to_tsvector('Kiwi Zespri Green. Kiwid del tipus Zespri Green. Fruita. Fruta')),
('Tarònja de Soller', 'https://cdn.pixabay.com/photo/2017/02/26/12/27/oranges-2100108_960_720.jpg', 'Tarònges de Soller al pes. ¡Que en son de bones!', 2.99, true, 2, 1, 2, to_tsvector('Tarònja de Soller. Tarònges de Soller al pes. Fruita. Fruta. Naranja. Taronja. Taronges')),
('Meló pell de gripau', 'https://cdn.pixabay.com/photo/2014/03/01/16/03/background-277571_960_720.jpg', 'Melons del tipus pell de gripau', 4.65, true, 2, 1, 2, to_tsvector('Meló pell de gripau. Melons del tipus pell de gripau. Fruita. Fruta')),
('Síndria de Mallorca', 'https://p0.piqsels.com/preview/393/901/113/watermelon-slice-isolated-white-thumbnail.jpg', 'Síndries de Km0 cultivada a Mallorca', 4.89, true, 2, 1, 2, to_tsvector('Síndria de Mallorca. Síndries de Km0 cultivada a Mallorca. Fruita. Fruta. Sandia')),
('Pit de pollastre', 'https://cdn.pixabay.com/photo/2018/03/09/17/41/chicken-3212144_960_720.jpg', 'Pits de pollastre sencers', 6.89, true, 3, 4, 2, to_tsvector('Pit de pollastre. Pits de pollastre sencers. Carn. Carne. Pechuga de pollo')),
('Carn picada', 'https://cdn.pixabay.com/photo/2016/10/17/15/05/minced-meat-1747907_960_720.jpg', 'Mescla de carn picada de boví i porc', 6.98, true, 3, 4, 2, to_tsvector('Carn picada. Mescla de carn picada de boví i porc. Carn. Carne')),
('Cuixa de pollastre', 'https://elartesanovasco.es/wp-content/uploads/2017/06/MUSLOS-DE-POLLO.jpg', 'Cuixes de pollastre senceres', 5.26, true, 3, 4, 2, to_tsvector('Cuixa de pollastre. Cuixes de pollastre senceres. Carn. Carne')),
('Broquetes de pollastre', 'https://www.petitchef.es/imgupl/recipe/brochetas-de-pollo-y-pimiento--lg-456091p709087.jpg', 'Broquetes de cuixa de pollastre i pebrot', 9.36, true, 3, 4, 2, to_tsvector('Broquetes de pollastre. Broquetes de cuixa de pollastre i pebrot. Carn. Carne')),
('Costelles de porc', 'https://cdn.pixabay.com/photo/2017/10/02/17/24/chops-2809505_960_720.jpg', 'Costelles de agulla de porc', 4.79, true, 3, 4, 2, to_tsvector('Costelles de porc. Costelles de agulla de porc. Carn. Carne')),
('Sobrassada', 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Sobrassada_tendra_de_Menorca.jpg', 'Sobrassada coent de Mallorca', 7.9, true, 3, 4, 2, to_tsvector('Sobrassada. Sobrassada coent de Mallorca. Carn. Carne')),
('Formatge de ''Tetilla''', 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Queso_San_Sim%C3%B3n_Da_costa.jpg', 'Formatge del tipus Tetilla de Galicia', 10.39, true, 3, 7, 2, to_tsvector('Formatge de Tetilla. Formatge del tipus Tetilla de Galicia. Lactis. Queso')),
('Formatge de Menorca', 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Formatge_Ma%C3%B3_artes%C3%A0.jpg', 'Formatge curat de Menorca', 10.39, true, 3, 7, 2, to_tsvector('Formatge de Menorca. Formatge curat de Menorca. Lactis. Queso')),
('Panada de carn amb Pèsols', 'https://live.staticflickr.com/5025/5652653437_4521010ecd_b.jpg', 'Panada de carn amb pèsols de Mallorca', 1.85, true, 4, 6, 1, to_tsvector('Panada amb pèsols. Panada de carn amb pèsols de Mallorca. Rebosteria. Empanada')),
('Panada de xai', 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Panadescuites.jpg', 'Panada de carn de xai de Mallorca', 2.05, true, 4, 6, 1, to_tsvector('Panada de carn de xai.Panada de carn de xai de Mallorca. Rebosteria. Empanada')),
('Ensaimada llisa', 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Ensaimada_DSCN0885.jpg', 'Ensaimada llisa de Mallorca (buida)', 13.69, true, 4, 6, 1, to_tsvector('Ensaimada llisa. Ensaimada llisa de Mallorca (buida). Rebosteria')),
('Ensaimada de crema', 'https://upload.wikimedia.org/wikipedia/commons/5/52/Ensa%C3%AFmada_con_crema-rafax-.JPG', 'Ensaimada de crema de Mallorca petita', 1.90, true, 4, 6, 1, to_tsvector('Ensaimada de crema de Mallorca petita. Rebosteria')),
('Barra de pà', 'https://p0.piqsels.com/preview/803/260/874/bread-baguettes-food.jpg', 'Barra de pà ordinària. Baguette', 0.35, true, 4, 3, 1, to_tsvector('Barra de pà. Barra de pà ordinària. Baguette. Pan')),
('Xapata', 'https://cdn.pixabay.com/photo/2016/08/12/16/20/ciabatta-1589071_960_720.jpg', 'Barra de pà de xapata', 0.85, true, 4, 3, 1, to_tsvector('Xapata. Barra de pà xapata. Pan')),
('Barra de pà integral', 'https://cdn.pixabay.com/photo/2013/01/08/01/20/bread-74275_960_720.jpg', 'Barra de pà integral amb cereals i semilles', 0.65, true, 4, 3, 1, to_tsvector('Barra de pà integral. Barra de pà integral amb cereals i semilles. Pan')),
('Coca de piñons', 'https://p1.pxfuel.com/preview/992/916/895/crack-crispbread-bread-sweden-royalty-free-thumbnail.jpg', 'Porció de coca de piñons i cabell d''àngel', 2.65, true, 4, 6, 1, to_tsvector('Coca de piñons. Porció de coca de piñons i cabell d''àngel. Rebosteria')),
('Pizza de bacó', 'https://p0.piqsels.com/preview/1014/238/573/square-shaped-vegetable-pizza-thumbnail.jpg', 'Porció de pizza de bacó amb tomàtiga natural', 1.50, true, 4, 6, 1, to_tsvector('Pizza de bacó. Porció de pizza de bacó amb tomàtiga natural Rebosteria')),
('Salmó', 'https://cdn.pixabay.com/photo/2018/02/08/12/41/salmon-3139390_960_720.jpg', 'Salmó de cantàbria filetetjat', 23.5, true, 5, 5, 2, to_tsvector('Salmó. Salmó de cantàbria filetetjat. Peix. Pescado')),
('Gambes', 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Gambes_de_Palam%C3%B3s_crues_a_l%27Espai_del_Peix_de_Palam%C3%B3s_2.jpg', 'Gambes fresques de Mallorca', 19.25, true, 5, 5, 2, to_tsvector('Gambes. Gambes fresques de mallorca. Peix. Pescado. Crustaci')),
('Musclos', 'https://cdn.pixabay.com/photo/2019/10/01/09/23/mussels-4517673_960_720.jpg', 'Musclos nets de roca', 6.60, true, 5, 5, 2, to_tsvector('Musclos. Musclos nets de roca. Peix. Pescado. Mejillones. Crustaci')),
('Llamàntol', 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Bogavante_salvaje.jpg', 'Llamàntol de Menorca', 59.00, true, 5, 5, 2, to_tsvector('Llamàntol. Llamàntol de Menorca Peix. Pescado. Bogavante. Crustaci')),
('Cloïsses', 'https://p1.pxfuel.com/preview/442/393/219/clam-shell-ocean-sea-beach-costa.jpg', 'Cloïsses de carril', 14.45, true, 5, 5, 2, to_tsvector('Cloïsses. Cloïsses de carril. Peix. Pescado. Almejas. Crustaci')),
('Pelaies', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/La_recova_078_Lenguado.jpg', 'Pelaies fresc al pes', 9.80, true, 5, 5, 2, to_tsvector('Pelaies. Pelaies fresc. Peix. Pescado. Lenguado')),
('Anfós', 'https://upload.wikimedia.org/wikipedia/commons/b/b9/FMIB_38143_Epinephelus_morio_%28Cuvier_%26_Valenciennes%29_Red_Grouper%3B_Mero_2.jpeg', 'Anfós fresc pescat a Mallorca', 25.60, true, 5, 5, 2, to_tsvector('Anfós. Anfós fresc pescat a Mallorca Peix. Pescado. Mero')),
('Bacallà', 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Bacalao-Salaz%C3%B3n.jpg', 'Bacallà fresc de Mallorca', 16.85, true, 5, 5, 2, to_tsvector('Bacallà. Bacallà fresc de Mallorca. Peix. Pescado. Bacalao')),
('Sardines', 'https://cdn.pixabay.com/photo/2017/05/06/10/52/sardines-2289503_960_720.jpg', 'Sardines petites de KM0', 9.87, true, 5, 5, 2, to_tsvector('Sardines. Sardines petites de KM0 Peix. Pescado. Sardina')),
('Vi Ses Nines', 'https://www.navarrobodeguero.com/624-large_default/ses-nines-tinto.jpg', 'Vi negre Ses Nines de Binissalem', 10.35, true, 6, 8, 1, to_tsvector('Vi ses Nines. Vi ses Nines de Binissalem. Begudes. Vino tinto')),
('Vi Acrollam', 'https://media.ideavinos.com/catalog/product/cache/3c80f1573f8d22e9902170fcf1d560af/v/i/vino-acrollam-blanc.jpg', 'Vi blanc Acrollam amb denominació mallorquina', 9.79, true, 6, 8, 1, to_tsvector('Vi Acrollam. Vi blanc Acrollam amb denominació mallorquina. Begudes. Vino blanco')),
('Cervasa Sullerica', 'https://birrapedia.com/img/modulos/cerveza/099/sullerica-blanca_15088406794846_t.jpg', 'Cervesa artesana Sullerica', 2.89, true, 6, 8, 1, to_tsvector('Cervesa Sullerica. Cervesa artesana Sullerica. Begudes. Cerveza')),
('Cervasa Sa roqueta', 'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201903/06/00118603002876____2__325x325.jpg', 'Cervesa artasana Sa roqueta. Pilsner de la fàbrica Forastera', 2.35, true, 6, 8, 1, to_tsvector('Cervesa Sa roqueta. Cervesa artasana Sa roqueta. Pilsner de la fàbrica Forastera. Begudes. Cerveza'));


INSERT INTO orders (user_id, tracking_stage, order_type, rating, is_paid) VALUES 
(1, 4, 1, 4, true),
(1, 4, 2, 1, true);

INSERT INTO order_products (order_id, product_id, quantity) VALUES 
(2, 16, 4),
(2, 14, 3),
(2, 25, 1),
(2, 36, 2),
(2, 18, 8),
(2, 3, 1),
(2, 30, 1);
