/**
 * 页面资源类，主要用来展示后台的菜单列表
 * Created at 2020-10-27 17:25
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */

import _ from 'lodash';
import Resource from '../../entities/sys/Resource';

export default class PageResource extends Resource {
  subResources?: Array<PageResource>;

  static getParent(pageResources: Array<PageResource>, parentId: string): PageResource | undefined {
    for (const res of pageResources) {
      if (res.id === parentId) {
        return res;
      }
      if (res.subResources) {
        return this.getParent(res.subResources, parentId);
      }
    }
    return undefined;
  }

  /**
   * 将所有的资源按照父子关系排列
   * @param resources 资源列表
   */
  static process(resources: Array<Resource>,
    pageResources: Array<PageResource>): Array<PageResource> {
    const tmp: Array<Resource> = [];
    for (const resource of resources) {
      if (resource.parentId) {
        // const parent = _.find(pageResources, resource.parentId);
        const parent = this.getParent(pageResources, resource.parentId);
        if (parent) {
          if (!parent.subResources) {
            parent.subResources = [];
          }
          parent.subResources.push(resource);
          tmp.push(resource);
        }
      } else {
        pageResources.push(resource);
        tmp.push(resource);
      }
    }
    const x = _.difference(resources, tmp);
    if (x.length > 0) {
      return this.process(x, pageResources);
    }
    return pageResources;
  }
}
