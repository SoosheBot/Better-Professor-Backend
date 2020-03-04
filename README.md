## Better Professor App BE 

- [ ] The BE server link can be accessed here: https://a-better-professor.herokuapp.com/

- [ ] Project Vision: https://www.notion.so/A-Better-Professor-Product-Vision-710c5f2e4cc346df8f6e4c1a81c16bbd

- [ ] Trello Board with Daily Milestones (teams are responsible for maintaining their daily milestones): https://trello.com/b/apD6yvDU/better-professor-app

#######################################################

## API ENDPOINTS ##
|feature|method|url|

#Registration and Login: Professor Account: 
|register professor |POST|/api/auth/register|
[] -lastname
[] -firstname
[] -username
[] -password
[] -email
[] -role: admin <----don't forget this!

Looks like: 
{   
	"lastname":"Franklin",
	"firstname":"Ben",
	"username":"KiteGuy",
	"password":"Password1",
	"email": "nightingale@email.com",
	"role": "admin"
}

Returns a token - Example:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IktpdGVHdXkiLCJ1c2VyIjoiJDJhJDEwJDhnWkJIaGZldEJ0TkRtV0FRSElGUk9KSGNXMjF2N0N6MEQ2L2E5TGxvc1RDMk5UOXpPWUl1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgzMzU5NzYwLCJleHAiOjE1ODMzNjMzNjB9.YaszdiimzJi5utAY18gLGbXM7zkPnKp4BmVvUV6rjiw",
    
    "message": "Welcome KiteGuy"
}

#Login Professor:
|login professor|POST|/api/auth/login|
[] -username
[] -password

#Looks like: 
{
	"username":"KiteGuy",
	"password":"password1"
}

Returns a token - Example:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IktpdGVHdXkiLCJ1c2VyIjoiJDJhJDEwJDhnWkJIaGZldEJ0TkRtV0FRSElGUk9KSGNXMjF2N0N6MEQ2L2E5TGxvc1RDMk5UOXpPWUl1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgzMzU5NzYwLCJleHAiOjE1ODMzNjMzNjB9.YaszdiimzJi5utAY18gLGbXM7zkPnKp4BmVvUV6rjiw",
    
    "message": "Welcome KiteGuy"
}

## Register Student With the Following:
|register student|POST|/api/auth/register/:id|
[] -lastname
[] -firstname
[] -username
[] -password
[] -email
[] -professor_id <----they need this!

{   
	"lastname":"Singer",
	"firstname":"Aretha",
	"username":"GoldenVoice",
	"password":"password1",
	"email": "sing@email.com",
	"professor_id": 1
}



## Login Student
|login student|POST|/api/auth/login/student|
{
    "username":"GoldenVoice",
    "password":"password1",
    "professor_id": 1
};

Returns a Token - Example:



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

|list student by id|GET|/api/students/:id|
|list student's tasks|GET|/api/students/:id/tasks|
    {
        "id": 2,
        "username":"Student",
        "task":"Task 1"
        "task":Task 2"
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
|add project and deadline to student profile|POST|/api/students/:id/tasks|
    {
	"deadline_id": 2,
	"task":"Task 2",
	"user_id": 2
    }
|add student|POST|/api/student|
|update student|PUT|/api/student/:id|

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