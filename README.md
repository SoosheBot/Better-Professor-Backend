## Better Professor App BE 

[ ] The BE server link can be accessed here: https://be-better-professor.herokuapp.com/

[ ] Project Vision: https://www.notion.so/A-Better-Professor-Product-Vision-710c5f2e4cc346df8f6e4c1a81c16bbd

[ ] Trello Board with Daily Milestones (teams are responsible for maintaining their daily milestones): https://trello.com/b/apD6yvDU/better-professor-app

                    ##########

## DESIGN -- API ENDPOINTS
|feature|method|url|
|:--|:--:|:--|
|register user (professor)|POST|/api/auth/register|
|login user (professor)|POST|/api/auth/login|
|log out user (professor)|GET|/api/auth/logout|
|:--|:--:|:--|
|list students (this is the professor's dashboard!)|GET|/api/students|
|list student by id|GET|/api/students/:id|
|list student's projects (and deadlines)|GET|/api/students/:id/projects| 
|list student's messages|GET|/api/students/:id/messages|
|add student|POST|/api/students|
|add project and deadline to student profile|POST|/api/students/:id/projects|
|update student|UPDATE|/api/students/:id|
|delete student|DEL|/api/students/:id|
|:--|:--:|:--|
|list projects (with deadlines)|GET|/api/projects|
|update project|UPDATE|/api/projects/:id|
|delete completed project|DEL|/api/projects/:id|
|:--|:--:|:--|
|send message to user|POST|/api/messages|
|send message to student|POST|/api/students/:id/messages|
|list all user messages|GET|/api/users/:id/messages|
|list a student's messages|GET|/api/students/:id/messages|
|:--|:--:|:--|
|STRETCH|STRETCH|STRETCH|
|add tags to student|POST|/api/students/:id/tags|
|filter lists by: student name, deadlines, projects, tags|


Note -- A message should include a send date, time, and a long text field that enables the message curator the ability to send a custom message.

Additional design notes:

##User (Professor) Profile
--register
--login
--logout
--dashboard (list of students)

##Student Profile
--id
--last name
--first name
--projects, (with project deadlines)
--messages