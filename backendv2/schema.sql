CREATE DATABASE test_db;
CREATE DATABASE dev_db;
CREATE DATABASE prod_db;

CREATE USER testuser with encrypted password 'test';

GRANT ALL PRIVILEGES on database test_db TO testuser;
GRANT ALL PRIVILEGES on database dev_db TO testuser;
GRANT ALL PRIVILEGES on database prod_db TO testuser;
