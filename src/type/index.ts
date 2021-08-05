// 菜单
export interface Menu {
  _id: string,
  user_id: string,
  _v: number,
  updatedTime: string,
  createdTime: string,
  name: string,
  priority: number
}
// 菜单列表
export interface MenusData {
  menus: Menu[]
}