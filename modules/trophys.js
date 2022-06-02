export default function render_trophy(data, type, row) {
  let t = '';
  if (type === 'display') {
    switch (data) {
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