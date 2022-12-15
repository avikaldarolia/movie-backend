const models = require('./models/index')
const c = require('./classes/FriendRequest/Constants')
console.log(models[c.Name]);

for (let key in models[c.Name].rawAttributes) {
    console.log('Field: ', key); // this is name of the field
    console.log('TypeField: ', models[c.Name].rawAttributes[key].type.key); // Sequelize type of field
}
