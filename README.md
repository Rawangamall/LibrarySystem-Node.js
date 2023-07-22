# Library System

## Introduction

The Library System is a web-based application designed to monitor and manage various transactions within a library. It offers a range of functionalities for different types of users, including Basic Admin, Admin, Employee, and Member. This README file outlines the main features and functionalities of the Library System, along with instructions on how to use it effectively.

## User Types and Permissions

1. Basic Administrator:
   - Responsible for managing admins in the system, monitoring system data, and updating any relevant information.
   - Able to perform full CRUD operations on admins, employees, books, and members.
   - Has access to view all system data, including books, publishers, and authors.
   - Can generate suitable reports that appear to admins in the system.

2. Administrator:
   - Can add and manage employee user accounts.
   - Has the authority to add, remove, or update books' data.
   - Can search for employees by First Name and Last Name (bonus: auto-complete search).

3. Employee:
   - Responsible for adding and managing member (library user) data.
   - Can perform borrowing and returning books for members.
   - Manages reading books within the library.
   - Has access to view all system data, including books, publishers, and authors.
   - Can search for members by Name or E-mail (AutoComplete Capability).
   - Can search for books by Publisher, Author, or Title, and view their availability, number of borrowed copies, and available copies.

4. Member:
   - Can view their profile, including borrowed books, reading books, and borrowing deadlines.
   - Has the ability to update their profile, except for email.
   - Can search for books in the library based on various criteria like year, category, publisher, author, and availability.
   - Has access to see new arrived books, most borrowed books, and most reading books filtered by year.

## Installation and Setup

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install` in the project directory.
3. Configure the database and ensure all necessary tables and relationships are set up correctly.
4. Start the server by running `npm start`.
5. Access the Library System through your web browser by visiting `http://localhost:3000`.

## Usage

### Basic Administrator

1. Log in as the Basic Admin with your credentials.
2. Add admin and basic admins users by providing their information such as first name, last name, email, password, birth date, hire date, image, and salary.
3. Ensure that each Admin user changes their password and completes their full data, including uploading their own photo, except for hire date and salary.
4. Perform CRUD operations on admins, employees, books, and members.
5. Access suitable reports routes that appear on the system.

### Administrator

1. Log in as an Administrator using your credentials.
2. Add Employee users by providing their information like first name, last name, email, password, birth date, hire date, image, and salary.
3. Ensure each Employee user changes their password and completes their full data, except for hire date and salary.
4. View and update your profile, excluding hire date, salary, and email.
5. Add, remove, and update Employee data.
6. Search for employees by First Name and Last Name (bonus: auto-complete search).
7. Manage books, including adding, removing, and updating their data.

### Employee

1. Log in as an Employee with your credentials.
2. Add member (Library user) data, including full name, email, password, image, phone number, birth date, full address, and creation date.
3. Ensure each Member changes their password at first login.
4. View all system data, including books, publishers, and authors.
5. Update your profile, except for salary, hire date, and email.
6. List all members' data.
7. Add, remove, and update Members' data.
8. Search for members by Name or E-mail (AutoComplete Capability).
9. List all books' data.
10. Search for books by Publisher, Author, or Title, and view their availability, number of borrowed copies, and available copies.
11. Search for available books, borrowed books with the respective members, and employees responsible for borrowing.
12. View new arrived books, most borrowed books, and most reading books filtered by year.
13. Borrow books for Members with their full data, ensuring the book is available and the number of borrowed copies doesn't exceed the available copies.
14. Prevent borrowing the same book for the same Member if they still have a copy of it. Allow borrowing if the book is returned.
15. Prevent borrowing if there's only one copy of the book (Library must have a spare book for reading).
16. **BONUS:** If a Member exceeds the return date, prevent them from borrowing any book in the library for a week.

### Member

1. Log in as a Member using your credentials.
2. Update your profile, except for email.
3. View reading books in the current month, with the option to filter by month and year.
4. View borrowed books in the current month, with the option to filter by month and year.
5. See new arrived books.
6. View currently borrowed books, their return date, and the number of times they were borrowed (with warnings for late returned books).
7. Search for books in the library based on various criteria like year, category, publisher, author, and availability.
8. Search for available books, borrowed books with the respective members, and employees responsible for borrowing.
9. View new arrived books, most borrowed books, and most reading books filtered by year.
