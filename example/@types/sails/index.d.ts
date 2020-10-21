// eslint-disable-next-line max-classes-per-file
import * as typeorm from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare module Sails {
  /**
   * action传给给view的数据对象
   */
  export interface Locals {
    [name: string]: any;
    /**
     * 模板页，如果不指定，将会按照config的设置使用默认的layout，如果不需要layout，可以传递空字符串''。
     */
    layout?: string;
  }

  /**
   * 请求对象
   */
  export interface Request {
    /**
     * Sails开始处理该请求的时刻
     */
    _startTime: Date;
    /**
     * 一个对象，包含来自已解析请求主体的文本参数，默认为{}。
     *
     * 默认情况下，请求主体可以进行URL编码或字符串化为JSON。 使用中间件配置可以支持其他格式，例如序列化XML。
     */
    body: any;
    /**
     * 此请求中所有未签名cookie的对象
     */
    cookies: any;
    /**
     * A flag indicating that the user-agent sending this request (req) wants "fresh" data
     */
    fresh: boolean;
    /**
     * 包含当前请求中预定义/自定义标头的对象。
     */
    headers: any;
    /**
     * 返回主机HTTP标头中提供的主机名。 该头可以由客户端或代理设置。
     *
     * **Example:** 如果此请求的“主机”是“ ww3.staging.ibm.com:1492”
     *              返回结果是 ww3.staging.ibm.com
     */
    hostname: string;
    /**
     * 发送此请求的客户端的IP地址
     *
     * **Note:** 如果您的Sails应用程序部署在代理后面（例如，在Nginx上），则需要做一些额外的配置。
     * 通常，req.ip只是“远程地址”，即发出请求的用户代理的IP地址。
     * 但是，如果启用sails.config.http.trustProxy选项，则这是“上游地址”。
     */
    ip: string;
    /**
     * 如果启用sails.config.http.trustProxy，则此变量包含此请求的“ X-Forwarded-For”标头中的IP地址，作为IP地址字符串的数组。
     * 否则，将返回一个空数组。
     */
    ips: string[];
    /**
     * 一个标志，指示此请求（req）是否源自Socket.io连接。
     */
    isSocket: boolean;
    /**
     * 请求方法, GET POST PUT DELETE
     */
    method: string;
    /**
     * 应用程序操作中可用的与请求无关的设置的字典（纯JavaScript对象）。
     *
     * req.options的目的是允许操作代码访问其配置的路由选项（如果有）。
     * （简单地说，“路线选项”只是路线目标中提供的所有其他属性。）
     */
    options: any;
    /**
     * 这个属性很像req.url; 但是，它保留了原始请求URL，从而允许您自由重写req.url以进行内部路由。
     * 在修改req.url的极少数情况下（例如，在策略或中间件内部以便重定向到内部路由），req.originalUrl将为您提供最初请求的URL。
     *
     * **Example:** 如果此请求的链接是 “http://127.0.0.1:1337/home/index?id=3”
     *              返回结果是 /home/index?id=3
     */
    originalUrl: string;
    /**
     * 包含从URL路径解析的参数值的对象。
     *
     * 例如，如果您具有路由/user/:name，则URL路径中的“name”将作为req.params.name可用。 该对象默认为{}。
     */
    params: any;
    /**
     * 当前请求（req）的请求URL字符串中的URL路径名。
     * 请注意，这是URL的一部分，其后包括反斜杠（例如/foo/bar）
     * 但没有查询字符串（例如?name=foo）或片段（例如#foobar）。
     *
     * **Example:** 如果此请求的链接是 “http://localhost:1337/donor/37?name=foo#foobar”
     *              返回结果是 /donor/37
     *
     */
    path: string;
    /**
     * 用于发送此请求（req）的协议。 http 或者 https
     */
    protocol: string;
    /**
     * 包含已解析的查询字符串的字典，默认为{}。
     *
     * **Example:** GET /search?q=mudslide
     *              返回结果是 { q: "mudslide" }
     *
     */
    query: any;
    /**
     * 指示是否通过安全的TLS连接（即https：//或wss：//）发送请求。
     */
    secure: boolean;
    /**
     * 一种包含来自请求对象的所有已签名的cookie的字典，其中已签名的cookie是受客户端保护而不能修改的cookie。
     * 此保护由Cookie值的Base64编码的HMAC提供。
     * 检索cookie时，如果HMAC签名基于cookie的值不匹配，则cookie不能作为req.signedCookies对象的成员使用。
     */
    signedCookies: any;
    /**
     * 如果当前请求（req）源自连接的Socket.IO客户端，则req.socket引用原始Socket.IO套接字实例。
     */
    socket: any;
    /**
     * 此请求的URL中所有子域的数组。
     *
     * **Example:** "https://ww3.staging.ibm.com"
     *              -> ['ww3', 'staging']
     */
    subdomains: string[];
    /**
     * 与req.path类似，但它还包含查询字符串后缀。
     *
     * **Example:** 如果此请求的链接是 “http://localhost:1337/donor/37?name=foo#foobar”
     *              -> /donor/37?name=foo#foobar
     */
    url: string;
    /**
     * 一个标志，指示发出请求的客户端是否希望使用JSON响应（与XML或HTML等其他格式相对）。
     *
     * req.wantsJSON检查请求的“ Content-type”，“ Accepts”和“ X-Requested-With”标头，以确定请求是否需要JSON响应。
     * 如果这些标头中的信息太少，则Sails会在JSON一侧出错，并且req.wantsJSON将设置为true。
     */
    wantsJSON: boolean;
    /**
     * 一个标志，指示当前请求（req）是否显示为AJAX请求（即，其“ X-Requested-With”标头设置为“ XMLHttpRequest”时发出）。
     */
    xhr: boolean;
    /**
     * 返回此请求（req）是否是它可以处理的指定的媒体类型。
     *
     * 如果没有一种媒体类型被认为是可接受的，则返回false。 否则，它返回true（媒体类型）。
     *
     * @param str 媒体类型
     * @returns 是否可用处理的类型，不能则是false，可以则是具体的媒体类型
     */
    accepts(str: string): boolean | string;
    /**
     * 返回此请求（req）是否是它能够处理任何指定的字符集，如果可以，则返回哪个字符集。
     *
     * 如果传入此方法的多个字符集被认为可以接受，则将返回第一个字符集。 如果没有字符集被认为是可接受的，则返回false。
     * @param charsets 字符集 eg: utf-8
     * @returns 是否可用处理的字符集，不能则是false，可以则是具体的字符集
     */
    acceptsCharsets(...charsets: string[]): boolean | string;
    /**
     * 返回此请求（req）是否宣告它可以理解任何一种指定的语言，如果可以，则返回哪种语言。
     *
     * 如果传入此方法的多种语言被认为可以接受，则将返回第一种。 如果没有一种语言被认为可以接受，则返回false。
     * （语言，我们指的是自然语言，例如英语或日语，而不是编程语言。）
     */
    acceptsLanguages(...languages: string[]): boolean | string;
    /**
     * 返回请求中发送的所有参数的值，并合并到一个字典中（纯JavaScript对象）。
     * 包括从URL路径，请求正文和查询字符串按此顺序解析的参数。 有关详细信息，请参见req.param()。
     */
    allParams(): any;
    /**
     * 构建并返回一个Skipper Upstream，代表从指定字段上传的传入分段文件。
     * @param field file的字段
     */
    file(field: string): any;
    /**
     * 返回此请求（req）中指定标头字段的值。 请注意，标头名称不区分大小写。
     * @param header
     */
    get(header: string): string;
    /**
     * 如果此请求的声明的“ Content-Type”与指定的媒体/ MIME类型匹配，则返回true。
     *
     * 具体来说，此方法将给定类型与此请求的“ Content-Type”标头进行匹配。
     */
    is(contentType: string): boolean;
    /**
     * 返回具有指定名称的参数的值。理论上如果使用json方式，那么返回值可能是任意类型，但是为了方便编码指定为string为返回类型，
     * 如果是别的类型，使用as number等方式处理。
     *
     * **Details** req.param() 在请求的URL路径，正文和查询字符串中（按此顺序）搜索指定的参数。
     *                         如果请求中具有给定名称的任何地方都不存在参数值，则它返回undefined或可选的defaultValue（如果已指定）。
     *
     * @param name
     * @param defaultValue 默认值，如果没有取到值的情况
     */
    param(name: string, defaultValue?: string): string;
    /**
     * 对此请求覆盖推断的语言环境。
     * 通常，根据传入请求标头（即用户的浏览器或设备语言设置）在每个请求的基础上确定区域设置。 该命令将覆盖特定请求的设置。
     */
    setLocale(): void;
    /**
     * 如果未在指定的毫秒数内发送响应，则使该请求超时。
     * @param numMilliseconds
     */
    setTimeout(numMilliseconds: number): void;
    /**
     * 设置或读取session
     */
    session: any;
  }

  /**
   * 返回对象
   */
  export interface Response {
    /**
     * 向Web浏览器或其他用户代理指示在此响应中发送的传出文件下载应为“另存为...”而不是“已打开”，并可以选择为磁盘上新下载的文件指定名称。
     * 具体来说，这会将当前响应的“ Content-Disposition”标头设置为“ attachment”。
     * 如果提供了文件名，则将根据文件的扩展名（例如.jpg或.html）自动设置“ Content-Type”，
     * 并将“ Content-Disposition”标头设置为“ filename = filename” 。
     * @param fileName
     */
    attachment(fileName?: string): Response;
    /**
     * 此方法用于将400（“错误请求”）响应向下发送回客户端，指示该请求无效。
     * 这通常意味着该请求包含无效的参数或标头，或者它试图执行您的应用逻辑不支持的操作。
     * @param data
     */
    badRequest(data?: any): Response;
    /**
     * 清除响应中的cookie(name)。
     */
    clearCookie(name: string, options?: any): Response;
    /**
     * 设置一个具有name和value的cookie，与响应一起发送。
     * @param name
     * @param value
     * @param options
     */
    cookie(name: string, value: string, options?: Object): Response;
    /**
     * 此方法用于将403 ("Forbidden") 响应向下发送回客户端，指示不允许请求。
     * 这通常意味着用户代理尝试执行不允许执行的操作，例如更改另一个用户的密码。
     */
    forbidden(): Response;
    /**
     * 返回指定响应头（header）的当前值。
     */
    get(header: string): string;
    /**
     * 发送由指定数据组成的JSON响应。
     */
    json(data: Object): Response;
    /**
     * 发送JSON或JSONP响应。
     * 与res.json（）相同，不同之处在于，如果在查询字符串中提供了名为“ callback”的请求参数，
     * 则Sails将以JSONP而不是JSON的形式发送响应数据。 请求参数“ callback”的值将用作响应中JSONP函数调用包装的名称。
     * @param data
     */
    jsonp(data: Object): Response;
    /**
     * 将“位置”响应标头设置为指定的URL表达式（url）。
     */
    location(url: string): Response;
    /**
     * 此方法用于使用res.json（）或res.view（）发送404（“未找到”）响应。
     * 当Sails收到与其任何明确路线或路线蓝图不匹配的请求时（即为404页提供服务），系统会自动调用该方法。
     */
    notFound(): Response;
    /**
     * 此方法用于将200（“确定”）响应发送回客户端。
     */
    ok(data: Object): Response;
    /**
     * 重定向到url
     * @param statusCode 返回状态码
     * @param url 需要重定向的url
     */
    redirect(statusCode: number, url: string): Response;
    /**
     * 重定向到url statusCode 默认是 302
     * @param url 需要重定向的url
     */
    redirect(url: string): Response;
    /**
     * 返回一段字符串到客户端
     * @param str
     */
    send(str?: string): Response;
    /**
     * 此方法用于将500（“服务器错误”）响应向下发送回客户端，表明发生了某种服务器错误（即，该错误不是发出请求的用户代理的错误）。
     * @param err
     */
    serverError(err?: Error): Response;
    /**
     * 将指定的响应标头（header）设置为指定值（value）。
     * @param header
     * @param value
     */
    set(header: string, value: string): Response;
    /**
     * 将指定的响应标头（header）设置为指定值（value）。
     * @param headers
     */
    set(headers: Object): Response;
    /**
     * 设置此响应的状态码。
     * @param statusCode 状态码
     */
    status(statusCode: number): Response;
    /**
     * 将“ Content-Type”响应标头设置为指定的类型。
     * @param type Content-Type
     */
    type(type: string): Response;
    /**
     * 返回一个html页面
     * @param pathToView ejs view的路径
     * @param locals 需要传递到ejs的参数
     */
    view(pathToView: string, locals: Locals): Response;
    /**
     * 返回一个html页面
     * @param pathToView  ejs view的路径
     */
    view(pathToView: string): Response;
    /**
     * 返回一个html页面
     * @param locals 需要传递到ejs的参数
     */
    view(locals: Locals): Response;
    /**
     * 返回一个html页面，将默认返回与当前controller以及action对应名称的ejs
     */
    view(): Response;
  }

  /**
   * 日志输出
   */
  export interface Logger {
    /**
     * 输出silly级别的日志
     * @param message 需要出示的内容
     */
    silly(...message: any): void;
    /**
     * 输出verbose级别的日志
     * @param message 需要输出的内容
     */
    verbose(...message: any): void;
    /**
     * 输出info级别的日志
     * @param message 需要输出的内容
     */
    info(...message: any): void;
    /**
     * 输出debug级别的日志
     * @param message 需要输出的内容
     */
    debug(...message: any): void;
    /**
     * 输出warn级别的日志
     * @param message 需要输出的内容
     */
    warn(...message: any): void;
    /**
     * 输出error级别的日志
     * @param message 需要输出的内容
     */
    error(...message: any): void;
  }

  export class WaterlineConnection {}

  /**
   * 访问数据库的Datastore
   */
  export interface Datastore {
    sendNativeQuery(
      sql: string,
      valuesToEscape?: Object[]
    ): WaterlinePromise<{ rows: Object[] }>;
    transaction(
      during: (db: WaterlineConnection) => any
    ): WaterlinePromise<any>;
  }

  export interface Application {
    /**
     * 返回所有的actions
     */
    getActions(): Object;
    /**
     * 查找指向指定目标（例如MeController.login）的第一条路线，并返回包含其方法和URL的字典。
     * @param target e.g. MeController.login
     */
    getRouteFor(target: string): Object;
    /**
     * 启动sails服务
     * @param configOverrides 配置字典，它将覆盖配置文件中存在的所有冲突选项。 如果提供，它将合并在sails.config之上。
     * @param cb 回调函数
     */
    lift(configOverrides: Object, cb?: (err: Error) => void): void;
    /**
     * 启动sails服务
     * @param cb 回调函数
     */
    lift(cb?: (err: Error) => void): void;
    /**
     * 将Sails应用程序加载到内存中，但不开启HTTP服务器。
     * @param configOverrides 配置字典，它将覆盖配置文件中存在的所有冲突选项。 如果提供，它将合并在sails.config之上。
     * @param cb 回调函数
     */
    load(configOverrides: Object, cb?: (err: Error) => void): void;
    /**
     * 将Sails应用程序加载到内存中，但不开启HTTP服务器。
     * @param cb 回调函数
     */
    load(cb?: (err: Error) => void): void;
    /**
     * 关闭开启的Sails应用程序，并使其停止监听或响应任何将来的请求。
     * @param cb 回调
     */
    lower(cb?: (err: Error) => void): void;
    /**
     * 注册一个新的action，然后将其绑定到router
     * @param action Either a classic action (aka (req, res)) function or an actions2 definition.
     * @param name The identifier for the action. This is the string that will be
     * used to reference the action elsewhere in an app, for instance when binding
     * the action to a route.
     */
    registerAction(action: any, name: string): void;

    /**
     * 获取所有的配置信息
     */
    config: any;

    /**
     * If specified, this is the name of the datastore to look up. Otherwise,
     * if you leave this blank,this getDatastore() will return the default datastore for your app.
     * @param datastoreName
     */
    getDatastore(datastoreName?: string): Datastore;

    /**
     * 查找指向指定目标的第一条路线（例如，入口/视图登录），然后返回其网址。
     * @param target The route target string; e.g. entrance/view-login or PageController.login
     */
    getUrlFor(target: string): string;

    log: Logger;

    /**
     * Typeorm的数据库连接
     */
    connection: typeorm.Connection;
    /**
     * 保存在数据库中的永久配置
     */
    settings: any;
  }

  export interface Model {
    attributes: Object;

    create(params: Object): WaterlinePromise<QueryResult>;
    create(params: Array<Object>): WaterlinePromise<QueryResult>;
    create(
      params: Object,
      cb: (err: Error, created: QueryResult) => void
    ): void;
    create(
      params: Array<Object>,
      cb: (err: Error, created: Array<QueryResult>) => void
    ): void;

    find(): QueryBuilder;
    find(params: Object): QueryBuilder;
    find(params: Object): WaterlinePromise<Array<QueryResult>>;

    findOne(criteria: Object): WaterlinePromise<QueryResult>;

    count(criteria: Object): WaterlinePromise<number>;
    count(criteria: Array<Object>): WaterlinePromise<number>;
    count(criteria: string): WaterlinePromise<number>;
    count(criteria: number): WaterlinePromise<number>;

    count(criteria: Object, cb: (err: Error, found: number) => void);
    count(criteria: Array<Object>, cb: (err: Error, found: number) => void);
    count(criteria: string, cb: (err: Error, found: number) => void);
    count(criteria: number, cb: (err: Error, found: number) => void);

    destroy(criteria: Object): WaterlinePromise<Array<Record>>;
    destroy(criteria: Array<Object>): WaterlinePromise<Array<Record>>;
    destroy(criteria: string): WaterlinePromise<Array<Record>>;
    destroy(criteria: number): WaterlinePromise<Array<Record>>;

    destroy(
      criteria: Object,
      cb: (err: Error, deleted: Array<Record>) => void
    ): void;
    destroy(
      criteria: Array<Object>,
      cb: (err: Error, deleted: Array<Record>) => void
    ): void;
    destroy(
      criteria: string,
      cb: (err: Error, deleted: Array<Record>) => void
    ): void;
    destroy(
      criteria: number,
      cb: (err: Error, deleted: Array<Record>) => void
    ): void;

    update(
      criteria: Object,
      changes: Object
    ): WaterlinePromise<Array<QueryResult>>;
    update(
      criteria: Array<Object>,
      changes: Object
    ): WaterlinePromise<Array<QueryResult>>;
    update(
      criteria: string,
      changes: Object
    ): WaterlinePromise<Array<QueryResult>>;
    update(
      criteria: number,
      changes: Object
    ): WaterlinePromise<Array<QueryResult>>;

    update(
      criteria: Object,
      changes: Array<Object>
    ): WaterlinePromise<Array<QueryResult>>;
    update(
      criteria: Array<Object>,
      changes: Array<Object>
    ): WaterlinePromise<Array<QueryResult>>;
    update(
      criteria: string,
      changes: Array<Object>
    ): WaterlinePromise<Array<QueryResult>>;
    update(
      criteria: number,
      changes: Array<Object>
    ): WaterlinePromise<Array<QueryResult>>;

    update(
      criteria: Object,
      changes: Array<Object>,
      cb: (err: Error, updated: Array<QueryResult>) => void
    ): void;
    update(
      criteria: Array<Object>,
      changes: Array<Object>,
      cb: (err: Error, updated: Array<QueryResult>) => void
    ): void;
    update(
      criteria: string,
      changes: Array<Object>,
      cb: (err: Error, updated: Array<QueryResult>) => void
    ): void;
    update(
      criteria: number,
      changes: Array<Object>,
      cb: (err: Error, updated: Array<QueryResult>) => void
    ): void;

    query(sqlQuery: string, cb: (err: Error, results: Array<Record>) => void);
    native(cb: (err: Error, collection: Model) => void);

    stream(criteria: Object, writeEnd: Object): NodeJS.WritableStream;
    stream(criteria: Array<Object>, writeEnd: Object): NodeJS.WritableStream;
    stream(criteria: string, writeEnd: Object): NodeJS.WritableStream;
    stream(criteria: number, writeEnd: Object): NodeJS.WritableStream;

    stream(criteria: Object, writeEnd: Object): Error;
    stream(criteria: Array<Object>, writeEnd: Object): Error;
    stream(criteria: string, writeEnd: Object): Error;
    stream(criteria: number, writeEnd: Object): Error;
  }

  export class WaterlinePromise<T> extends Promise<T> {
    exec(cb: (err: Error, results: Array<QueryResult>) => void);
    exec(cb: (err: Error, result: QueryResult) => void);
    usingConnection(db: WaterlineConnection): WaterlinePromise<T>;
  }

  export class Record {
    id: number;

    createdAt: Date;

    updatedAt: Date;
  }

  export class QueryResult extends Record {
    destroy(): Promise<Array<Sails.QueryResult>>;
    toJSON(): Object;
  }

  export class QueryBuilder extends Promise<any> {
    exec(cb: (error: any, results: Array<QueryResult>) => void);

    where(condition: Object): QueryBuilder;
    limit(lim: number): QueryBuilder;
    skip(num: number): QueryBuilder;
    sort(criteria: string): QueryBuilder;
    populate(association: string): QueryBuilder;
    populate(association: string, filter: Object): QueryBuilder;
  }

  export interface Controller {}
}

export = Sails;
