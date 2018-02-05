# Database_Ass_1

# An extremely simple db...
### Documentation
Two files are used for this system. One to keep a record of all DB-entries. The other is used to instantiate a hashmap, to keep track of the DB-entries byte-offset.
Don't search for keys that doesn't exist.

#### How-to

1. Clone the repository
2. All commands must be run from the project root

#### Commands

To write a new DB entry:

```> node app key value```

For example: 

```> node app 669 "Kristian er elendig til foos"```

To read a DB entry:

```> node app read 669```

This will console.log the value of the key.

