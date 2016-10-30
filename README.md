# autocomplete-lite
A lightweight autocomplete plugin using JQuery

[DEMO](https://jsfiddle.net/pjtnpLn7/)

## how to use :

1. Load JQuery library
2. Load *autocomplete-lite-vanilla.js* library
3. Initialize autocomplete on element and pass autocomplete list as an array
   ```
   document.getElementById('autocomplete_input').autocomplete_init(data_array);
   ```

######    EXAMPLE :
```
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
   <script src="autocomplete-lite.js"></script>

   <input type="text" id="autocomplete_input">

   <script>
       // initializing

       document.getElementById('autocomplete_input').autocomplete_init(["aaa", "bbb", "ccc", "ddd", "eee", "fff"]);
   </script>
```
