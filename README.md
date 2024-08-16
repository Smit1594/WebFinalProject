
# StepInStyle
Final Project - Ecommerce Website(Shoes)

**Student Name**: Smitkumar Rajeshbhai Radadiya  
**Student Number**: 8952996  
**Date**: 22/07/2024

### Admin Credential
**UserName**: Admin
**Password**: Admin@123


### Technology Stack

**Frontend**: ReactJS  
**Backend**: Node.js  
**Database**: MongoDB(Atlas)

### Database Schema Design (MongoDB)

**Users Schema**

- `username`: String
- `password`: String
- `role`: String

**Categroy Schema**

- `name`: String
- `description`: String

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

### Project Setup

**Project Initialization:** : Clone Project From Github then open the project.
**Frontend Setup:** : Go to react-frontend-app and Install node module by passing `npm install` command, after that run the project using `npm run command`
**Frontend Setup:** : Go to node-backend-app and Install node module by passing `npm install` command, after that start server using `node app.js`

# Testing

#### Test Case 1: Display Products

**Steps:**
- Navigate to the homepage.
- Ensure that the list of products is displayed.

- **Expected Result:** Products should be listed with correct details.

#### Test Case 2: Display Single Product

**Steps:**
- Navigate to the homepage.
- Click on Any one Item Container.
- It has all the details of product.
- It has "Add to Cart" button.
- It Also Allow to add Multiple Item to the Cart

- **Expected Result:** Product should be displayed with all the details and have functional "Add to Cart" with multiple Items.

#### Test Case 3: Perform Add

**Steps:**
- Navigate to the Product Detail Page.
- Select Number of Item.
- Click on "Add To Cart".
- It will show an Message saying 'Item addedd Successfullt to Cary'

- **Expected Result:** Product should added to the cart with appropriate message.

#### Test Case 4: Display Carts

**Steps:**
- Navigate to the Cart.
- Ensure that the list of cart items is displayed.
- Ensure It has Remove Item to Remove Item From Cart
- Ensure It has Checkout Button.

- **Expected Result:** Cart Items should be listed with correct details and have Delete option to remove from cart and also have an Checkout Button.

#### Test Case 5: Delete Item From Cart

**Steps:**
- Navigate to the Cart.
- Ensure that the list of cart items is displayed.
- Ensure It has Remove Item to Remove Item From Cart
- Click on Delete on any one Item.
- It shows an Success or Failure Alert Message.
- Item Should be removed from cart

- **Expected Result:** Cart Items should be listed with Delete option to remove from cart. It should be removed from Cart.

#### Test Case 6: Checkout Page

**Steps:**
- Navigate to the Checkout.
- You should be able to see the summary of all the items.
- Fill the all the information.
- Click on Place your order and it will complete you order.
- you should automatically navigate to home page.

- **Expected Result:** User should able to see summary and enter their order details and place the order.

#### Test Case 7: Admin Login

**Steps:**
- Navigate to the Login.
- You should enter Admin Id Password.
- It will redirect you to admin pages.

- **Expected Result:** User should able to login.

#### Test Case 7: Admin Dashboard

**Steps:**
- Navigate to the dashboard after Login as Admin.
- Ensure that the list of products is displayed.
- It should have Add, Edit and Delete Buttons.

- **Expected Result:** Products should be listed with correct details.

#### Test Case 8: Admin Category

**Steps:**
- Navigate to the category after Login as Admin.
- Ensure that the list of categories is displayed.
- It should have Add, Edit and Delete Buttons.

- **Expected Result:** Categories should be listed with correct details.


#### Test Case 9: Add Update Product

**Steps:**
- Navigate to the dashboard after Login as Admin.
- Ensure that the list of products is displayed.
- It should have Add, Edit Button.
- Click on Add Button, It should give you blank form with product property. You should be able to Add an Product.
- Click on Update Button, It should give you pre filled product details. you should be able to Update the Product.
- You will get and success or failure message.

- **Expected Result:** User Should be able to add an update Product.

#### Test Case 10: Add Update Categories

**Steps:**
- Navigate to the category after Login as Admin.
- Ensure that the list of categories is displayed.
- It should have Add, Edit Button.
- Click on Add Button, It should give you blank form with category property. You should be able to Add an Category.
- Click on Update Button, It should give you pre filled category details. you should be able to Update the Category.
- You will get and success or failure message.

- **Expected Result:** User Should be able to add an update Category.

# Deployement

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js**: [Download and install Node.js](https://nodejs.org/).
- **Git**: [Download and install Git](https://git-scm.com/).

## Setup

Follow these steps to set up and run the project:

1. **Clone the Repository:**

   Clone the repository from GitHub to your local machine using the following command:

   git clone https://github.com/Smit1594/WebFinalProject
   cd WebFinalProject

3. **Install Dependencies for React Project**
    cd react-frontend-app
    npm install

   **Start the Development Server**
   npm start(http://localhost:3000)

4. **Install Dependencies for Node Project**
    cd node-backend-app
    npm install

    **Start the Development Server**
    node app.js (http://localhost:8080)
