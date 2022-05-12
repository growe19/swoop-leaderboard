export default function driverCategory(data, type, row) {
    if (data === 0) {
        return '<span class="badge text-bronze badge-outline badge-bronze">BRONZE</span>';
    } else if (data === 1) {
        return '<span class="badge text-silver badge-outline badge-silver">SILVER</span>';
    } else if (data === 2) {
        return '<span class="badge text-gold badge-outline badge-gold">GOLD</span>';
    } else if (data === 3) {
        return '<span class="badge text-platinum badge-outline badge-platinum">PLATINUM</span>';
    } else {
        return 'Error';
    }
}
