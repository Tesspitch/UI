Design and update the ZenseExam web application with the following features and requirements. Structure the system clearly so both Teacher and Student roles can use the system effectively.

1. Question Creation Improvements

Update the Add / Edit Question page with the following functionality:

Teachers must be able to select the correct answer by ticking the correct choice directly.

Choices should not be limited to 4 options. Teachers must be able to add more choices dynamically (Add Choice button).

Each question can include:

Question text

Optional image attachment in the question

Each choice can include:

Choice text

Optional image attachment in the choice

The system should allow:

Add Choice

Remove Choice

Mark Correct Choice

2. Question Difficulty

Each question must have a difficulty level:

Easy

Medium

Hard

Teachers can assign the difficulty level when creating or editing a question.

3. Exam Generation Page

Update the Generate Exam page so teachers can specify the number of questions by difficulty level.

Example configuration:

Easy questions: 10

Medium questions: 5

Hard questions: 5

The system should randomly select questions from the Exam Bank based on the selected difficulty distribution.

4. Exam Bank Management

Questions belong to a Course Question Bank.

Each Course has its own Question Bank.

Teachers must have full CRUD functionality:

Create Question

View Question

Update Question

Delete Question

5. Student Exam Room Access

Add a Join Exam Room page for students.

Students can enter an Exam Invitation Code provided by the teacher.

System behavior:

Student enters exam code

System validates the code

Student enters the exam room

6. Exam Interface

The Exam Page must include:

Question display

Multiple choices

Question navigation

Submit exam button

7. Practice / Trial Exam Mode

Add a Practice Mode (Trial Exam).

Students can enter a practice exam page to try answering questions before the real exam.

Practice mode features:

Random questions

No score recording in official results

Immediate feedback optional

8. Complete CRUD System

Ensure the system supports full CRUD operations for all core entities:

User

Subject

Course

Question Bank

Question

Choice

Exam

Exam Result

Each entity must support:

Create

Read

Update

Delete

9. Course-Based Structure

System hierarchy should be:

Subject
→ Course
→ Question Bank
→ Exam

Each Course contains:

Question Bank

Exams

Exam Results

10. UI Design Requirements

Design the interface as a Modern SaaS Dashboard.

Key design goals:

Clean interface

Easy navigation

Card-based layout

Sidebar navigation

Clear exam workflow

User-friendly exam interface

The system should be designed for efficient exam creation, exam management, and online exam participation.