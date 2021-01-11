const pool = require('./pool')


pool.on('connect', () => {
    console.log('connected to the db');
})

const createUserTable = () => {
  const createUserQuery = `CREATE TABLE IF NOT EXISTS users
  (user_id VARCHAR(100) PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100), 
  last_name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_on DATE NOT NULL)`;

  pool.query(createUserQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createClosetTable = () => {
    const createClosetQuery = `CREATE TABLE IF NOT EXISTS closets
    (closet_id VARCHAR(100) UNIQUE PRIMARY KEY, 
    user_id VARCHAR(100) NOT NULL,
    name VARCHAR(500) NOT NULL, 
    created_on DATE NOT NULL,
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id))`;

    pool.query(createClosetQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createClothTable = () => {
  const createClothQuery = `CREATE TABLE IF NOT EXISTS cloths
    (cloth_id VARCHAR(100) UNIQUE PRIMARY KEY,
    closet_id VARCHAR(100) NOT NULL,
    name VARCHAR(500) NULL,
    cloth_type VARCHAR(200) NULL,
    color VARCHAR(200) NULL,
    created_on DATE NOT NULL,
    CONSTRAINT fk_closets
      FOREIGN KEY(closet_id) 
	  REFERENCES closets(closet_id))`;

  pool.query(createClothQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop User Table
 */
const dropUserTable = () => {
  const usersDropQuery = 'DROP TABLE IF EXISTS users CASCADE';
  pool.query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop Bus Table
 */
const dropClosetTable = () => {
  const closetDropQuery = 'DROP TABLE IF EXISTS closets CASCADE';
  pool.query(closetDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Trip Table
 */
const dropClothTable = () => {
  const clothDropQuery = 'DROP TABLE IF EXISTS cloth CASCADE';
  pool.query(clothDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};



/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createClosetTable();
  createClothTable();
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropClothTable();
  dropClosetTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createAllTables,
  dropAllTables,
};

require('make-runnable');