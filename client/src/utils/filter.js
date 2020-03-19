/**
 * @Description: 格式化的
 * @author yidierh
 * @email yidierh@gmail.com
 * @date 2020-02-29
 */

/**
 * 格式化日期
 * @param date
 * @returns {string}
 */
export const formatDate = (date) => {
    const _date = date ? new Date(date) : new Date()
    const y = _date.getFullYear()
    const m = _date.getMonth() + 1
    const d = _date.getDate()
    return `${y}/${m > 10 ? m : '0' + m}/${d > 10 ? d : '0' + d}`
}

/**
 * 数字格式化
 * @param number 要格式化的数字
 * @param decimals 保留几位小数
 * @param dec_point 小数点符号
 * @param thousands_sep 千分位符号
 */
export const formatNumber = (number, decimals, dec_point, thousands_sep) => {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      let k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  let re = /(-?\d+)(\d{3})/;
  while(re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

/**
 * 数字格式化取消
 * @param e
 * @return {number}
 */
export const removeFormatNumber = (e) => {
    return parseFloat(e.replace(/[^\d\.-]/g, ""));
}
