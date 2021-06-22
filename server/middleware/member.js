const Kambam = require('../models/Kambam');

module.exports = async function (req, res, next) {
  const kambam = await Kambam.findById(req.header('kambamId'));

  if (!kambam) {
    return res.status(404).json({ msg: 'Kanbam não encontrado' });
  }

  const members = kambam.members.map((member) => member.user);

  if (members.includes(req.user.id)) {
    next();
  } else {
    res.status(401).json({
      msg: 'Você deve ser membro deste kanbam para fazer alterações'
    });
  }
};