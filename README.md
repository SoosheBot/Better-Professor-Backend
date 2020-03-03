## Better Professor App BE 

- [ ] The BE server link can be accessed here: https://a-better-professor.herokuapp.com/

- [ ] Project Vision: https://www.notion.so/A-Better-Professor-Product-Vision-710c5f2e4cc346df8f6e4c1a81c16bbd

- [ ] Trello Board with Daily Milestones (teams are responsible for maintaining their daily milestones): https://trello.com/b/apD6yvDU/better-professor-app

#######################################################

## DESIGN -- API ENDPOINTS
|feature|method|url|
|:--|:--:|:--|
|register user |POST|/api/auth/register|
|login user |POST|/api/auth/login|
|log out user |GET|/api/auth/logout|

|:--|:--:|:--|
|Professor's Dashboard|
|list students (only professor can view this!)|GET|/api/users|
|list student by id|GET|/api/users/:id|
|list student's tasks (and deadlines)|GET|/api/users/:id/tasks| 
|list student's messages|GET|/api/users/:id/messages|
|add project and deadline to student profile|POST|/api/students/:id/tasks|
|update student|UPDATE|/api/users/:id|
|delete student|DEL|/api/users/:id|
|:--|:--:|:--|
|list tasks (with deadlines)|GET|/api/tasks|
|update project|UPDATE|/api/tasks/:id|
|delete completed project|DEL|/api/tasks/:id|
|:--|:--:|:--|
|send message to self|POST|/api/messages|
|list all user messages|GET|/api/users/:id/messages|
|:--|:--:|:--|
|send message to student|POST|/api/users/:id/messages|
|list a student's messages|GET|/api/users/:id/messages|
|:--|:--:|:--|
|STRETCH|STRETCH|STRETCH|
|add tags to student|POST|/api/students/:id/tags|
|filter lists by: student name, deadlines, tasks, tags|


Note -- A message should include a send date, time, and a long text field that enables the message curator the ability to send a custom message.


##User Registration:
[ ] id (user.id), 
[ ] lastname (user.lastname), 
[ ] firstname (user.firstname), 
[ ] username (user.username),
[ ] email (user.email)

##User Login
[ ] username
[ ] password

##Basic User Workflow: 
register >> login >> view dashboard (professor dashboard) >> logout

##Dashboards
[ ] - Professor Dashboard
    - [ ] - Left column: all student names (/api/users)
    - [ ] - Right column: all upcoming deadlines (/api/deadlines)

[ ] - Student Dashboard
    - [ ] - Tasks (with deadlines and notes) (/api/users/:id)

