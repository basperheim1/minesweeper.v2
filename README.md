What is this? 

This is a Minesweeper clone with an added twist: it is also a solver! The solving agent uses the current state of the board to determine the probability that each cell in the board is a mine. Equipped with this information, the agent will determine the cell with the smallest probability of being a mine, ideally 0%, and will click that cell; this pattern will continue until the board has been solved or the agent loses. 

How to Determine the Probabilities?
At any given point during a Minesweeper game, there is at least one valid board combination (configuration of mines in the board adhering to the rules of the game), given the current state of the board. To determine the probability of a cell, $X_1$, being a mine, you take the total number of valid board combinations with X_1 as a mine, divided by the total number of valid board combinations. If there are no valid board combinations that have X_1 as a mine, then the probability of the X_1 being a mine is 0%; however, if every valid board combination has X_1 as a mine, then the probability of X_1 being a safe cell is 100%. More often than not, there are some board combinations that are valid with X_1 being a mine, and there are some board combinations that are valid with X_1 being a safe cell; in this case, given the state of the board, the cell is "undecided," as it could be a safe cell or a mine cell. 

How Does the Algorithm Work? 

Each clicked cell within the board gives you a rule (axiom), that must be true. For example, if a clicked cell, Y, has the number 1, then we know with certainty, that there is only 1 mine surrounding Y. Equipped with these rules, we can determine valid board configurations. We do this by generating mine configurations, and then checking to see if they adhere to every rule that we have generated so far. Although this is the general algorithm we use to determine our probabilities, with no optomizations, the world would freeze over before many expert boards could be solved. If you're interested to see this, you can admire my initial Minesweeper repo, which I created ~2 years ago, with next to no programming or software engineering skills. For example, if we simply generated every valid board configuration for an expert board, before the first click, we would have C(480, 99) ≈ 5.60221e+104 valid board configurations. This is an NP-hard problem, resulting in every solution out there ultimately running in exponential time. Although there are various optimizations that can and have been implemented, ultimately, the algorithm will fail to keep up with increasing board sizes. Luckily, the classic board setups are small enough that the algorithm can be solved quickly. So, now that we know that optimizations can make this problem solvable given the typical Minesweeper board sizes, what are they? 

- Reducing Rules: 
- Adjusting Rules: 
- Pruning Configurations: 
- Creating "Islands": 



Will add details soon...

Game Link: https://minesweeper-one-gules.vercel.app/
