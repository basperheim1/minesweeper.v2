export const encode = (row: number, column: number, numColumns: number): string => {
    /*
    Encode some position on the board to a string 
    
    The encode function uses a tile's row and column, as well as 
    the number of columns in the board to determine what string 
    should represent the tile. Note, that the encoder uses a base 
    26 encoding scheme; this means that A = 0, ..., Z = 25, BA = 26, 
    BZ = 51, etc. 
    */

    let id: string = "";
    let idx: number = row * numColumns + column;
    if (idx === 0){
        return "a";
    }

    while (idx != 0){
        let remainder = idx % 26; 
        id += String.fromCharCode(remainder + 'a'.charCodeAt(0));
        idx = Math.floor(idx / 26);

    }

    // Return a reversed string 
    return id.split("").reverse().join("");

}

export const decode = (encodedValue: string, numColumns: number): [number, number] => {
    /*
    Decodes a base-26 string back into (row, column).
    */

    let index: number = 0
    for (const char of encodedValue){
        index = index * 26 + (char.charCodeAt(0) - 'a'.charCodeAt(0));

    }

    const row = Math.floor(index / numColumns);
    const column = Math.floor(index % numColumns);

    return [row, column];
}