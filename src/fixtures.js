'use strict';

function loadAllItems() {
  return [
    {
      barcode: 'ITEM0',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM1',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM2',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM3',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM4',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM5',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM0',
        'ITEM1',
        'ITEM5'
      ]
    },
    {
      type: 'OTHER_PROMOTION',
      barcodes: [
        'ITEM3',
        'ITEM4'
      ]
    }
  ];
}