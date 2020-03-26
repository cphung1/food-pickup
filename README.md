### Food Pick-up 
A food ordering pick-up app for a single restaurant. 
Built as a group mditerm project using AJAX, Node and Express. 

## Final Project 

**Main Page**
!["Screenshot of the main page"](https://github.com/cphung1/food-pickup/blob/master/public/images/main.png)


**Adding Item**
!["Screenshot of Adding Item"](https://github.com/cphung1/food-pickup/blob/master/public/images/main_modal.png)


**Customer Confirmation Page**
!["Screenshot of Customer Confirmation Page"](https://github.com/cphung1/food-pickup/blob/master/public/images/cust_order_confirm.png)


**Customer Time Update**
!["Screenshot of Customer Time Update"](https://github.com/cphung1/food-pickup/blob/master/public/images/cust_time.png)


**Customer Order Complete**
!["Screenshot of Customer Order Complete"](https://github.com/cphung1/food-pickup/blob/master/public/images/cust_order_complete.png)


**Restaurant Confirmation Page**
!["Screenshot of Restaurant Confirmation Page"](https://github.com/cphung1/food-pickup/blob/master/public/images/rest_confirm.png)


**Restaurant Time Confirmation**
!["Screenshot of Restaurant Time Confirmation"](https://github.com/cphung1/food-pickup/blob/master/public/images/rest_time.png)


**Restaurant Order Completed**
!["Screenshot of Restaurant Order Completed"](https://github.com/cphung1/food-pickup/blob/master/public/images/rest_order_complete.png)


**Restaurant Order Text**
!["Screenshot of Restaurant Order Text"](https://github.com/cphung1/food-pickup/blob/master/public/images/txt_rest.png)


**Customer Order Confirmation Text**
!["Screenshot of Customer Order Confirmation Text"](https://github.com/cphung1/food-pickup/blob/master/public/images/txt_time.png)


**Customer Order Completed Text**
!["Screenshot of Customer Order Completed Text"](https://github.com/cphung1/food-pickup/blob/master/public/images/txt_completed.png)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Run the server: `npm run local`
5. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Twilio
- Body-parser
- Express
- JQuery
- Ejs
- Node-sass
- Dotenv

## Known Issues
- The phone numbers are currently hardcoded into the application, you will have to manually add the number you want to send the texts to.
- You need to sign up for Twilio to receive a twilio number to text from as well as register the numbers you want to send texts to. 
- The order confirmation page for restaurants does not actually save any state of the order status, therefore when you refresh the page you can re-enter a new time for the order that you already mark completed. 
- If you add multiples of one item rather than using the quantity incrementor, when trying to delete the item from the checkout area all items with the same name will be deleted. 
