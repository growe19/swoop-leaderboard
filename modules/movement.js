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
        directionMove = "<span class=text-success><i class='fa-solid fa-chevron-up'></i></span>";
      } else if (m < 0 ) {
        // Position change green, you've overtaken cars!
        directionMove = "<span class=text-danger><i class='fa-solid fa-chevron-down'></i></span>";
      } else {
        // Position change static, you've maintained track position!
        directionMove = "<span class=text-secondary><i class='fa-solid fa-minus'></i></span> 0";
      }
      return directionMove + ' ' + data;
    }

    return data;
  }
