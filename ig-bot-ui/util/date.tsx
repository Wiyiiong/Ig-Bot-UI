
export function formatDate(date: Date) {
    var day = "" + date.getDate();
    var month = "" + date.getMonth();
    var year = "" + date.getFullYear();

    if (day.length < 2) {
        day = "0" + day;
    }

    switch (month) {
        case "0": month = "Jan"; break;
        case "1": month = "Feb"; break;
        case "2": month = "Mar"; break;
        case "3": month = "Apr"; break;
        case "4": month = "May"; break;
        case "5": month = "Jun"; break;
        case "6": month = "Jul"; break;
        case "7": month = "Aug"; break;
        case "8": month = "Sep"; break;
        case "9": month = "Oct"; break;
        case "10": month = "Nov"; break;
        case "11": month = "Dec"; break;
        default: break;
    }

    return day + " " + month + " " + year;

}

export function getToday() {
    var now = new Date(Date.now());
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    return new Date(year, month, day, 0, 0, 0)

}