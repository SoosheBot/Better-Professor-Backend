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
|Professor's Dashboard Endpoints|
|get a professor's students|GET|/api/user/:id/students|
|get a professor's students (nested under the professor -- looks a bit cleaner, yields the same result as the other GET)|GET|/api/users/all-students/:id|
|get professor's messages|GET|/api/users/:id/messages|
|add student|POST|api/users/:id/students|
|update professor|PUT|/api/users/:id|
|delete professor|DEL|/api/users/:id|


##STUDENTS Dashboard Endpoints
|get student by id|GET|/api/students/:id|
|get student's tasks|GET|/api/students/:id/tasks|
|get student's messages|GET|/api/students/:id/messages|
|update student|PUT|/api/students/:id|
|delete student|DEL|/api/students/:id|

##TASKS Endpoints
|get tasks|GET|/api/tasks|
|get tasks by id|GET|/api/tasks/:id|
|update tasks|PUT|/api/tasks/:id|
|delete tasks|GET|/api/tasks/:id|