"use strict";
/**
 * 数据源
 * @type {[{id: number; name: string; iconClass: boolean; isOpen: boolean; children: [{id: number; name: string; iconClass: boolean; isOpen: boolean; children: [{id: number; name: string; iconClass: boolean; isOpen: boolean},{id: number; name: string; iconClass: boolean; isOpen: boolean},{id: number; name: string; iconClass: boolean; isOpen: boolean}]},{id: number; name: string; iconClass: boolean; isOpen: boolean},{id: number; name: string; iconClass: boolean; isOpen: boolean}]},{id: number; name: string; iconClass: boolean; isOpen: boolean; children: [{id: number; name: string; iconClass: boolean; isOpen: boolean},{id: number; name: string; iconClass: boolean; isOpen: boolean},{id: number; name: string; iconClass: boolean; isOpen: boolean},{id: number; name: string; iconClass: boolean; isOpen: boolean},{id: number; name: string; iconClass: boolean; isOpen: boolean}]}]}
 */
exports.TreeDatas = [{
        id: 1, name: "本部", iconClass: true, isOpen: true,
        children: [
            { id: 1, name: '研发部', iconClass: true, isOpen: true,
                children: [
                    { id: 1, name: '地图', iconClass: true, isOpen: true, },
                    { id: 1, name: '导航', iconClass: true, isOpen: true, },
                    { id: 1, name: '定位', iconClass: true, isOpen: true, }
                ]
            },
            { id: 1, name: '产品', iconClass: true, isOpen: true },
            { id: 1, name: '测试', iconClass: true, isOpen: true }
        ]
    },
    {
        id: 123, name: "市场部", iconClass: true, isOpen: true,
        children: [
            { id: 1, name: "市场", iconClass: true, isOpen: true },
            { id: 1, name: "销售", iconClass: true, isOpen: true },
            { id: 1, name: "法务", iconClass: true, isOpen: true },
            { id: 1, name: "人事", iconClass: true, isOpen: true },
            { id: 1, name: "其它", iconClass: true, isOpen: true }
        ]
    }
];
//# sourceMappingURL=data.js.map