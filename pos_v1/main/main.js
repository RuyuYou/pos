'use strict';

function printReceipt(inputs, allItems, promotions) {
  let cartItems = buildCartItems(inputs, allItems);
  let printCartItems = buildSubTotalAndSaved(cartItems, promotions);
}

function buildSubTotalAndSaved(cartItems, promotions) {
  let receiveCartItems = [];
  let freeBarcode = promotions[0].barcodes;
  for (let cartItem of cartItems) {
    let promotion = freeBarcode.find((barcode)=> {
      return barcode === cartItem.item.barcode;
    });
    if (promotion) {
      let saveCount = Math.floor(cartItem.count / 3);
      let count = cartItem.count -saveCount;
      let saved = saveCount * cartItem.item.price;
      let subTotal = count * cartItem.item.price;
      receiveCartItems.push({cartItem, subTotal, saved});
    }
    else {
      let count = cartItem.count;
      let saved =0;
      let subTotal = cartItem.item.price * count;
      receiveCartItems.push({cartItem, subTotal, saved});
    }
  }
  return receiveCartItems;
}


function buildCartItems(inputs, allItems) {
  let cartItems = [];
  let items = getItemsCount(inputs);
  items.forEach((item)=> {
    let allItem = allItems.find((allItem)=> {
      return item.barcode === allItem.barcode;
    });
    if (allItem) {
      cartItems.push({item: allItem, count: item.count});
    }
  });
  return cartItems;
}

let getItemsCount = ( (inputs)=> {
  let items = [];
  inputs.forEach((input)=> {
    let inputArray = input.split('-');
    let barcode = inputArray[0];
    let count = parseFloat(inputArray[1] || 1);
    let item = items.find((item)=> {
      return item.barcode === barcode;
    });
    if (item) {
      item.count++;
    }
    else {
      items.push({barcode: barcode, count: count});
    }
  });
  return items;
});























