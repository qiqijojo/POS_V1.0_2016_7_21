'use strict';
let tags = ["ITEM0-5","ITEM0-5"];
function formatTags(tags){
    return tags.map(function(tag){
        let info = tag.split("-");
        return {
            barcode:info[0],
            amount:parseFloat(info[1]) || 1
        };
    });
}
let barcodes= formatTags(tags);

function mergeBarcodes(barcodes){
    let mergedBarcodes = barcodes.reduce(function(cur,old){
        let existItems = cur.find(function(item){
            return item.barcode === old.barcode
        });
        if(existItems){
            existItems.amount += old.amount;
        }else{
            cur.push(old);
        }
        return cur;
    },[]);
        return mergedBarcodes;
    }
    let allItems = loadAllItems();
function matchCartItems(mergedBarcodes){
    let cartItems = [];
    for(let i=0;i<mergedBarcodes.length;i++){
        for(let j=0;j<allItems.length;j++){
            if(mergedBarcodes[i].barcode === allItems[j].barcode){
                cartItems.push(Object.assign({},allItems[j],{amount:mergedBarcodes[i].amount}));
            }
        }
    }
    return cartItems;
}
let allPromotions = loadPromotions();
function calculatePromotions(cartItems){
    let promotedItems = [];
    for(let i=0;i<cartItems.length;i++){
        promotedItems.push(Object.assign({},cartItems[i],{type:"none"}));
        for(let j = 0;j<allPromotions.length;j++){
            for(let k = 0;k<allPromotions[j].barcodes.length;k++){
                if(promotedItems[i].barcode === allPromotions[j].barcodes[k]){
                    promotedItems[i].type = allPromotions[j].type;
                }
            }
        }
    }
    return promotedItems;
}

function promoteAmount(promotedItems){
    let promotedItemsAmounts = [];
    for(let i=0;i<promotedItems.length;i++){

        if(promotedItems[i].type === "BUY_TWO_GET_ONE_FREE"){
            promotedItemsAmounts.push(Object.assign({},promotedItems[i],{promoteItemAmount:promotedItems[i].amount-parseInt(promotedItems[i].amount/3)}));
        }
        else if(promotedItems[i].type === "OTHER_PROMOTION"){
            promotedItemsAmounts.push(Object.assign({},promotedItems[i],{promoteItemAmount:promotedItems[i].amount}));
        }
    }
    return promotedItemsAmounts;
}
let promotedItemsAmounts = promoteAmount(promotedItems);
console.log(promotedItemsAmounts);

function calculateSubtotal(promotedItemsAmounts ){
    let subtotals = [];
    for(let i = 0;i<promotedItemsAmounts.length;i++){
        subtotals.push(Object.assign({},promotedItemsAmounts[i],{subtotal:promotedItemsAmounts[i].promoteItemAmount * promotedItemsAmounts[i].price}));
    }
    return subtotals;
}
let subtotals = calculateSubtotal(promotedItemsAmounts );
console.log(subtotals);

function calculateAlltotal(subtotals){
    let alltotal = 0;
    for(let i=0;i<subtotals.length;i++){
        alltotal +=subtotals[i].subtotal;
    }
    return alltotal;
}
let alltotal = calculateAlltotal(subtotals);
console.log(alltotal);


function calculatePreSubtotal(cartItems){
    let preSubtotals = [];
    for(let i = 0;i<cartItems.length;i++){
        preSubtotals.push(Object.assign({},cartItems[i],{preSubtotal:cartItems[i].amount * cartItems[i].price}));
    }
    return preSubtotals;
}
let preSubtotals = calculatePreSubtotal(cartItems);
console.log(preSubtotals);



function calculatePreAlltotal(preSubtotals){
    let preAlltotal = 0;
    for(let i = 0;i<preSubtotals.length;i++){
        preAlltotal += preSubtotals[i].preSubtotal;
    }
    return preAlltotal;
}
let preAlltotal = calculatePreAlltotal(preSubtotals);
console.log(preAlltotal);

function calculatePromotionMoney(preAlltotal,alltotal){
    let promotion = preAlltotal - alltotal;
    return promotion;
}
let promotion = calculatePromotionMoney(preAlltotal,alltotal)
console.log(promotion);

function printReceipt(){
    document.write("***<没钱赚商店>***<br>");
    for(let i=0;i< subtotals.length;i++){
        document.write("名称："+subtotals[i].name+"，"+"数量："+subtotals[i].promoteItemAmount+":"+subtotals[i].unit+","+"单价："+subtotals[i].price+"（元）"+"，"+"小计:"+subtotals[i].subtotal+"（元)<br>");
    }
    document.write("总计："+alltotal+"<br>");
    document.write("节省："+promotion);
}
console.log(printReceipt())


