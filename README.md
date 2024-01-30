# Test Project Node with Express

This project is an API server for another frontend project that is built with ReactJS.

## Create Database (Postgres)

### Clients

| Column    | Type     | Description                 |
| :-------- | :------- | :-------------------------  |
| `id`      | `uuid`   | **Not Null**. Autoincrement |
| `name`    | `varchar`| **Not Null**.               |
| `email`   | `varchar`| **Not Null**.               |
| `phone`   | `integer`| **Not Null**.               |
| `coord_x` | `float4` | **Not Null**.               |
| `coord_y` | `float4` | **Not Null**.               |

## Run Locally

Clone the project

```bash
  git clone https://github.com/leoholiveira/Test-Node
```

Go to the project directory

```bash
  cd Test-Node
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js
```

## Tech Stack

**Client:** React

**Server:** Node, Express

**Database:** Postgres