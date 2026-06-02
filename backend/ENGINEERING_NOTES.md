whiteList :- allways whitelist your database during production
MongoDB password :- bro never use @ inside inside in your MongoDB password because it will give you a error but if you uses @  in password then in you env use %40 insted of @
## WORKSPACE
WORKSPACE ==> flow ----Request/create-workspace ---> (verifyJWT)/as-middleware-provide-_ID --> controller create workspace for user like name, owner, member, role as a member etc.
Goal Get My Workspaces ==> When User logs in: Show all the worksapce --> Find all workspaces where current user exists in members[].
this will be our api point -> frontend also needs: Click workspace → open workspace dashboard     (/api/workspace/68383hdhd)   so controller have (Step 1 Check JWT.) (Step 2 Find workspace by ID.)(Step 3 Check: Does current user belong to this workspace?)  Step 4 Return workspace data.
Update a workspace by ID ---> check vaild --> owner -> then able to update.
Invite by token--> create token send to user by mail --> save token in workspace
join by token one email --> on click -> token find workspace --> user push inside member as a user
Asign the role --> i have send in params -workspaceId -userId -role --> find the workspace by workspaceId --> check user exist --> then asing the role to user. but remmber when saving use await workspace.save() not memmber.save(); 
## project 
create --> model 
create project endpoint 
and all the CRUD opration
## Task 
create task endpoint 
and all the CRUD opration
access vaildation
right now i am using projectId and taskId as a param for vaildation
## Comment 
like a chat and all the CRUD opration
## Activity log 
User Creates Task -> Task Saved -> Activity Saved -> User Fetches Activities -> Activity Returned
* At Task 
-created task
-updated task
-deleted task
-changed status
-assigned task
* At Comment
-added comment
-updated comment
-deleted comment