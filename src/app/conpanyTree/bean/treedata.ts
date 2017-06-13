/**
 * 树类
 */
export interface TreeData{
  [key:string]: any;

  /**
   * tree node name
   */
  name?:string;

  /**
   * collapse or not(node has subtree)
   */
  isOpen?:boolean;

  /**
   * a class selector add to icon element, false to disable node icon
   */
  iconClass?:string|boolean;

  /**
   * a class selector add to name element
   */
  nameClass?:string;

  /**
   * sub tree data
   */
  children?:TreeData[];

  /**
   * is checked
   */
  isChecked?:boolean;

  /**
   *
   */
  tools?: {name:string, title?:string}[];
}
