# Fix Notes

## What the bug was

After running the tests using `npm test`, the subtotal test failed with this error that indicated that the subtotal should include decimal prices 29 != 30.99

So the test expected the subtotal to be 30.99, but the function returned 29.

This showed that decimal values in item prices were not being included correctly in the subtotal calculation.

## Root cause

After checking the code, I found that the issue was caused by using parseInt() inside the calculateSubtotal function which will convert the decimal to integer and removes everything after the decimal point.

The code was:

```js
parseInt(item.price, 10);
```

So if we entered 10.99 it will return 10.

Which will cause the subtotal to become lower than expected.

## Fix

I replaced parseInt() with Number() so decimal values are preserved correctly.

Before:

```js
parseInt(item.price, 10);
```

After:

```js
Number(item.price);
```

Updated code:

```js
function calculateSubtotal(items) {
  return items.reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);
}
```

## How to verify

1. After I corrected the code we run the test again

```bash
npm test
```

2. Then confirm that all tests pass successfully (Message: All test passed).

3. Test with other decimal prices (change number to verify more).

## How to prevent similar bugs in the future

For money and price calculations, decimal values should always be preserved using Number() instead of parseInt().

It is also important to include test cases with decimal values and edge cases to catch calculation issues early.
