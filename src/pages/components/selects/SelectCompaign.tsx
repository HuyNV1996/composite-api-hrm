import MyForm from '@/components/core/form';
import { loaiCuaHangOptions } from '@/const/options';
import { apiGeListCampaign } from '@/api/campaigns/api';
import { useEffect, useState } from 'react';
const SelectCompaign = ({ ...props }) => {
  const [listCamp, setListCamp] = useState([{ label: '', value: '' }]);
  const _apiGeListCampaign = async () => {
    try {
      const res = (await apiGeListCampaign({
        pageNumber: 1,
        pageSize: 1000,
      })) as any;
      const names: string[] = res.results.data.map(
        (item: { name: string }) => item.name
      );
      const ids: string[] = res.results.data.map(
        (item: { id: string }) => item.id
      );

      const objectNames = names.map((name, index) => ({
        label: name,
        value: ids[index],
      }));

      console.log(objectNames);

      setListCamp(objectNames);
      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    _apiGeListCampaign();
  }, []);
  return (
    <>
      <MyForm.Item
        innerProps={{
          placeholder: 'Vui lòng chọn',
        }}
        options={listCamp}
        label="Tên chiến dịch"
        {...props}
        name="id_campaign"
        type="select"
      />
    </>
  );
};

export default SelectCompaign;
