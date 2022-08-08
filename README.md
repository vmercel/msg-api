# BRIEFING

This repository contains an express app with CRUD operations and their corresponding integration tests.
Tests are implemented using jest and supertest and the API is documented using swagger.

clone this repository:

```
git clone https://github.com/vmeercel/msg-api.git
```

install all require dependencies:

```
$npm install
```

start the server:

```
$npm start
```

run tests:

```
$npm test
```

Generate API documentation:

```
$npm start-gendoc
```

when server is started, messages are accessible at

```
http://localhost:3000/messages
```

To fetch messages by owner name

```
http://localhost:3000/messages/owner/<name>
```

# ADDITIONAL INFO

message schema has the form:

```
{
id: string,
subject: string,
content: string,
isRead: boolean
owner: string
}
```

flag switching when message is read can be implemented by simple call of the update enpoint
