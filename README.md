
# Roserade Shop


This is the build in project for the course by Brad Traversy on Udemy. You can see it [here](https://www.udemy.com/course/mern-ecommerce).


## Overview

Roserade Shop is a simple e-commerce site for fashion clothes using MERN stack.

## Features

- Shopping cart
- Search for product
- Product review and rating
- User can see their orders in profile
- Check out process(shipping, payment method, purchase)
- Paypal integration
- CRUD operations for Admin (products, users)
- Mark order as delivered
- Security (Implement Authentication and Authorization)

### Note

The Paypal feature running smothly in the first run but when I try it again in the second run its seem to have some unknown error which I belived is there might be something wrong with the React-Paypal-Button (?). I’m still trying to figure it out…

And also when I finish this project I remember I had forgot to add the size button for product… I will update it soon hehe…

## Technologies

- React
- Mongoose
- Redux Toolkit
- React-Bootstrap
- React-Router-DOM v6
- Express

## Screenshots

Sample screen shot

![](https://i.imgur.com/DivNd1i.png)
![]( https://i.imgur.com/k4Uciq1.png)

## Installation

### Env Variables

Create a .env file and add the following variables:
```
NODE_ENV = development
PORT = your port
MONGO_URI = your mongodb uri
JWT_SECRET = 'iamlostinthisworld'
PAYPAL_CLIENT_ID = your paypal client id
```

### Frontend/Client

```
cd client
npm i
```
The frontend is located at port 3000

### Backend/Server

```
npm i
```

The backend is located at port 5000

### Run
```
npm run dev
```

### Database

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

Users in demo data: 
```
admin@admin.com
123

quoc@bao.com
123

bao@quoc.com
123
```

## Acknowledgements

I would like to thank Brad for the fantastic course he had prodived. This course is very well designed and informative, it covers all the necessary topics for building a e-commerce with MERN stack. An unforunate aspect of this course is that some parts of its seem a little bit outdated which are: React-Router-DOM v5, Redux, Paypal Button. And for those reasons, I've re-writtten it with Redux-Toolkit. It's still a amazing course after all.
