

export const isNumberArray = (array: Number[]) : Boolean => {
    if (!Array.isArray(array)) {
        return false
    }

    for (let i = 0; i < array.length; i++) {
        if (isNaN(Number(array[i]))) {
            return false
        }
    }
    return true
}
