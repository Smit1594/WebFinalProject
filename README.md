
# Project Title
Final Project - Ecommerce Website(Shoes)

**Student Name**: Smitkumar Rajeshbhai Radadiya  
**Student Number**: 8952996  
**Date**: 22/07/2024

### Technology Stack

**Frontend**: ReactJS  
**Backend**: Node.js  
**Database**: MongoDB(Atlas)

### Database Schema Design (MongoDB)

**Users Schema**

- `username`: String
- `password`: String
- `role`: String

**Products Schema**

- `name`: String
- `description`: String
- `price`: Number
- `category`: String
- `stock`: Number
- `imageUrl`: String

**Order Schema**

- `user_id`: ObjectId
- `total_amount`: String
- `created_at`: Date

**Order Item Schema**

- `order_id`: ObjectId
- `product_id`: ObjectId
- `quantity`: Number
- `price`: Number

**Cart Item Schema**

- `user_id`: ObjectId
- `product_id`: ObjectId
- `quantity`: Number

### Notes

- The project is set up using Git and GitHub for version control.
