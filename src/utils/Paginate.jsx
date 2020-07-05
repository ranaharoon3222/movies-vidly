import _ from 'lodash';

export const Paginate = (items, page, rowPerPage) => {
  return _(items)
    .slice(page * rowPerPage, page * rowPerPage + rowPerPage) // 1 * 5 , 1 * 5 + 5 =  5, 10
    .value();

  // return items.slice(page * rowPerPage, page * rowPerPage + rowPerPage);
};
