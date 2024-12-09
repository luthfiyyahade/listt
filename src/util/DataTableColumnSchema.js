export default (x, override = {}) => {
  let baseSchema = {
    data: x.key,
    name: x.key + "Label",
    searchable: true,
    orderable: true,
    search: {
      value: "",
      regex: false,
    },
  };
  const newResult = { ...baseSchema, ...override };
  return newResult;
};
