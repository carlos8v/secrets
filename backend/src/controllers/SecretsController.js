const db = require('../database/connection');
const max_per_page = 5;

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const secrets = await db.select().table('secrets')
      .orderBy('created_at', 'desc')
      .paginate({ perPage: max_per_page, currentPage: parseInt(page), isLengthAware: true });
    return res.status(200).json(secrets);
  },
  async count(req, res) {
    const secrets = await db.select().table('secrets')
      .paginate({ perPage: max_per_page, currentPage: 1, isLengthAware: true });
    return res.json(secrets.pagination);
  },
  async find(req, res) {
    const { id } = req.params;
    
    const [ secret ] = await db('secrets').where({ id }).select();

    return res.status(200).json(secret);
  },
  async create(req, res) {
    const { name, secret } = req.body;

    const trx = await db.transaction();

    try {
      await trx('secrets').insert({
        name,
        secret,
      });

      await trx.commit();

      const [ createdSecret ] = await db.select().table('secrets').orderBy('created_at', 'desc');

      return res.status(201).json(createdSecret);
    } catch (e) {
      trx.rollback();
      res.status(400).json({
        error: 'Unexpected error while creating new secret',
      });
    }
  },
  async destroy(req, res) {
    const { access_key } = req.headers;
    if (access_key !== process.env.SECRET_KEY) {
      return res.status(401).json({
        error: 'User does not have permition for this request'
      });
    }

    const { id } = req.params;
    const trx = await db.transaction();

    try {
      await trx('secrets').where({ id }).del();

      await trx.commit();

      return res.status(200).send();

    } catch (error) {
      trx.rollback();
      res.status(400).json({
        error: 'Unexpected error while deleting secret',
      });
    }
  }
};
