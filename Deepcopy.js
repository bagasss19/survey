const deepCopy = (array) => {
    let newArray = [];

    for (key in array) {
        value = array[key]
        // Recursively (deep) copy for nested objects, including arrays
        newArray[key] = deepCopy(value)
    }

    return newArray
}

let a = [1, [2], [[3]],[[[4]]]]
let b = deepCopy(a)
b[0] = 4
b[1][0] = 7
b[2][0][0] = 7
b[3][0][0][0] = 7
console.log(`array A adalah ${a}, sedangkan array B adalah ${b}`)