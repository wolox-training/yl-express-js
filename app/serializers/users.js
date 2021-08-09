exports.userSerializer = user => ({
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email
});

exports.getUsersSerializer = user => ({
  ...exports.userSerializer(user),
  created_at: user.createdAt,
  updated_at: user.updatedAt
});
