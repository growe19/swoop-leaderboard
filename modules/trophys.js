/**
 *
 * @param {*} data
 * @param {*} type
 * @param {*} row
 * @returns {string} HTML
 */
export default function render_trophy(data, type, row) {
  let t = '';
  // only show if we have data and trophies only for place 1-3
  if (!data || data > 3) {
    return '';
  }

  if (type === 'display') {
    switch (parseInt(data)) {
      case 1:
        t = 'text-gold';
        break;
      case 2:
        t = 'text-silver';
        break;
      case 3:
        t = 'text-bronze';
        break;
      default:

    }
    return `${data}&nbsp;<i class="fa-solid fa-trophy ${t}"></i>`;
  } else {
    return data;
  }
}