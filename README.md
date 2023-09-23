

## Routes

http://localhost:3000/api/
- posts/
    - POST / [create one post]
      -  body
         -  title: string
         -  category: string
         -  tag: string
         -  language: enum[es, en]
         -  color: string, image: string
         -  description: string
         -  read_time: string
         -  author: string
         -  date: date
         -  is_public: boolean
         -  content: string 
    - GET /  [get all posts]
    - GET /search/:title  [find by title]
    - GET /:idOrSlug [find post by id or slug]
    - DELETE /:id [delete one post]
    - PUT /:id [update one post]
      - optional body
         -  title: string
         -  category: string
         -  tag: string
         -  language: enum[es, en]
         -  color: string, image: string
         -  description: string
         -  read_time: string
         -  author: string
         -  date: date
         -  is_public: boolean
         -  content: string 
- users/
    - GET /get-one-user/: [get basic info user]
    - PUT /updated-one-user/:id [update one user by id]
      - optional body
        - firstName: string
        - lastName: string
    - PUT /create-token-password/:email [generate token by email]
    - PUT /user-confirm/:token [update confirm user if validate token]


    
    - GET /get-all-users [list of all users]
    - GET /get-full-one-user/:id [get full user info]
    - DELETE /delete-one-user/:id [delete one user]
    - PUT /update-user-role/:id [change role for admin or public]
      - body
        - role: enum[admin, public]
    - PUT /update-user-blocked/:id [change blocked for true or false]
      - body
        - blocked: boolean

- auth/
    - POST /register [create one user]
      - body
        - firstName: string
        - lastName: string
        - email: string
        - password: string
    - POST /login [login user]
      - body
        - email: string
        - password: string

    