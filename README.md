# Technologies Used

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

# Features

-   [x] **User Dashboard**
        User can sign up and login to the app using their email and password. User can also sign in using their Google account. After signing up or logging in, users will be routed to the dashboard, where they will see menus based on their role (default: "user"). Users can update the profile, see their upcoming tests, get reoports of their past tests and view their payment history.
-   [x] **Admin Dashboard**
        When an admin logs in, they will be routed to the admin dashboard. Admins can create new tests, view all tests, view all users, view all payments, create reports for taken tests. Admins can also create test slots for users to take tests. Admins can also create new admins, block and unblock user, create and select active banner for the home page. There are 2 charts for top selling tests in the admin home route. Admin dashboard is protected and only accessible to admins.
-   [x] **Featured Test**
        Featured test in the home page shows top three tests that are sold the most. These are calculated at the backend automatically each time the home page data is fetched.
-   [x] **Pagination**
        Pagination is implemented where necessary.
-   [x] **Filter By Date**
        Date based slot filtering has been implemented, so that when a user logs in, they will only see the slots that are available for the current and future dates.
-   [x] **Payment Gateway**
        Stripe payment gateway has been implemented. Users can pay for the tests using their credit or debit cards. Payment is handled by Stripe and the app only stores the payment information in the database.
-   [x] **Real time data render using TanStack Query**
        I have used React Query to fetch data from the back-end and render it in the front-end. React Query also caches the data and updates it in real time. So when an user applies for a job, the applicants number gets updated in real time.
-   [x] **JWT Tokens**
        I have used JWT tokens to authenticate users. When a user signs up or logs in, a JWT token is generated and stored in the local storage of the client. When the user logs out, the token is removed. This token is used to authenticate users and protect routes where token is validated before returning data.
-   [x] **Firebase**
        The app is using Firebase for authentication. Firebase is a Backend-as-a-Service (BaaS) app development platform that provides hosted backend services such as a realtime database, cloud storage, authentication, crash reporting, machine learning, remote configuration, and hosting for your static files. I have used Firebase to create a user authentication system for the app.

[Demo](https://vitalscan-diagnostics.web.app/)
