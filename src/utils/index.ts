/**
 * 枚举值转下拉框数组
 * @param valueEnum 如下
 *  const SUPPLY_TYPE_MAP: Record<SupplyType, string> = {
 *   [SupplyType.OnSale]: '在售',
 *   [SupplyType.ReplenishIng]: '补货中',
 * }
 * @returns
 */
export const enumMap2arr4Select = (
  valueEnum: any[] | Record<string, any>
): { label: string; value: string | number }[] => {
  const values = Array.isArray(valueEnum) ? valueEnum : Object.entries(valueEnum);
  const re: any[] = [];
  values.forEach(([k, v]) => {
    re.push({
      label: v,
      value: isNaN(k) ? k : Number(k),
    });
  });
  return re;
};
