const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
        const id = generateUniqueId();
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
        return res.json({ id })
    },
    //to be displayed in the app only
    async index(req, res) {
        const ongs = await connection.select('id','name', 'email', 'whatsapp', 'city', 'uf').from('ongs');
        return res.json({'data': ongs});
    },

    async update(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
        const ong_id = req.headers.authorization;
        const ong = await connection('ongs')
        .where('id', ong_id)
        .select('id') 
        .first(); 
        if(!ong) {
            return res.json({'error': 'No ONGs found'});
        } else {
            await connection('ongs')
            .where('id', ong.id)
            .update({
                name,
                email,
                whatsapp,
                city,
                uf
            });
            return res.json({ 'message': 'Updated successfully' });
        }
    },

    async getOng(req, res) {
        const ong_id = req.headers.authorization;
        const ong = await connection('ongs')
        .where('id', ong_id)
        .select('name', 'email', 'whatsapp', 'city', 'uf')
        .first();
        if(!ong) {
            return res.json({'error': 'No ONGs found'}); 
        } else {
            return res.json({ 'data': ong });
        }
    }
}