import { Injectable } from '@angular/core';
import { TreeData} from './bean/treedata';
import { TreeDatas } from './data'

@Injectable()
export class ConpanyTreeService {
  getTreeDatas(): Promise<TreeData[]> {
    return Promise.resolve(TreeDatas);
  }
}
