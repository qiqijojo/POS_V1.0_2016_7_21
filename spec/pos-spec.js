'use strict'
describe("formatTags",function(){
    it("should return the barcodes",function(){
        let tags = ["ITEM0-5","ITEM0-5"];
        let barcodes = [
            {
            barcode:"ITEM0",
            amount:5
            },
            {
                barcode:"ITEM0",
                amount:5
            }
            ];
        expect(formatTags(tags)).toEqual(barcodes);
    });
});

describe("mergeBarcodes",function(){
    it("should return the mergedBarcodes",function(){
        let barcodes = [
            {
                barcode:"ITEM0",
                amount:5
            },
            {
                barcode:"ITEM0",
                amount:5
            }
        ];
        let mergedBarcodes = [{
            barcode:"ITEM0",
            amount:10
        }];
        expect(mergeBarcodes(barcodes)).toEqual(mergedBarcodes);
    });
});

describe("matchCartItems",function(){
    it("should return the cartItems",function(){
        let mergedBarcodes = [{
            barcode:"ITEM0",
            amount:10
        }];
        let cartItems = [
            {
                amount:10,
                barcode: 'ITEM0',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00

            }];
        expect(matchCartItems(mergedBarcodes)).toEqual(cartItems);
    });
});

describe("calculatePromotions",function(){
    it("should return the promotedItems",function(){
        let cartItems = [
            {
                amount:10,
                barcode: 'ITEM0',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00

            }];
        let promotedItems = [
            {
                amount:10,
                barcode: 'ITEM0',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                type:'BUY_TWO_GET_ONE_FREE'

            }];
        expect(calculatePromotions(cartItems)).toEqual(promotedItems);
    });
});


describe("promoteAmount",function(){
    it("should return the promotedItemsAmounts",function(){
        let promotedItems = [
            {
                amount:10,
                barcode: 'ITEM0',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                type:'BUY_TWO_GET_ONE_FREE'
            }];
        let promotedItemsAmounts = [
            {
                amount:10,
                barcode: 'ITEM0',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                type:'BUY_TWO_GET_ONE_FREE',
                promoteItemAmount:7

            }];
        expect(promoteAmount(promotedItems)).toEqual(promotedItemsAmounts);
    });
});


describe("calculateSubtotal",function(){
    it("should return the promotedItemsAmounts",function(){
        let promotedItemsAmounts= [
            {
                amount:10,
                barcode: 'ITEM0',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                type:'BUY_TWO_GET_ONE_FREE',
                promoteItemAmount:7
            }];
        let subtotals = [
            {
                amount:10,
                barcode: 'ITEM0',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                type:'BUY_TWO_GET_ONE_FREE',
                promoteItemAmount:7,
                subtotal:21
            }];
        expect(calculateSubtotal(promotedItemsAmounts )).toEqual(subtotals);
    });
});

describe("calculateAlltotal",function(){
    it("should return the alltotal",function(){
        let alltotals = 21;
        expect(calculateAlltotal(subtotals)).toEqual(alltotal);
    });
});


describe("calculatePreSubtotal",function(){
    it("should return the promotedItemsAmounts",function(){
        let cartItems = [
            {
                amount:10,
                barcode: 'ITEM0',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00

            }];
        let preSubtotals = [
            {
                amount:10,
                barcode: 'ITEM0',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                preSubtotal:30
            }];
        expect(calculatePreSubtotal(cartItems)).toEqual(preSubtotals);
    });
});


describe("calculatePromotionMoney",function(){
    it("should return the promotion",function(){
        let preAlltotal = 30;
        let alltotal = 21;
        let promotion = 9;
        expect(calculatePromotionMoney(preAlltotal,alltotal)).toEqual(promotion);
    });
});

