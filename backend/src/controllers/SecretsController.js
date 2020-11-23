const db = require('../database/connection');
const secret_key = 'example_secret_key';

module.exports = {
  async index(req, res) {
    const secrets = await db.select().table('secrets').orderBy('created_at', 'desc');
    return res.json(secrets);
  },
  async count(req, res) {
    const secrets = await db.select().table('secrets');
    return res.json({ total : secrets.length });
  },
  async find(req, res) {
    const { id } = req.params;
    
    const [ secret ] = await db('secrets').where({ id }).select();

    return res.json(secret);
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

      return res.status(201).send();
    } catch (e) {
      trx.rollback();
      res.status(400).json({
        error: 'Unexpected error while creating new secret',
      });
    }
  },
  async destroy(req, res) {
    const { access_key } = req.headers;
    if (access_key !== secret_key) {
      return res.status(405).json({
        error: 'User do not have permition for this request'
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
