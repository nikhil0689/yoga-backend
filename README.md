# yoga-backend

The Yoga Backend App is intended to provide APIs for Student management for a Yoga studio

These are the Components and their APIs

1. Students

POST /students - Create a new student
GET /students/id - Get a student by id
GET /students - Get all students
PATCH /students/id - Update a student
DELETE /students/id - Delete a student

2. Class

POST /classes - Create a Class
GET /classes/id - Get a Class by id
GET /classes - Get all classes
PATCH /classes/id - Update a class
DELETE /classes/id - Delete a class

3. Payment

POST /payments - Add a Payment for a student
GET /payments/id - Get Payment by id
GET /payments - Get all Payments
PATCH /payments/id - Update a Payment
DELETE /payments/id - Delete a Payment

AWS Lambda/ Gateway inputs
npm run build
sls offline -> Verify routes locally
sls deploy
