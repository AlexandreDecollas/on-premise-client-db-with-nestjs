# On premise client db
## Description

This project is a demo that shows how to load the client on premise database connection configuration. This allows a piece of code to be client agnostic while writing data on its database.

## Databases context initialization

```bash
$ docker-compose up -d
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
$ yarn run start
```

## Testing the app

You can run a curl with the client id in the header : 

For client 1 :
```bash
curl -X GET "http://localhost:3000/products/all" -H "Content-Type: application/json" -H "client-id: client1"
```

For client 2 :
```bash
curl -X GET "http://localhost:3000/products/all" -H "Content-Type: application/json" -H "client-id: client2"
```

The response contains the client 1 products or client 2 product, depending on the given id.

## What happened
1. The `MainDbConnectionModule` will get the configuration for local project db, containing the clients confs.
2. The `ClientDbConnectionModule` is set to behave on the request scope. That means that the factory that will get the connection will be run each time a request will need it. It extract the header `client-id` of the request. 
3. Based on that value, it get the client db connection on local database given by the `MainDbConnectionModule`.
4. It returns a valid connection to the right client in the injectable `DataSource` with token `ON_PREMISE_DB_CONNECTION`.
5. The `ProductController` can now run a sql command, run on the correct db.
Up to you to adapt to your specific context.

## Stay in touch

- Author - [Alexandre Decollas](https://alexandredecollas.com)

## License

This demo is [MIT licensed](LICENSE).
