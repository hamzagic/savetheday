const express = require('express');
const OngController = require('./controllers/OngController');
const CaseController = require('./controllers/CaseController');
const { Segments, Joi, celebrate } = require('celebrate');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.json({ message: "Hello There!"});
})

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().pattern(new RegExp('^[0-9]{11}$')).required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);

routes.put('/ongs', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().pattern(new RegExp('^[0-9]{11}$')).required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.update);

routes.get('/ong', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), OngController.getOng);

routes.post('/cases', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}), CaseController.create);

routes.get('/cases', CaseController.index);

routes.get('/cases-ongs', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), CaseController.listCasesByOng);

routes.get('/case/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), CaseController.getCase);

routes.delete('/cases/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), CaseController.delete);

module.exports = routes;