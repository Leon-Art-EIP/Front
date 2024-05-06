# Leon'art Web App

[![React](https://img.shields.io/badge/React-v17.0.2-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is the web app for Leon'art, the startup that brings art to your doorstep, and that aims to democratize art selling. The app is built using React and allows users to browse and purchase art, as well as manage their orders and account information.

## Installation

To install the app, follow these steps:

1. Clone the repository to your local machine
2. Install the required dependencies by running `yarn install`
3. Create a .env.development file if you want to run the app in development mode, or a .env.production file if you want to run the app in production mode. The .env files should contain the following variables:
(__MANDATORY__): </br>
``NEXT_PUBLIC_BACKEND_URL="..."``</br>
(__OPTIONAL__ if you want to use the payment system):</br>
``NEXT_PUBLIC_STRIPE_PUBLIC_KEY="..."``</br>
(__OPTIONAL__ if you want to recieve live notification via firebase):</br>
``NEXT_PUBLIC_FIREBASE_API_KEY="..."``</br>
``NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."``</br>
``NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."``</br>
``NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."``</br>
``NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."``</br>
``NEXT_PUBLIC_FIREBASE_APP_ID="..."``</br>
``NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="..."``</br>
``NEXT_PUBLIC_FIREBASE_VAPID_KEY="..."``</br>
4. Start the app by running `yarn dev`


## Testing

To test the app with cypress, follow these steps:

### CLI Cypress testing (without UI interface)

1. Start the app by running `yarn dev`
2. Start the tests by running `yarn cypress run`

### UI Cypress testing (with UI interface)

1. Start the app by running `yarn dev`
2. Install cypress app on your local machine, follow the doc for more informations : https://docs.cypress.io/guides/getting-started/installing-cypress
3. Start the tests by running `yarn cypress:open`

## Usage

Once the app is running, you can use it to browse and purchase art. The app supports the following features:

- Browsing art by category
- Searching for art by artist or title
- Viewing detailed information about each piece of art, including price and availability
- Adding art to your cart
- Communicating directly with an artist of your choice
- Checking out and completing your purchase
- Viewing your order history and tracking your orders
- Managing your account information, like payment methods

## Contributing

If you would like to contribute to the development of the Leon'art web app, please follow the guidelines outlined in [CONTRIBUTING.md](https://github.com/Leon-Art-EIP/.github/blob/main/CONTRIBUTING.md).

## Code of Conduct

We expect all contributors to adhere to our [code of conduct](https://github.com/Leon-Art-EIP/.github/blob/main/CODE_OF_CONDUCT.md).

## Documentation

To learn more about React, check out the official [documentation](https://reactjs.org/docs/getting-started.html).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
