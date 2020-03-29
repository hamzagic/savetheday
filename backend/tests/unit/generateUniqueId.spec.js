const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('generate unique id', () => {
    it('must generate a unique id', () => {
        const id = generateUniqueId();
        expect(id).toHaveLength(16);
    });
});