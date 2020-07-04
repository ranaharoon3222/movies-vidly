import _ from 'lodash';

export function Paginate(items, page, rowPerPage) {
  return _(items)
    .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
    .value();
}
