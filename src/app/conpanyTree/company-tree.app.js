"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var conpany_tree_service_1 = require("./conpany-tree.service");
var ConpanyTree = (function () {
    function ConpanyTree(conpanyTreeService) {
        this.conpanyTreeService = conpanyTreeService;
        this.title = '集团组织结构';
        /**
         * 增删改查
         * @type {{tools: [{name: string; iconClass: boolean; title: string},{name: string; iconClass: boolean; title: string},{name: string; iconClass: boolean; title: string}]; onToolClick: ((node:any, name:any)=>any)}}
         */
        this.treeConfig = {
            tools: [
                { name: "icon-plus", iconClass: true, title: "添加" },
                { name: "icon-edit", iconClass: true, title: "编辑" },
                { name: "icon-bin", iconClass: true, title: "删除" },
            ],
            /**
             * 事件处理
             * @param node
             * @param name
             * @return {boolean}
             */
            onToolClick: function (node, name) {
                if (name == "icon-plus") {
                    name = prompt("请输入新部门名称", ""); //将输入的内容赋给变量 name ，
                    //这里需要注意的是，prompt有两个参数，前面是提示的话，后面是当对话框出来后，在对话框里的默认值
                    if (name) {
                        node.children = node.children || [];
                        node.children.push({
                            name: name,
                            iconClass: true,
                            isOpen: true
                        });
                    }
                }
                else if (name == "icon-edit") {
                    name = prompt("请输入部门新名称", ""); //将输入的内容赋给变量 name ，
                    //这里需要注意的是，prompt有两个参数，前面是提示的话，后面是当对话框出来后，在对话框里的默认值
                    if (name) {
                        node.name = name;
                    }
                }
                else {
                    console.log("删除:");
                    console.log(node);
                }
            }
        };
    }
    ConpanyTree.prototype.ngOnInit = function () {
        this.getTreeDatas();
    };
    ConpanyTree.prototype.getTreeDatas = function () {
        var _this = this;
        this.conpanyTreeService.getTreeDatas().then(function (treeData) { return _this.treeData = treeData; });
        // this.treeData = this.conpanyTreeService.getTreeDatas();
    };
    return ConpanyTree;
}());
ConpanyTree = __decorate([
    core_1.Component({
        selector: 'conpany-tree',
        templateUrl: './company-tree.app.html',
        styleUrls: ['./company-tree.app.css']
    }),
    __metadata("design:paramtypes", [conpany_tree_service_1.ConpanyTreeService])
], ConpanyTree);
exports.ConpanyTree = ConpanyTree;
//# sourceMappingURL=company-tree.app.js.map