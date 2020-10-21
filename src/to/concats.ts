/**
 * 实体的列
 */
export interface Column {
  /**
   * 生成实体的字段名
   */
  entityName: string;
  /**
   * 真实的数据库字段名
   */
  name: string;
  dataType: string;
  /**
   * ts的数据类型
   */
  varType?: string;
  type: string;
  comment: string;
  nullable: boolean;
  length?: number;
  width?: number;
  default?: any;
}

export interface Enteity {
  columns: Column[];
  /**
   * 真实的数据库表名
   */
  tableName: string;
  /**
   * 生成的实体名称
   */
  name: string;
  /**
   * 模块的名称，一般为表的前缀
   */
  moduleName?: string;
}
