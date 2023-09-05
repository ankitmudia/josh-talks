Simple Quiz Application - JOSH-TALKS

## Getting Started

First, run the development server:

```bash
npm run dev
```

## About
Made a simple Quiz Application where 

1. User enter it's email address.
2. Email address should be valid.
3. upon validation, he will be redirected to Quiz Application.
4. At Quiz there is a timer of 30 minutes on the top right and instruction card for the user.
5. Quiz must be completed within timeline, else it will redirect automatically to result.
6. Track of questions attempted, visited and non-visited has been kept thoroughly.

## Technical Details

1. Used Server Side rendering as we will have single call for quiz api.
2. saved it in redux store using redux toolkit.
3. saved user's email for further use in redux store.
4. basic email validation applied.
5. Development scenarios and UI for quiz questions track has been maintained using different colors and mentioned in the above instruction box.
6. Report has been calculated based on correct answers provided in the quiz api and answers selected by user.
7 If user fails to complete within the timer, quiz will be auto submitted.

## Responsive Design
1. No external Library like bootstrap or Material UI has been used, Responsiveness has been
handled through flex and media-query.
2. Web App is Responsive till 400 screen-size, Suitable for almost every device.

## Tech Stack

1. Nextjs 
2. Redux-toolkit
3. React
4. ES6
## Challenges

1. Before this project i had not worked on any server side rendering, so had to study before implementing it, earlier i had theoretical idea of it.
2. This was the first time i deployed Application through vercel, there were no errors or warnings before deploying but vercel gave an error without any line number(for redux), took sometime to debug