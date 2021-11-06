## CIQL Documentation for begining

### Prerequises
- [Nodejs](https://nodejs.org/)

### Databases supported
- [PostreSQL](https://www.postgresql.org)
- [MariaDB](https://mariadb.org)
- [Mysql](https://www.mysql.com/)

### Documentation
- [Sequelize](https://sequelize.org/master/) For making good schema
- [Swagger](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject) For making good api's documentation
- [Frisby](https://docs.frisbyjs.com/) For making Api test


### For Begining
1. Type **ciql db connect** for connecting to existing db
2. Define your db schema in schema.js (with sequelize model)
3. Type **ciql code update** to update API structure following your model in schema file
4. Type **node index** to run project
5. Type **ciql** for more options