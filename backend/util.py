from typing import Tuple, List
from rule import Rule

def encode(row: int, column: int, num_columns: int) -> str:
    """
    Encode some position on the board to a string 
    
    The encode function uses a tile's row and column, as well as 
    the number of columns in the board to determine what string 
    should represent the tile. Note, that the encoder uses a base 
    26 encoding scheme; this means that A = 0, ..., Z = 25, BA = 26, 
    BZ = 51, etc. 
    """
    id = ""
    idx = row*num_columns + column
        
    if idx == 0:
        return "a"
    
    while (idx != 0):
        remainder = idx % 26
        id += chr(remainder + ord('a'))
        idx //= 26
        
    return id[::-1]
    

def decode(encoded_value: str, num_columns: int) -> Tuple[int, int]:
    """
    Decodes a base-26 string back into (row, column).
    """
    index = 0
    for char in encoded_value:
        index = index *26 + (ord(char) - ord('a'))
    row = index // num_columns
    col = index % num_columns

    return row, col

def decode_int(encoded_value: str) -> int:
    """
    Decodes a base-26 string back into (row, column).
    """
    index = 0
    for char in encoded_value:
        index = index *26 + (ord(char) - ord('a'))
        
    return index

