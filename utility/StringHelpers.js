function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

exports.replaceAllParameters = function (sql, parameters) {
  Object.getOwnPropertyNames(parameters).forEach(function (eachParameter, idx) {
    sql = replaceAll(sql, eachParameter, parameters[eachParameter]);
  });
  return sql;
};
