const generateUuid = async () => {
    const { nanoid } = await import('nanoid');
    return nanoid();
};

module.exports = generateUuid;
