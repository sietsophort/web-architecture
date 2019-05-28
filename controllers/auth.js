import user from '../services/user';

module.exports = {
  async authenticate(req, res) {
    try {
      const { error, result } = await user.login(req.credentials);
      if (error) {
        return res.status(401).json({ message: 'login failed' });
      }

      return res.status(200).json({
        success: true,
        result,
        code: 200,
        options: null,
        error: null,
      });
    } catch (error) {
      return res.status(401).json({ message: 'errorororrasdfasdf' });
    }
  },
};
