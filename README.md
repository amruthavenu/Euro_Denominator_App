# 💶 Euro Denomination Calculator App

This is a full-stack web application that calculates the denomination breakdown of a given Euro amount using the fewest number of coins and bills.
The app supports both frontend and backend calculation modes and visually compares the breakdown with the previously calculated amount.


Project Structure
```text
Euro_Denominator_App/
├── Euro_Denominator_Backend/    ← Java Spring Boot 
└── Euro_Denominator_Frontend/   ← Angular 20
```
Features

-  Converts Euro amounts into optimal denominations (coins & notes)
-  Compare current and previous breakdowns
-  Toggle between frontend and backend calculation logic
-  Validates input (greater than zero, max limit supported)
-  Unit tests for frontend and backend
```text
Example:
Input: 186.73 EUR
Output: {100€ : 1 , 
        50€ : 1, 
        20€ : 1,
        10€ : 1,
        5€ : 1, 
        1€ : 1, 
        0.5€ : 1, 
        0.2€ : 1, 
        0.02€ : 1, 
        0.01€ : 1}

New input : 45.56 EUR

Output:{
20.00 €: 2
5.00 €:	1
0.50 €:	1
0.05 €:	1
0.01 €:	1}

Difference from previous 186.73 EUR
Output:{
100.00 € :-1
50.00 €	: -1
20.00 €	: +1
10.00 €	: -1
5.00 € :  0
1.00 € : -1
0.50 €	: 0
0.20 €	: -1
0.05 €	: +1
0.02 €	: -1
0.01 €	: 0
}
```
