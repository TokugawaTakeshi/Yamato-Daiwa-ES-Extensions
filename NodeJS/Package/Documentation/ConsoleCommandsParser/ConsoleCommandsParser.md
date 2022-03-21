# ConsoleCommandParser

## Minimal theory

* There is no official terminology - just more or less established convention.
* At last `process.argv` (shorthand for the "arguments vector", the [convention inherited from C++](https://stackoverflow.com/questions/3024197/what-does-int-argc-char-argv-mean))
  is the array of strings. What to do with them - the author of application is deciding.

### Conventional terminology

```
command [argument1] [argument2] ... [argumentN]
```

For example,

```
webpack build --mode development
```

* The *argument* cold be the:
  * **option**, **option key** - starts with `--`. 
  * **parameter** -  the value of the "option" (**option value**).
* If the **option** has not the **parameter**, it being considered as boolean with `true` value.
* The **option** could have the **shortcut**, starting from `-`.
* The arguments are being split by whitespace(s). If the **option value** including the whitespaces, it must be wrapped
  to single or double quotes.


#### Command phrase

The **command phrase** is the first non-option **argument**, e. g. `build` in `yda build --mode DEVELOPMENT`.

* It is the **phrase** because could consist from multiple words, e. g. `buildProject`.
* The **commandPhrase** could be explicit (as `build` in `yda build --mode DEVELOPMENT`) or implicit
  (like `webpack --mode development` - actually it builds the project too).


## Building of CLI with ConsoleCommandParser
### Step 1: Define the Console Line Interface

### Step 2: Get the arguments vector

### Step 3: Parse the command

### Step 4: Provide the handling of each command
