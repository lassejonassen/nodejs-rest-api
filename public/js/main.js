const currentYear = (new Date()).getFullYear();

$(document).ready(() => {
    addNumbers();
});

function addNumbers() {
    for (var i = 1950; i <= currentYear; i++) {
        $('#yearSelect').append(new Option(i, i));
    }

    for (var i = 1; i <= 31; i++) {
        $('#daySelect').append(new Option(i, i));
    }
}