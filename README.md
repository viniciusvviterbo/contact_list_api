# Contact List API

API which stores people and their contacts. A person can have multiple contacts such as `Phone`, `Email` or `Whatsapp`.

## Setting the project up

### CLI

Clone this repository and execute:

```bash
npm install
npm start
```

### Docker

Run the existing image by executing:

```bash
docker pull viniciusvviterbo/contactlistapi:nodejs
docker run -d --rm -p 8000:8000 --name contactlist_api_nodejs viniciusvviterbo/contactlistapi:nodejs
```

or build your own image by cloning this repository and executing:

```bash
docker build -t viniciusvviterbo/contactlistapi:nodejs .
docker run -d --rm -p 8000:8000 --name contactlist_api_nodejs viniciusvviterbo/contactlistapi:nodejs
```

---

## Usage

### Create Person

```
- Endpoint: /persons

- Request [POST]
{
    "firstName": "John",
    "lastName": "Doe"
}

- Response
{
	"message": "Person created"
}
```

### Edit Person

```
- Endpoint:
/persons/:id

- Request [PUT]
{
    "id": 1
    "firstName": "John",
    "lastName": "Doe"
}

- Response
{
	"message": "Person updated"
}
```

### Get Person

```
- Endpoint:
/persons/:id

- Request [GET]
{ }

- Response
{
    "id": 1,
    "firstName": "John",
    "lastName": "Doe"
}
```

### Get all Persons

```
- Endpoint:
/persons

- Request [GET]
{ }

- Response
[
	{
		"id": 1,
		"firstName": "John",
		"lastName": "Doe"
	},
	{
		"id": 2,
		"firstName": "Jane",
		"lastName": "Doe"
	}
]
```

### Delete Persons

```
- Endpoint:
/persons/:id

- Request [DELETE]
{ }

- Response
{
	"message": "Person deleted"
}
```

### Create Contact

```
- Endpoint: /contacts

- Request [POST]
{
    "personId": 1
    "type": "Phone",
    "value": "333-333-333"
}

- Response
{
	"message": "Contact created"
}
```

### Edit Contact

```
- Endpoint:
/contacts/:id

- Request [PUT]
{
    "id": 1,
    "personId": 1
    "type": "Whatsapp",
    "value": "333-333-333"
}

- Response
{
	"message": "Contact updated"
}
```

### Get Contact

```
- Endpoint:
/contacts/:id

- Request [GET]
{ }

- Response
{
    "id": 1,
    "personId": 1
    "type": "Phone",
    "value": "333-333-333"
}
```

### Get all Contacts

```
- Endpoint:
/contacts

- Request [GET]
{ }

- Response
[
	{
		"id": 1,
        "personId": 1
		"type": "Phone",
		"value": "333-333-333"
	},
	{
		"id": 2,
        "personId": 1
		"type": "Whatsapp",
		"value": "999-999-999"
	},
	{
		"id": 3,
        "personId": 1
		"type": "Email",
		"value": "john@doe"
	},
]
```

### Get all Contacts of a Person

```
- Endpoint:
/persons

- Request [GET]
{ }

- Response
[
	{
		"id": 1,
		"firstName": "John",
		"lastName": "Doe"
	},
	{
		"id": 2,
		"firstName": "Jane",
		"lastName": "Doe"
	}
]
```

### Delete Contacts

```
- Endpoint:
/contacts/:id

- Request [DELETE]
{ }

- Response
{
	"message": "Contact deleted"
}
```

---

**[GNU AGPL v3.0](https://www.gnu.org/licenses/agpl-3.0.html)**
