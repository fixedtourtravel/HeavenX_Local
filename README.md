# HeavenX

### Use branches for individual work and final synchronised code can be put in main branch

### main has only merged code

### avoid pushing directly to main branch instead use branches

## Tech used

- MERN
- Material UI and Reactstrap
- Context for state management

### localstorage stores the token so pass (inside a request)

headers: {
'x-auth-token': `${localStorage.getItem(TOKEN_ID)}`,
},
