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
var NgTree = NgTree_1 = (function () {
    function NgTree(view) {
        this.nodeCount = 0;
        this.treeElement = view.element.nativeElement;
    }
    /**
     * only work for tree root instance
     * @param node
     * @return siblings include itself
     */
    NgTree.prototype.findNodeSiblings = function (node) {
        if (!this.treeRoot) {
            console.error("please find from tree root");
            return;
        }
        var stack = [];
        if (this.treeRoot.indexOf(node) > -1) {
            return this.treeRoot;
        }
        //先将第一层节点放入栈
        this.treeRoot.forEach(function (item) {
            stack.push(item);
        });
        var item, children;
        while (stack.length) {
            item = stack.shift();
            children = item[this.treeMap.children];
            if (children && children.length) {
                if (children.indexOf(node) > -1) {
                    return children;
                }
                else {
                    stack = stack.concat(item.children);
                }
            }
        }
        return null;
    };
    /**
     * only work for tree root instance
     * @param node
     * @return parent if node belongs to root, return an empty object, otherwise return null
     */
    NgTree.prototype.findNodeParent = function (node) {
        if (!this.treeRoot) {
            console.error("please find from tree root");
            return;
        }
        var stack = [];
        //先将第一层节点放入栈
        this.treeRoot.forEach(function (item) {
            if (node == item) {
                return {};
            }
            stack.push(item);
        });
        var item, children;
        while (stack.length) {
            item = stack.shift();
            children = item[this.treeMap.children];
            if (children && children.length) {
                if (children.indexOf(node) > -1) {
                    return item;
                }
                else {
                    stack = stack.concat(item.children);
                }
            }
        }
        return null;
    };
    /**/
    NgTree.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.isOpen && this.isSub) {
            if (this.openTimeout) {
                clearTimeout(this.openTimeout);
                this.openTimeout = null;
            }
            if (this.closeTimeout) {
                clearTimeout(this.closeTimeout);
                this.closeTimeout = null;
            }
            /*enable css3 height animation*/
            if (changes.isOpen.currentValue) {
                this.treeElement.style.height = this.treeElement.scrollHeight + "px";
                this.openTimeout = setTimeout(function () {
                    _this.treeElement.style.height = "auto";
                    clearTimeout(_this.openTimeout);
                    _this.openTimeout = null;
                }, 200);
            }
            else {
                this.treeElement.style.height = this.treeElement.scrollHeight + "px";
                this.closeTimeout = setTimeout(function () {
                    _this.treeElement.style.height = 0;
                    clearTimeout(_this.closeTimeout);
                    _this.closeTimeout = null;
                }, 1);
            }
        }
    };
    NgTree.prototype.ngOnInit = function () {
        if (!this.isSub) {
            this.treeRoot = this.treeData;
            var defaultMap = Object.assign({}, NgTree_1.DATAMAP);
            this.treeMap = this.treeConfig ? Object.assign(defaultMap, this.treeConfig.dataMap) : defaultMap;
            this.treeContext = {
                nodeSelected: []
            };
        }
        /*add parent refrence to children node*/
        if (this.treeData) {
            /*format or filter tree datas before subtree being created*/
            if (this.treeConfig && typeof this.treeConfig.dataFilter == "function") {
                this.tData = this.treeConfig.dataFilter(this.treeData);
            }
            else {
                this.tData = this.treeData;
            }
            this.nodeCount = this.treeData.length;
        }
        else {
            this.tData = null;
            this.nodeCount = 0;
        }
    };
    NgTree.prototype.ngDoCheck = function () {
        if (this.treeData && this.nodeCount != this.treeData.length) {
            this.ngOnInit();
        }
    };
    /*打开或者关闭树形节点*/
    NgTree.prototype.openNode = function (node, e) {
        e.stopPropagation();
        e.preventDefault();
        /*即将折叠或打开*/
        if (node[this.treeMap.children]) {
            if (!this.treeConfig || !this.treeConfig.onFold || this.treeConfig.onFold(node)) {
                node.isOpen = !node.isOpen;
            }
        }
        return false;
    };
    /*节点被点击*/
    NgTree.prototype.nodeClick = function (node, e) {
        var _this = this;
        e.preventDefault();
        if (this.treeConfig && this.treeConfig.onClick) {
            if (this.treeConfig.onClick(node)) {
                node[this.treeMap.isChecked] = !node[this.treeMap.isChecked];
            }
        }
        else {
            //   if(this.oldNode){
            //   this.oldNode[this.treeMap.isChecked] = ! this.oldNode[this.treeMap.isChecked];
            // }
            // this.oldNode = node;
            node[this.treeMap.isChecked] = !node[this.treeMap.isChecked];
            setTimeout(function () {
                node[_this.treeMap.isChecked] = !node[_this.treeMap.isChecked];
            }, 100);
        }
        return false;
    };
    NgTree.prototype.onEdit = function (node, e) {
        e.stopPropagation();
        if (this.treeConfig && this.treeConfig.onToolClick) {
            this.treeConfig.onToolClick(node, e.target.className);
        }
        return false;
    };
    return NgTree;
}());
NgTree.DATAMAP = {
    name: "name",
    isOpen: "isOpen",
    iconClass: "iconClass",
    nameClass: "nameClass",
    children: "children",
    isChecked: "isChecked",
    tools: "tools",
    enableTools: "enableTool"
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NgTree.prototype, "parent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NgTree.prototype, "isSub", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], NgTree.prototype, "treeData", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NgTree.prototype, "treeContext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NgTree.prototype, "treeConfig", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NgTree.prototype, "treeMap", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NgTree.prototype, "isOpen", void 0);
NgTree = NgTree_1 = __decorate([
    core_1.Component({
        selector: 'ngTree',
        styleUrls: ['./conpany-tree.component.css', './style.css'],
        templateUrl: './conpany-tree.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], NgTree);
exports.NgTree = NgTree;
var NgTree_1;
//# sourceMappingURL=conpany-tree.component.js.map