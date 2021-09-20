/* eslint-disable prettier/prettier */

export const getSiblings = function (elem) {
    let siblings = [];
    let sibling = elem.parentNode.firstChild;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

export const slugify = function (text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
};

export const getClosest = function (elem, selector) {
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }
    return null;
};

export const flatDeep = (arr, d = 1) => {
    return d > 0
        ? arr.reduce(
            (acc, val) =>
                acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
            []
        )
        : arr.slice();
};

export function truncateString(str, num, dots = true) {
    let endDots = dots ? "..." : "";
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + endDots;
}