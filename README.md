# SEA Salon

Introducing SEA Salon, a rising star in the salon industry known for their outstanding services and excellent reviews. With a rapidly growing clientele and a stellar reputation, SEA Salon is your premier destination for all your beauty needs. To handle the new customers, the SEA Salon management team has decided to develop a new SEA Salon Application. This app lets users easily browse available services, select their preferred stylist, and book appointments quickly. With a user-friendly interface and seamless booking integration, making a reservation with a top stylist has never been easier!

## Description

This project was created to complete the technical test for the software 
engineering academy held by Compfest.

The main features and objectives of this project are:

1. Home Page for SEA Salon
2. Customers are able to make reviews
3. Customers are able to make reservations from the website
4. Customers are able to log in
5. Advanced reservation system

## Technologies Used

- **Next.js**: Framework
- **Tailwind CSS**: Styling
- **Prisma**: ORM
- **PostgreSQL**: Database
- **Framer Motion**: JavaScript library for animations

## Installation

To run the project on your local machine, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone [repository_url]


2. **Install Dependencies**:
   ```bash
   npm install
   
3. **Make the Environment with the Template**:
   ```bash
   cp .env.example .env
   ```
   
   or in the windows use

   ```bash
   copy .env.example .env
   ```

4. **Setting up all the Environment Variable**:
   
   You can see all the list of environment variable needed for this project 
   in the next section

5. **Run the development server**:
   ```bash
   npm run dev

6. **Build the project**:
   ```bash
   npm run build
   

## Environment Variables

**AuthSecret**

   Used for security you need to generate secret random key

   openssl rand32

**DATABASE_URL**

   Specify the configuration for database with format:
   database://user:password@ip:port/database_name
   
   you can see the detail [here](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgresql)

[//]: # (## Screenshots)

## Contributing
You can star the project to support us!

## Contact
For any questions or feedback, you can reach me at [arzi.tech](https://arzi.tech)