import DataTableColumnSchema from "./DataTableColumnSchema";

import { tablePageSize } from "./config";

export default (columnsrc, replacer = {}) => {
  const currentPage = replacer.currentPage ? replacer.currentPage : 1;

  const mappedColumns = columnsrc
    .map((x) => DataTableColumnSchema(x))
    .filter((y) => !!y.data);

  let schema = {
    draw: 1,
    currentPage: currentPage,
    columns: mappedColumns,
    order: [
      {
        column: 0,
        dir: "asc",
      },
    ],
    start: 0,
    length: tablePageSize,
    search: {
      value: "",
      regex: false,
    },
  };

  schema = {
    ...schema,
    ...replacer,
    start: tablePageSize * (currentPage - 1),
  };

  // console.log('SCHEMA', JSON.stringify(schema))
  return schema;
};
