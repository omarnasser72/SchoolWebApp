# School Web App
This is a backend API for school web application.
I built it using MVC design pattern.

<h1><bold>Stack</bold></h1>
<p>☑️ MongoDB</p>
<p>☑️ Express</p>
<p>☑️ Nodejs</p><p>☑️ ESM Javascript</p>
<p>☑️ Bycrbt</p><p>☑️ nodemailer</p><p>☑️ jwt</p>

<h1><bold>Features</bold></h1>
<p>✅ authentication system for user using jwt auth</p>
<p>✅ authorization system for superAdmin, schoolAdmin using middlewares</p><p>✅ Any User able to update his own profile info, User can change his password </p><p>✅ User, Classroom, School and Student CRUD operations</p>
<p>✅ Validation system for all routes with proper messages for each invalid request</p>
<p>✅ Exception handling</p>

<h2>Models</h2>
<p>We have 4 models: User, Student, Classroom and School</p>
<h3>User model </h3>
<p>describes user's information represented in username, password, role and schoolId(if the role is schoolAdmin) </p>

<h3>Student model </h3>
<p>describes student's information represented in name, classroomId and schoolId </p>

<h3>Classroom model </h3>
<p>describes classroom's information represented in name, gradeYear and schoolId </p>

<h3>School model </h3>
<p>describes school's information represented in name </p>

<h2>Contollers</h2>
<h3>Authentication Controller</h3>
<p>We have here 2 apis: signup and login</p>
<p><strong>signup</strong>this api is for user's registration (schoolAdmin or superAdmin)</p>
<p><strong>signup</strong>this api is for user login (schoolAdmin or superAdmin)</p>

<h3>User Controller</h3>
<p>We have here 3 apis : updateUser, deleteUser and getUser</p><p><strong>updateUser</strong>this api is for user update either his own account or other users' accounts if he has the required authority</p>

<p><strong>deleteUser</strong>this api is for user deletion either his own account or other users' accounts if he has the required authority</p>

<p><strong>getUser</strong>this api is for getting user using id or all users if he has the required authority</p>

<h3>Student Controller</h3>
<p>We have here 3 apis : createStudent, updateStudent, deleteStudent and getStudents</p><p><strong>createStudent</strong>this api is for student creation ,it's required that the logged user is schoolAdmin</p>

<p><strong>updateStudent</strong>this api is for student's update ,it's required that the logged user is schoolAdmin</p>


<p><strong>deleteStudent</strong>this api is for student's deletion ,it's required that the logged user is schoolAdmin</p>

<p><strong>getStudents</strong>this api is for getting student using id or all users, it's required that the logged user is schoolAdmin</p>

<h3>Classroom Controller</h3>
<p>We have here 3 apis : createClassroom, updateClassroom, deleteClassroom and getClassroom</p><p><strong>createClassroom</strong>this api is for classroom creation ,it's required that the logged user is schoolAdmin</p>

<p><strong>updateClassroom</strong>this api is for classroom's update ,it's required that the logged user is schoolAdmin</p>


<p><strong>deleteClassroom</strong>this api is for classroom's deletion ,it's required that the logged user is schoolAdmin</p>

<p><strong>getClassroom</strong>this api is for getting classroom using id or all classroom, it's required school that the logged user is schoolAdmin</p>

<h3>School Controller</h3>
<p>We have here 3 apis : createSchool, updateSchool, deleteSchool and getSchool</p><p><strong>createSchool</strong>this api is for school creation ,it's required that the logged user is superAdmin</p>

<p><strong>updateSchool</strong>this api is for school's update ,it's required that the logged user is superAdmin</p>


<p><strong>deleteSchool</strong>this api is for school's deletion ,it's required that the logged user is superAdmin</p>

<p><strong>getSchool</strong>this api is for getting school using id or all users, it's required that the logged user is superAdmin</p>

<h2>Utils</h2>
<h4>error.js</h4>
<p>exports createError function creates new object of Error and sets status and message properties with the calling ones and return the error</p>
<h4>jwt.js</h4>
<h6>createToken</h6>
<p>this function is called once user logged successfully, it create accessToken to be verified with.</p>
<h6>verifyUser</h6>
<p>this middleware is for user verification, it check if there is accessToken in the cookies, if not it call createError function with status response 401 and invalid token message</p> 
<h6>verifyUserOwnAccount</h6>
<p>This middleware checks if the current logged user is managing his own account it matches the id in params with decoded one in the accessToken in cookies.</p>
<h6>verifySuperAdmin</h6>
<p>This middleware checks if the current logged user is superAdmin, if not it call createError function with status response 403 and unauthorized superAdmin message .</p>
<h6>verifySchoolAdmin</h6>
<p>This middleware checks if the current logged user is schoolAdmin, if not it call createError function with status response 403 and invalid schoolAdmin message and checks if the schoolAdmin is managing classrooms or students related only to his school, if not it call createError function with status response 403 and unauthorized schoolAdmin message.</p>

<h7><br/><br/>That was a brief description you can look at the api documentation to see the full description for routes and each api call
<a href="https://documenter.getpostman.com/view/26571473/2sA2xb7Fh2">API documentation</a>
</h7>

<h7>You can view the whole Collection here.
<a href="./School Managment APIs (Deployed).postman_collection.json">Collection</a>
</h7>
