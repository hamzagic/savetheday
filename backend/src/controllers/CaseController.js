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
            return res.json({ 'id': id, 'ong_id': ong_id });
        } else {
            return res.json({'message': 'No ONGs found'});
        }
    },
    // all cases to display in the app
    async index(req, res) {
        const cases = await connection('cases')
        .join('ongs', {'ongs.id': 'ong_id'})
        .select('cases.id','name', 'email', 'whatsapp', 'city', 'uf', 'title', 'description', 'value');
        return res.json({'data': cases});
    },

    async listCasesByOng(req, res) {
        const ong_id = req.headers.authorization;
        if(!ong_id) {
            return res.json({'error': 'ONG key not sent'});
        } else {
            const [id] = await connection('ongs')
            .select('id')
            .where('id', ong_id);
            if(!id) {
                return res.json({'error': 'No ONGs found'});
            } else {
                const cases = await connection('cases')
                .join('ongs', 'ongs.id', '=', 'ong_id')
                .where('ong_id', ong_id)
                .select('title', 'description', 'value', 'name', 'email', 'whatsapp', 'city', 'uf');
                return res.json({'data': cases});
            }
        }
    },
    async getCase(req, res) {
        const { id } = req.params;
        if(!id) {
            return res.json({'error': 'Invalid param'});
        }
        const ong = await connection('cases')
        .join('ongs', 'ongs.id', '=', 'cases.ong_id')
        .where('cases.id', id)
        .select('cases.id', 'title', 'description', 'value', 'name', 'email', 'whatsapp', 'city', 'uf')
        .first()
        if(ong) {
            return res.json({'data': ong});
        } else {
            return res.json({'error': 'No cases found'});
        }
    },
    // todo: soft delete of cases
    async delete(req, res) {
        const ong_id = req.headers.authorization;
        const { id } = req.params;
        if(!ong_id) {
            return res.json({'error': 'Invalid identification'});
        } else {
            const cases = await connection('cases')
            .where('id', id)
            .select('ong_id', 'id')
            .first();
            if(cases) {
               // return res.json({'message': cases.ong_id});
                if(cases.ong_id != ong_id) {
                    return res.status(401).json({error: 'Not authorized'});
                } else {
                    await connection('cases')
                    .where('id', cases.id)
                    .delete();
                    return res.status(204).send();
                }
            } else {
                return res.json({'error': 'Case not found'});
            }
        }
    }
}