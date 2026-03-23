# CPAN-212-Assignment-3-4

Team: Abdulhamid Weheliye (n01756626, Section A), Mbaye Fall (n01764121, Section A), Cheyenne Hunsley (N01747035, Section A), Bandanpreet Kaur Malhi (n01726650, Section A), Laura Sofia Santana Acosta (N01737339,Section B)

## System Architecture





## Authentication Workflow

The authentication workflow in our application:
1) User submits login credentials through the Angular frontend.
2) The backend validates the submitted credentials
3) Submitted password is compared against the stored password hash.
4) A session is created if authentication succeeds.
5) Session is sent to browser using a cookie.

## Authorization Implementation:

Our application has two main authorization methods in our authorization middleware.

One for project endpoints and one for artifact endpoints

Project authorization workflow:
1) a PUT or DELETE request is sent to backend through Angular frontend
2) project authoriziation middleware validates request
3) authorization middleware than compares the project's ownerId to the session userId
4) if authorization is successful, the requested project is then attached to the request and sent to the appropirate method in the project controller.
    - If authorization fails, an error response is sent.

Artifact authorization workflow:
1) a PUT or DELETE request is sent to backend through Angular frontend
2) artifact authoriziation middleware validates request
3) authorization middleware than compares the artifact's ownerId to the session userId
4) if authorization is successful, the requested artifact is then attached to the request and sent to the appropirate method in the artifact controller.
    - If authorization fails, an error response is sent.

## Session and Cookie handling:

### Login:
When a user logs in, a session cookie is created with a minimal user profile.

### Logout:
When a user logs out, the session is destroyed and the server tells the browser to clear the cookie using the res.clearCookie() method.

The session cookie is used for user authentication when attempting to access protected endpoints. It is also used in the authorization middleware to compare the session userId to the ownerId of a given project or artifact.
