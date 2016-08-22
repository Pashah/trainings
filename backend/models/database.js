var pg = require('pg');
var connectionString = 'postgres://postgres:root@localhost:5432/cfapp';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(80) not null)');
query.on('end', function() { client.end(); });

client.connect();
var query = client.query('CREATE TABLE trainings(id SERIAL PRIMARY KEY, name VARCHAR(80) not null, created_by integer not null, category integer not null, created timestamp DEFAULT current_timestamp, modified timestamp DEFAULT current_timestamp)');
query.on('end', function() { client.end(); });

client.connect();
var query = client.query('CREATE TABLE categories(id SERIAL PRIMARY KEY, name character(80) NOT NULL, description character(512), created_by integer NOT NULL, created timestamp without time zone DEFAULT current_timestamp, modified timestamp without time zone DEFAULT current_timestamp)');
query.on('end', function() { client.end();});

client.connect();
var query = client.query('CREATE TABLE moves(id SERIAL PRIMARY KEY, name character(80) NOT NULL, description character(512), created_by integer NOT NULL, created timestamp without time zone DEFAULT current_timestamp, modified timestamp without time zone DEFAULT current_timestamp)');
query.on('end', function() { client.end();});
