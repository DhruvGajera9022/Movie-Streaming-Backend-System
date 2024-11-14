// To format date-of-birth
function formatDate(dateString) {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}


module.exports = {
    formatDate,
}