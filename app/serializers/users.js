exports.userSerializer = user => ({
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email
});
