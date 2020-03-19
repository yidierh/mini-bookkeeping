/**
 * @author yidier
 * @date 2020-03-18
 * @email yidierh@gmail.com
 */

/**
 * 获取当月第一天和最后天
 * @param  month 1 - 12
 * @return {{second_day: Date, last_day: Date, first_day: Date}}
 */
export const monthFirstAndLast = (month) => {

  const date = new Date()
  const y = date.getFullYear()

  return {
    first_day: new Date(y, month - 1, 1),
    second_day: new Date(y, month - 2, 2),
    last_day: new Date(y, month, 0)
  }
}
