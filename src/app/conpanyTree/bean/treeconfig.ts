/**
 * 配置类
 */
export interface TreeConfig {
  /**
   * execute before treenode collapse or uncollapse
   * @param node
   */
  onFold? : (node?:any) => boolean;

  /**
   * trigger on icon or name click
   * @param node
   */
  onClick? : (node?:any) => void;

  /**
   * trigger on tool button click
   * @param node
   * @param toolName
   */
  onToolClick? : (node?:any, toolName?:string) => void;

  /**
   * TODO
   */
  /*onDrop? : (sourceNode?:any, targetNode?:any) => boolean;

   searchText?:string;*/

  /**
   * format customized data to TreeData. effect on tree init
   * @param nodeData
   */
  dataFilter?: (nodeData?:any) => any;

  /**
   *
   */
  tools?: {name:string, title?:string}[];

  /**
   *
   */
  enableTools?: boolean;

  /**
   * format customized data to TreeData
   */
  dataMap? : {
    /**
     * default to "name"
     */
    name?:string;

    /**
     * deafult to 'isOpen'
     */
    isOpen?:string;

    /**
     * default to "iconClass"
     */
    iconClass?:string;

    /**
     * default to "nameClass"
     */
    nameClass?:string;

    /**
     * default to "children"
     */
    children?:string;

    /**
     * default to "isChecked"
     */
    isChecked?:string;

    /**
     * default to "tools"
     */
    tools?: string;

    /**
     * default to "enableTools"
     */
    enableTools? : string;
  }
}
