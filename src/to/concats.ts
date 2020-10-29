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
  /**
   * 是否是唯一约束
   */
  unique?: boolean;
  /**
   * 外键
   */
  foreignKey?: Enteity;
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
  /**
   * 变量名，一般是name按照camelCase方式生成
   */
  varName?: string;
  /**
   * 联合约束
   */
  compositeUnique?: Array<string>;
  /**
   * 是否包含外键字段，主要影响import的生成
   */
  hasManyToOne?: boolean;
  /**
   * 是否包含非外键字段，主要影响import的生成
   */
  hasColumn?: boolean;
}
