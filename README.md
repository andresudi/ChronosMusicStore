# ChronosMusicStore

portofolio e-commerce with vue directive/component

## User Routes

| Route           | Method | Description          | Attributes                  |
| --------------- | ------ | -------------------- | --------------------------- |
| /users          | GET    | Get all users data   |                             |
| /users/register | POST   | Register new account | name, email, password, role |
| /users/login    | POST   | Login                | email, password             |

## Item Routes

| Route        | Method | Description                         | Attributes                                                          |
| ------------ | ------ | ----------------------------------- | ------------------------------------------------------------------- |
| /items       | GET    | Get all items data                  |                                                                     |
| /items/cd    | GET    | Get all CD data                     |                                                                     |
| /items/merch | GET    | Get all merch data                  |                                                                     |
| /items       | POST   | add new item (only admin)           | artist, productName, img, category, price, stock                    |
| /items/:id   | PUT    | update a specific item (only admin) | artist, productName, img, category, price, stock, id item on params |
| /items/buy   | PUT    | buy item (authenticated user)       |                                                                     |
| /items/:id   | DELETE | delete a specific item (only admin) | id item on params                                                   |

## Cart Routes

| Route   | Method | Description                                                 | Attributes                            |
| ------- | ------ | ----------------------------------------------------------- | ------------------------------------- |
| /carts  | GET    | Get all transaction data                                    |                                       |
| /carts/ | POST   | create new transaction (need login first to do this action) | userId, listItem(id item), totalPrice |

## Demo 

https://chronos-music.andresudi.club/