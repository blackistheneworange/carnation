A simple car inventory app built using next.js, redux, material-ui.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Endpoints

To learn more about Next.js, take a look at the following resources:

#User

- [http://localhost:3000/login](http://localhost:3000/login) - Login as user.
- [http://localhost:3000/signup](http://localhost:3000/signup) - Register as a new user.
- [http://localhost:3000](http://localhost:3000) - View/buy listed cars as a user.
- [http://localhost:3000/purchased-cars](http://localhost:3000/purchased-cars) - View purchased cars by the user.


#Admin

- [http://localhost:3000/admin/login](http://localhost:3000/admin/login) - Login as admin.
- [http://localhost:3000/admin/login](http://localhost:3000/admin/signup) - Register as a new admin.
- [http://localhost:3000/admin](http://localhost:3000/admin) - View/edit/delete listed cars as an admin.
- [http://localhost:3000/admin/new-car](http://localhost:3000/admin/new-car) - Create a new car as an admin.

#Data

All data are stubbed using static json files
