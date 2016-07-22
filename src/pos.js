
'use strict';

function formatTags(tags){
    return tags.map(function(tag){
        let info = tag.split("-");
        return {
            barcode:info[0],
            amount:parseFloat(info[1]) || 1
        };
    });
}

function mergeBarcodes(barcodes){
    let mergedBarcodes = barcodes.reduce(function(cur,old){
        let existItem = cur.find(function(item){
            return item.barcode === old.barcode;
        });
        if(existItem){
            existItem.amount += old.amount;
        }else{
            cur.push(old);
        }
        return cur;
    },[]);
    return mergedBarcodes;
}


function matchCartItems(mergedBarcodes){
    let cartItems = [];
    for(let i = 0;i<mergedBarcodes.length;i++){
        for(var j=0;j<allItems.length;j++){
            if(mergedBarcodes[i].barcode === allItems[j].barcode){
                cartItems.push(Object.assign({},allItems[j],{amount:mergedBarcodes[i].amount}));
            }
        }
    }
    return cartItems;
}

function calculatePromotions(cartItems){
    let promotedItems = [];
    for(let k = 0;k<cartItems.length;k++){
        promotedItems.push(Object.assign({},cartItems[k],{type:"none"}));
        for(let i = 0;i<allPromotions.length;i++) {
            for(let j = 0; j < allPromotions[i].barcodes.length; j++) {
                if(promotedItems[k].barcode === allPromotions[i].barcodes[j]){
                    promotedItems[k].type = allPromotions[i].type;
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


function calculateSubtotal(promotedItemsAmounts ){
    let subtotals = [];
    for(let i = 0;i<promotedItemsAmounts.length;i++){
        subtotals.push(Object.assign({},promotedItemsAmounts[i],{subtotal:promotedItemsAmounts[i].promoteItemAmount * promotedItemsAmounts[i].price}));
    }
    return subtotals;
}

function calculateAlltotal(subtotals){
    let alltotal = 0;
    for(let i=0;i<subtotals.length;i++){
        alltotal +=subtotals[i].subtotal;
    }
    return alltotal;
}



function calculatePreSubtotal(cartItems){
    let preSubtotals = [];
    for(let i = 0;i<cartItems.length;i++){
        preSubtotals.push(Object.assign({},cartItems[i],{preSubtotal:cartItems[i].amount * cartItems[i].price}));
    }
    return preSubtotals;
}



function calculatePreAlltotal(preSubtotals){
    let preAlltotal = 0;
    for(let i = 0;i<preSubtotals.length;i++){
        preAlltotal += preSubtotals[i].preSubtotal;
    }
    return preAlltotal;
}
function calculatePromotionMoney(preAlltotal,alltotal){
    let promotion = preAlltotal - alltotal;
    return promotion;
}
let allItems = loadAllItems();
let allPromotions = loadPromotions();

function printReceipt(){
    let tags = ["ITEM0-5","ITEM0-5"];
    let barcodes = formatTags(tags);
    let mergedBarcodes = mergeBarcodes(barcodes);
    let cartItems = matchCartItems(mergedBarcodes);
    let promotedItems = calculatePromotions(cartItems);
    let promotedItemsAmounts = promoteAmount(promotedItems);
    let subtotals = calculateSubtotal(promotedItemsAmounts );
    let alltotal = calculateAlltotal(subtotals);
    let preSubtotals = calculatePreSubtotal(cartItems);
    let preAlltotal = calculatePreAlltotal(preSubtotals);
    let promotion = calculatePromotionMoney(preAlltotal,alltotal);

    console.log("***<没钱赚商店>***<br>");
    for(let i=0;i< subtotals.length;i++){
        console.log("名称："+subtotals[i].name+"，"+"数量："+subtotals[i].promoteItemAmount+":"+subtotals[i].unit+","+"单价："+subtotals[i].price+"（元）"+"，"+"小计:"+subtotals[i].subtotal+"（元)\n\n");
    }
    console.log("总计："+alltotal+"\n\n");
    console.log("节省："+promotion);
}
printReceipt();