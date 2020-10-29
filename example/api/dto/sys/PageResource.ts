/**
 * 页面资源类，主要用来展示后台的菜单列表,分配资源的展示页面
 * Created at 2020-10-27 17:25
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */

import _ from 'lodash';
import Resource from '../../entities/sys/Resource';

export default class PageResource extends Resource {
  children?: Array<PageResource>;

  title?: string;

  checked?: boolean;
}
