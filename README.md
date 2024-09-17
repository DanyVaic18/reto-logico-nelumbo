# Logical Challenge

Calculate the amount of calories (kcal) that a person should consume in a day.

## Init Proyect

- npm install
- npm run dev

## Deploy

- npm run deploy

### Metric Systems

- Decimal
- Anglo-Saxon

### Dates

- Age
- Stature
- Weight

### Fuction calories

(10 x **Weight** + 6.25 x **Stature** - 10 x **Age** + 5) x **Factor**

The factor is a constant that depends on the person's weight.
If the person weighs less than 165 pounds the factor is 1.6, between 165lb and 200lb it is 1.4, from 201 to 220 it is 1.2 and more than 220 it is 1.

### Validations

- For weight, a minimum value of 40.50 kg and a maximum value of 300 kg must be used.
- For the height, a value between the range of 1.40mts and 2.25mts
- For age, a minimum value of 16 or equal and a maximum value of 105 must be validated.
