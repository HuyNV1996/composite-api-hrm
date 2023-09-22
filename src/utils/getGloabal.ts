export function getGlobalState() {
  const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'MOBILE' : 'DESKTOP';
  const collapsed = device !== 'DESKTOP';
  const isShowInfoDrawer = device !== 'DESKTOP';
  const fromToWeeklyDate = '';
  return {
    device,
    collapsed,
    isShowInfoDrawer,
    fromToWeeklyDate,
  } as const;
}
