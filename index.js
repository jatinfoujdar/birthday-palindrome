function reverseStr(str) {
    var listOfChars = str.split("");
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join("");
    return reversedStr;
}

function isPalinDrome(str) {
    var reversed = reverseStr(str);
    return str === reversed;
}

function convertDateToStr(date) {
    var dateStr = {
        day: "",
        month: "",
        year: ""
    };
    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;

}

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindrome = getAllDateFormats(date);
    var flag = false;
    for (var i = 0; i < listOfPalindrome.length; i++) {
        if (isPalinDrome(listOfPalindrome[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isThisLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (isThisLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > dayInMonth[month - 1]) {
            day = 1;
            month++
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }


    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);
    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

const input = document.querySelector("#birthday-input");
const outputEl = document.querySelector("#output");
const button = document.querySelector("#check-button");

button.addEventListener("click", clickHandler)

function clickHandler(e) {
    var bdayStr = input.value;
    if (bdayStr !== "") {
        var listOfDate = bdayStr.split("-");
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if (isPalindrome) {
            outputEl.innerText = "yay!! your b,day is palindrome"
        } else {
            var [ctr, nextDate] = getNextPalindromeDate(date);
            outputEl.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr} days.`;;
        }
    }

}