const validateId = (req) => {
  const { id } = req.params;
  if (!/^[a-z0-9:.@_-]{1,256}$/i.test(id)) {
    return error(400, 'Invalid Counter ID');
  }
};

export { validateId };
