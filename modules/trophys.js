export default function render_trophy(data, type, row) {
    if (type === 'display') {
      if (data === 1) {
        return '1 <i class="fa-solid fa-trophy text-gold"></i>';
      }	else if (data === 2) {
        return '2 <i class="fa-solid fa-trophy text-silver"></i>';
      }	else if (data === 3) {
        return '3 <i class="fa-solid fa-trophy text-bronze"></i>';
      }	else {
        return data;
      }
    }

    return data;
  }