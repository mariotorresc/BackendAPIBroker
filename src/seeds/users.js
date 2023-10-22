module.exports = {
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),

  up: async (queryInterface, Sequelize) => {
    const usersArray = [];
    // Users  For web testing
    usersArray.push({
      createdAt: new Date(),
      email: 'sasanmartin6@uc.cl',
      lastName: 'San Martín',
      name: 'Sebastían',
      password: 'ANotSoSecurePassword',
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('users', usersArray);
  },
};
