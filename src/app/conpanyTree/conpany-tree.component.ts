import {Component, Input, ViewContainerRef} from '@angular/core';
import { TreeConfig } from './bean/treeconfig';

@Component({
	selector: 'ngTree',
  styleUrls:['./conpany-tree.component.css','./style.css'],
  templateUrl:'./conpany-tree.component.html'
})


export class NgTree {
	static DATAMAP:any = {
		name:"name",
		isOpen:"isOpen",
		iconClass:"iconClass",
		nameClass:"nameClass",
		children:"children",
		isChecked:"isChecked",
		tools:"tools",
		enableTools:"enableTool"
	}

	private treeElement:any;

	private treeRoot:any;

	constructor(view:ViewContainerRef){
		this.treeElement = view.element.nativeElement;
	}

	@Input() private parent:any;
	@Input() private isSub: boolean;
	@Input() private treeData: any[];
	@Input() private treeContext:any;
	@Input() private treeConfig: TreeConfig;
	@Input() private treeMap: any;
	@Input() private isOpen:any;

	private openTimeout:any;
	private closeTimeout:any;

	private nodeCount:number = 0;
	private oldNode:any;






	/**
	 * only work for tree root instance
	 * @param node
	 * @return siblings include itself
	 */
	public findNodeSiblings(node:any):any[]{
		if(!this.treeRoot){
			console.error("please find from tree root");
			return;
		}

        let stack:any[] = [];

		if(this.treeRoot.indexOf(node)>-1){
			return this.treeRoot;
		}

		//先将第一层节点放入栈
		this.treeRoot.forEach((item:any)=>{
			stack.push(item);
		});

        let item, children;
        while (stack.length) {
            item = stack.shift();
			children = item[this.treeMap.children];

            if (children && children.length) {
				if(children.indexOf(node)>-1){
					return children;
				} else {
                	stack = stack.concat(item.children);
				}
            }
        }

		return null;
	}

	/**
	 * only work for tree root instance
	 * @param node
	 * @return parent if node belongs to root, return an empty object, otherwise return null
	 */
	public findNodeParent(node:any):any {
		if(!this.treeRoot){
			console.error("please find from tree root");
			return;
		}

        let stack:any[] = [];

		//先将第一层节点放入栈
		this.treeRoot.forEach((item:any)=>{
			if(node == item){
				return {};
			}

			stack.push(item);
		});

        let item, children;
        while (stack.length) {
            item = stack.shift();
			children = item[this.treeMap.children];

            if (children && children.length) {
				if(children.indexOf(node)>-1){
					return item;
				} else {
                	stack = stack.concat(item.children);
				}
            }
        }

		return null;
	}

	/**/
	private ngOnChanges(changes: any) {

		if(changes.isOpen && this.isSub){
			if(this.openTimeout){
				clearTimeout(this.openTimeout);
				this.openTimeout = null;
			}

			if(this.closeTimeout){
				clearTimeout(this.closeTimeout);
				this.closeTimeout = null;
			}

			/*enable css3 height animation*/
			if(changes.isOpen.currentValue){
				this.treeElement.style.height = this.treeElement.scrollHeight+"px";
				this.openTimeout = setTimeout(()=>{
					this.treeElement.style.height = "auto";
					clearTimeout(this.openTimeout);
					this.openTimeout = null;
				}, 200);
			} else {
				this.treeElement.style.height = this.treeElement.scrollHeight+"px";
				this.closeTimeout = setTimeout(()=>{
					this.treeElement.style.height = 0;
					clearTimeout(this.closeTimeout);
					this.closeTimeout = null;
				}, 1);
			}
		}
	}

	/**/
	private tData:any;
	private ngOnInit(){
		if(!this.isSub){
			this.treeRoot = this.treeData;
			let defaultMap = Object.assign({}, NgTree.DATAMAP);
			this.treeMap = this.treeConfig ? Object.assign(defaultMap, this.treeConfig.dataMap):defaultMap;
			this.treeContext = {
				nodeSelected:[]
			}
		}

		/*add parent refrence to children node*/
		if(this.treeData){
			/*format or filter tree datas before subtree being created*/
			if(this.treeConfig && typeof this.treeConfig.dataFilter == "function"){
				this.tData = this.treeConfig.dataFilter(this.treeData);
			} else {
				this.tData = this.treeData;
			}
			this.nodeCount = this.treeData.length;
		} else {
			this.tData = null;
			this.nodeCount = 0;
		}
	}

	private ngDoCheck() {
		if(this.treeData && this.nodeCount!=this.treeData.length){
			this.ngOnInit();
		}
	}

	/*打开或者关闭树形节点*/
	private openNode(node:any, e:any){
		e.stopPropagation();
		e.preventDefault();

		/*即将折叠或打开*/
		if(node[this.treeMap.children]){
			if(!this.treeConfig || !this.treeConfig.onFold || this.treeConfig.onFold(node)){
				node.isOpen = !node.isOpen;
			}
		}

		return false;
	}

	/*节点被点击*/
	private nodeClick(node:any, e:any) {
		e.preventDefault();

		if(this.treeConfig && this.treeConfig.onClick){
			if(this.treeConfig.onClick(node)){
				node[this.treeMap.isChecked] = !node[this.treeMap.isChecked];
			}
		} else {
		//   if(this.oldNode){
      //   this.oldNode[this.treeMap.isChecked] = ! this.oldNode[this.treeMap.isChecked];
      // }
      // this.oldNode = node;
      node[this.treeMap.isChecked] = !node[this.treeMap.isChecked];
      setTimeout(()=>{
        node[this.treeMap.isChecked] = !node[this.treeMap.isChecked];
      },100)

		}

		return false;
	}



	private onEdit(node:any, e:any){
		e.stopPropagation();
		if(this.treeConfig && this.treeConfig.onToolClick){
			this.treeConfig.onToolClick(node, e.target.className);
		}

		return false;
	}
}



