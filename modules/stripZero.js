/**
 * some fields return 0 when they should probably be null
 *
 * @param {*} data
 * @param {*} type
 * @returns
 */
export default function stripZero(data, type) {
    if (type === 'display') {
        if (data === 0) {
            data = '';
        }
    }

    return data;
}