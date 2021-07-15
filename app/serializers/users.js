exports.userSerializer = user => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email
});
