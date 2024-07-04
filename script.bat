CALL tsc --jsx react app\static\main.tsx

CALL browserify app\static\main.js -o app\static\bundle.js

CALL flask run