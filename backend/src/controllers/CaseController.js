const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const ong_id = req.headers.authorization;
        const { title, description, value } = req.body;
        const ong = await connection('ongs').where('id', ong_id).first();
        if(ong) {
            const [id] = await connection('cases').insert({
                title,
                description,
                value,
                ong_id: ong.id
            });
            return res.json({ 'id': id, 'ong_od': ong_id });
        } else {
            return res.json({'message': 'No ONGs found'});
        }
    },
    // all cases to display in the app
    async index(req, res) {
        const cases = await connection('cases')
        .join('ongs', {'ongs.id': 'ong_id'})
        .select('name', 'email', 'whatsapp', 'city', 'uf', 'title', 'description', 'value');
        return res.json(cases);
    },

    async listCasesByOng(req, res) {
        const ong_id = req.headers.authorization;
        if(!ong_id) {
            return res.json({'message': 'ONG key not sent'});
        } else {
            const [id] = await connection('ongs')
            .select('id')
            .where('id', ong_id);
            if(!id) {
                return res.json({'message': 'No ONGs found'});
            } else {
                const cases = await connection('cases')
                .join('ongs', 'ongs.id', '=', 'ong_id')
                .where('ong_id', ong_id)
                .select('title', 'description', 'value', 'name', 'email', 'whatsapp', 'city', 'uf');
                return res.json(cases);
            }
        }
    },
    async getCase(req, res) {
        const { id } = req.params;
        if(!id) {
            return res.json({'message': 'Invalid param'});
        }
        const ong = await connection('cases')
        .join('ongs', 'ongs.id', '=', 'cases.ong_id')
        .where('cases.id', id)
        .select('cases.id', 'title', 'description', 'value', 'name', 'email', 'whatsapp', 'city', 'uf')
        .first()
        
        return res.json(ong);
    }
}