/**
 * 登录请求参数
 */
export interface LoginData {
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password: string;
}

/**
 * 登录用户信息
 */
export interface UserInfo {
  /**
   * 用户名
   */
  name?: string;
  /**
   * 简介
   */
  introduction?: string;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 角色
   */
  roles: string[];
}
