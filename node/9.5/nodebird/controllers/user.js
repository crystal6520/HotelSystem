const User = require('../models/user');

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) { // req.user.id가 followerId, req.params.id가 followingId
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.unfollow = async (req, res, next) => {
  try {
    const userToUnfollow = await User.findOne({ where: { id: req.params.id } });

    if (!userToUnfollow) {
      res.status(404).send('언팔로잉 불가능');
      return;
    }
    await req.user.removeFollowing(req.params.id);

    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
    // 현재 로그인한 사용자를 찾습니다.
    const user = await User.findByPk(req.params.id);

    // 사용자가 존재하면 닉네임을 업데이트합니다.
    if (user) {
      await user.update({
        nick: req.body.nick,
      });

      res.send('success');
    } else {
      res.status(404).send('사용자를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
