/**
 *
 * @param {*} data
 * @param {*} type
 * @returns HTML string
 */
export default function movement(data, type) {
    // this is coming as a string!
    const m = parseInt(data);
    if (type === 'display') {
      let directionMove = "";
      if (m >= 1) {
        // Position change red, you've dropped places!
        directionMove = "<span class=text-danger>&#9660;</span>";
      } else if (m < 0 ) {
        // Position change green, you've overtaken cars!
        directionMove = "<span class=text-success>&#9650;</span>";
      } else {
        // Position change static, you've maintained track position!
        directionMove = "<span class=text-secondary>&#9655;</span>0";
      }
      return directionMove + ' ' + data;
    }

    return data;
  }