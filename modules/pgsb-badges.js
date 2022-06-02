/**
 * create a Platinum, Gold, Silver or Bronze badge
 * @param {*} data
 * @param {*} type
 * @param {*} row
 * @returns {string} HTML
 */
export default function pgsbBadge(data, type, row) {
    let b = '';
    switch (data) {
        case 'PLATIN':
            b = 'text-silver badge-silver';
            break;
        case 'GOLD':
            b = 'text-gold badge-gold';
            break;
        case 'SILVER':
            b = 'text-silver badge-silver';
            break;
        case 'BRONZE':
            b = 'text-bronze badge-bronze';
            break;
        default:
            b = 'text-white badge-red';
            data = 'UC';
    }

    return `<span class="badge badge-outline ${b}">${data}</span>`;
}