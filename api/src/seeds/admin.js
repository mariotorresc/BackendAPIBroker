module.exports = {
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),

  up: async (queryInterface, Sequelize) => {
    const usersArray = [];
    // Users Admin
    usersArray.push({
      admin: true,
      createdAt: new Date(),
      email: 'sasanmartinadmin@uc.cl',
      lastName: 'San Martín',
      name: 'Sebastían',
      password: 'hola1234',
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('users', usersArray);
  },
};
