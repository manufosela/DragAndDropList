# DragAndDropList javascript class

To make UL/LI HTML list dragAndDroped easily. It uses vanilla javascript.

# Install 
```
$ npm install drag-and-drop-list
```

# Demo
[Codepen Demo](https://codepen.io/manufosela/pen/gOwbjBO);


# Local demo
```
$ npm run start
```

# Example

```javascript
import { DragAndDropList } from '../DragAndDropList.js';
    
const dndList = new DragAndDropList(); 
DragAndDropList.init();
```

# Contructor Parameters
const dndList = new DragAndDropList(first, second);
 
* first: ['replace'] || 'before' -> drag and drop mode
* second: callbackFunction -> callback function to run when drag and drop finish