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

getItemsCount = ( (inputs)=> {
  let items = [];
  inputs.forEach((input)=> {
    let inputArray = input.split('-');
    let barcode = inputArray[0];
    let count = parseFloat(inputArray[1] || 1);
    let item = items.find((item)=>{
      return item.barcode === barcode;
    });
    if (item) {
      item.count ++;
    }
    else {
      items.push({barcode: barcode, count: count});
    }
  });
  return items;
});























