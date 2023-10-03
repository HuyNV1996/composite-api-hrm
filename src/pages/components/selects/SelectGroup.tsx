import MyForm from '@/components/core/form';
import { loaiCuaHangOptions } from '@/const/options';
import { apiGeListCampaign } from '@/api/campaigns/api';
import { useEffect, useState } from 'react';
import { apiGeListRooms } from '@/api/rooms/api';
const SelectGroup = ({ ...props }) => {
  const [listRoom, setListRoom] = useState([{ label: '', value: '' }]);
  const _apiGeListRooms= async () => {
    try {
      const res = (await apiGeListRooms({
        pageNumber: 1,
        pageSize: 1000,
      })) as any;
      const names: string[] = res.results.data.map(
        (item: { name: string }) => item.name
      );
      const ids: string[] = res.results.data.map(
        (item: { groupId: string }) => item.groupId
      );

      const objectNames = names.map((name, index) => ({
        label: name,
        value: ids[index],
      }));

      setListRoom(objectNames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    _apiGeListRooms();
  }, []);
  return (
    <>
      <MyForm.Item
        innerProps={{
          placeholder: 'Vui lòng chọn',
        }}
        options={listRoom}
        label="Nhóm"
        {...props}
        name="groupId"
        type="select"
      />
    </>
  );
};

export default SelectGroup;
