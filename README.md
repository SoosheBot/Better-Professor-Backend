## Better Professor App BE 

- [ ] The BE server link can be accessed here: https://a-better-professor.herokuapp.com/

- [ ] Project Vision: https://www.notion.so/A-Better-Professor-Product-Vision-710c5f2e4cc346df8f6e4c1a81c16bbd

- [ ] Trello Board with Daily Milestones (teams are responsible for maintaining their daily milestones): https://trello.com/b/apD6yvDU/better-professor-app

#######################################################

## API ENDPOINTS ##
|feature|method|url|
|:--|:--:|:--|
|register user |POST|/api/auth/register|
|login user |POST|/api/auth/login|
|log out user |GET|/api/auth/logout|

## Admin Registration Example (backend creates this -- front end registration's default is user):

{
    "lastname":"Franklin",
    "firstname": "Ben",
    "username": "KiteGuy",
    "password": "Password1",
    "email": "pennysaved@email.com",
    "role": "admin"
}

## Admin Login Example (front end can use this to view admin-only content):
{
    "username":"KiteGuy",
    "password":"Password1"
};

##User Registration has the following required pieces:
[ ] id (user.id), 
[ ] lastname (user.lastname), 
[ ] firstname (user.firstname), 
[ ] username (user.username),
[ ] email (user.email)

## Example of a registered user:
{   
    "id": 4
	"lastname":"Franklin",
	"firstname":"Aretha",
	"username":"GoldenVoice",
	"password":"password1",
	"email": "nightingale@email.com"
    "role":"user"
}

|:--|:--:|:--|
|Professor's Dashboard|
|list students (only professor/admin can view the following items!)|GET|/api/users|

  [{   
    "id": 3
	"lastname":"Franklin",
	"firstname":"Aretha",
	"username":"GoldenVoice",
	"password":"password1",
	"email": "nightingale@email.com"
    "role":"user"
}

    {   
    "id": 1
	"lastname":"Franklin",
	"firstname":"Ben",
	"username":"KiteGuy",
	"password":"password1",
	"email": "pennysaved@email.com"
    "role":"admin"
}]

|list student by id|GET|/api/users/:id|
|list student's tasks|GET|/api/users/:id/tasks|
    {
        "id": 2,
        "username":"Student",
        "task":"Task 1"
        "task":Task 2"
    }
|list student's deadlines|GET|/api/users/:id/deadlines|
    {
        "id":2,
        "username":"Student",
        "due date":"2020-12-12"
        "due date":"2020-10-10"
    }
|list student's messages|GET|/api/users/:id/messages|
    {
        [
    {
        "id": 3,
        "message": "When will you finish this",
        "task_id": 2,
        "user_id": 2,
        "created_at": "2020-03-04T16:56:45.996Z",
        "updated_at": "2020-03-04T16:56:45.996Z"
    },
    {
        "id": 1,
        "message": "Plan to complete this in time!",
        "task_id": 1,
        "user_id": 2,
        "created_at": "2020-03-04T16:53:26.245Z",
        "updated_at": "2020-03-04T16:53:26.245Z"
    }
]
    }
|add project and deadline to student profile|POST|/api/users/:id/tasks|
    {
	"deadline_id": 2,
	"task":"Task 2",
	"user_id": 2
    }
|add student|POST|/api/users| (see user registration)
|update student|PUT|/api/users/:id|

|delete student|DEL|/api/users/:id|

|:--|:--:|:--|
|list tasks (with deadlines)|GET|/api/tasks|
|update task|PUT|/api/tasks/:id|
|delete task|DEL|/api/tasks/:id|

|:--|:--:|:--|
|send message to self|POST|/api/messages|
    {
	"message": "Hey Student, when will you have this done?",
	"task_id": 4,
	"user_id": 2

    }
|list all user messages|GET|/api/users/:id/messages|
    {
        "username":"Student",
        "message": "Hey student, can you get this done?"
    }
|:--|:--:|:--|
|send message to student|POST|/api/users/:id/messages|
|list a student's messages|GET|/api/users/:id/messages|
|:--|:--:|:--|
|STRETCH|STRETCH|STRETCH|
|add tags to student|POST|/api/students/:id/tags|
|filter lists by: student name, deadlines, tasks, tags|


Note -- A message should include a send date, time, and a long text field that enables the message curator the ability to send a custom message.


##Basic User Workflow: 
register >> login >> view dashboard (homepage) >> logout

##The Dashboards:
[ ] - Professor's Dashboard 
    - [ ] - Left column displays: all student names (/api/users)
    - [ ] - Right column displays: all upcoming deadlines (/api/deadlines)

[ ] - Student's Dashboard
    - [ ] - Displays all of the student's tasks (with deadlines) (/api/users/:id)

##Student Dashboard Example:
{
    "username":"Student",
    "tasks": {
        "name": "Write paper",
        "due_date": "2020-10-10"
    }
}