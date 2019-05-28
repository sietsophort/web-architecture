const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

async function authenticate({ username, password }) {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // eslint-disable-next-line
    const { password, ...result } = user;
    return { result };
  }
  const error = {
    message: 'Authentication failed',
  };

  return { error };
}

async function getAll() {
  return users.map((u) => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}

export default {
  authenticate,
  getAll,
};
