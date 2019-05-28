import user from '../services/user';

module.exports = {
  async authenticate(req, res) {
    try {
      const { error, result } = await user.authenticate(req.body);
      console.log('erroor: '.error);

      if (error) {
        return res.status(401).json({ success: true,
          result,
          code: 401,
          options: null,
          error,
          message: 'login failed' });
      }

      return res.status(200).json({
        success: true,
        result,
        code: 200,
        options: null,
        error: null,
      });
    } catch (error) {
      return res.status(401).json({ message: 'ot deng error ey der', error });
    }
  },
};
