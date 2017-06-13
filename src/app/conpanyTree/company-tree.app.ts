import { Component,OnInit } from '@angular/core';
import { TreeData} from './bean/treedata';
import { ConpanyTreeService } from './conpany-tree.service';

@Component({
  selector: 'conpany-tree',
  templateUrl:'./company-tree.app.html' ,
  styleUrls:['./company-tree.app.css']
})
export class ConpanyTree  implements OnInit{
  private title:String = '集团组织结构';
  public treeData:TreeData[];

  constructor(private conpanyTreeService: ConpanyTreeService) { }


  ngOnInit():void{
    this.getTreeDatas();
  }

  getTreeDatas(): void {
    this.conpanyTreeService.getTreeDatas().then(treeData => this.treeData = treeData);
    // this.treeData = this.conpanyTreeService.getTreeDatas();
  }


  /**
   * 增删改查
   * @type {{tools: [{name: string; iconClass: boolean; title: string},{name: string; iconClass: boolean; title: string},{name: string; iconClass: boolean; title: string}]; onToolClick: ((node:any, name:any)=>any)}}
   */
  public treeConfig : any = {
    tools:[
      {name:"icon-plus", iconClass: true ,title:"添加"},
      {name:"icon-edit", iconClass: true ,title:"编辑"},
      {name:"icon-bin", iconClass: true ,title:"删除"},
    ],

    /**
     * 事件处理
     * @param node
     * @param name
     * @return {boolean}
     */
    onToolClick:(node:any, name:any)=>{

      if(name=="icon-plus"){

        name = prompt("请输入新部门名称", ""); //将输入的内容赋给变量 name ，
          //这里需要注意的是，prompt有两个参数，前面是提示的话，后面是当对话框出来后，在对话框里的默认值
          if (name)//如果返回的有内容
          {
            node.children = node.children || [];

            node.children.push({
              name:name,
              iconClass:true,
              isOpen:true
            });
          }

      } else if(name=="icon-edit"){
        name = prompt("请输入部门新名称", ""); //将输入的内容赋给变量 name ，
        //这里需要注意的是，prompt有两个参数，前面是提示的话，后面是当对话框出来后，在对话框里的默认值
        if (name)//如果返回的有内容
        {
          node.name = name;
        }

      } else {
        console.log("删除:");
        console.log(node);

      }
    }
  }

}
