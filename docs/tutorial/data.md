# Data

You can use the same data definition formats as in the `vizzu` library, there
are two types of data series: dimensions and measures.

!!! note
    Please note, that all of the data used throughout your data story has to be
    added to the story at initialization. The data being shown can be filtered
    at each step.

!!! tip
    See [vizzu - Data chapter](https://lib.vizzuhq.com/latest/tutorial/data/)
    for more details about data.

Here's some sample code for common use cases.

## Specify data by series

```javascript
const data = {
    series: [{
        name: 'Foo',
        values: ['Alice', 'Bob', 'Ted']
    }, {
        name: 'Bar',
        values: [15, 32, 12]
    }, {
        name: 'Baz',
        values: [5, 3, 2]
    }]
};
```
