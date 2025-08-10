npx sequelize-cli migration:generate --name add-user-details

npx sequelize-cli db:migrate

------------------auth-----------------------------------
register => post => http://localhost:5006/api/auth/register
login => post => http://localhost:5006/api/auth/login
get-user-details => get => http://localhost:5006/api/auth/getUserDetails
