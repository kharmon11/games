"use strict";

const letterToNumber = {
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
}

const numberToLetter = {
    10: "a",
    11: "b",
    12: "c",
    13: "d",
    14: "e",
    15: "f"
}

const hexToDec = function (hex) {
    let dec = 0;
    for (let i = 0; i < hex.length; i++) {
        let num;
        if ("abcdefABCDEF".includes(hex[i])) {
            num = letterToNumber[hex[i].toLowerCase()];
            const lowChar = hex[i].toLowerCase();
        } else {
            num = hex[i];
        }
        dec += (num * (16 ** (hex.length - 1 - i)));
    }
    return dec;
}

const decToHex = function (dec) {
    let hex = "";
    hexPowerCompare(dec, 1).then((power) => {
        let num = Math.floor(dec / (16 ** power));
        if (num > 9) {
            hex += numberToLetter[Math.floor(dec / (16 ** power))];
        } else {
            hex += num.toString();
        }
        dec -= num * (16 ** power);
        if (dec > 0) {
            for (let i = power; i > -1; i--) {
                num = Math.floor(dec / (16 ** i));
                if (num > 9) {
                    hex += numberToLetter[Math.floor(dec / (16 ** power))];
                } else {
                    hex += num.toString();
                }
                if (dec === 0) {
                    return hex;
                }
            }
        } else {
            return hex;
        }
    });
}

function hexPowerCompare(dec, power) {
    return new Promise((resolve, reject) => {
        if (16 ** power >= dec) {
            resolve(power - 1);
        } else {
            hexPowerCompare(dec, power + 1).then((power) => {
                resolve(power - 1);
            })

        }
    })
}


export {hexToDec, decToHex};