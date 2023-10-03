import { css } from '@emotion/react';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table/interface';
import { MyResponse } from '@/api/request';
import MyTable from '@/components/core/table';
import { PageData } from '@/interface';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useStates } from '@/utils/use-states';
import MyAside, { MyAsideProps } from '../aside';
import MyRadioCards, { MyRadioCardssOption } from '../radio-cards';
import MySearch from '../search';
import MyTabs, { MyTabsOption } from '../tabs';
import { Button, Card, Drawer } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

interface SearchApi {
  (params?: any): MyResponse<PageData<any>>;
}

type ParseDataType<S> = S extends (
  params?: any
) => MyResponse<PageData<infer T>>
  ? T
  : S;

export type MyPageTableOptions<S> = ColumnsType<S>;
export interface PageProps<S> {
  searchRender?: React.ReactNode;
  pageApi?: any;
  pageParams?: object;
  tableOptions?: MyPageTableOptions<ParseDataType<S>>;
  tableRender?: (
    data: MyPageTableOptions<ParseDataType<S>>[]
  ) => React.ReactNode;
  asideData?: MyAsideProps['options'];
  asideKey?: string;
  asideValue?: string | number;
  radioCardsData?: MyRadioCardssOption[];
  radioCardsValue?: string | number;
  asideTreeItemRender?: MyAsideProps['titleRender'];
  tabsData?: MyTabsOption[];
  tabsValue?: string | number;
  slot?: React.ReactNode;
  title?: string;
  forceUpdate?: boolean;
  setDataExport?: React.Dispatch<React.SetStateAction<never[]>>;
  labelWidth?: number;
}

export interface RefPageProps {
  setAsideCheckedKey: (key?: string) => void;
  load: (data?: object) => Promise<void>;
}

const BasePage = <S extends SearchApi>(
  props: PageProps<S>,
  ref: React.Ref<RefPageProps>
) => {
  const {
    pageApi,
    pageParams,
    searchRender,
    slot,
    title,
    tableOptions,
    tableRender,
    asideKey,
    asideData,
    asideValue,
    asideTreeItemRender,
    radioCardsData,
    radioCardsValue,
    tabsData,
    tabsValue,
    forceUpdate,
    setDataExport,
    labelWidth,
  } = props;
  const [pageData, setPageData] = useStates<PageData<ParseDataType<S>>>({
    pageSize: 20,
    pageNum: 1,
    total: 0,
    data: [],
    sort:'',
    sortOrder:'desc'
  });
  const [loading, setLoading] = useState(false);
  const [paramsData, setparamsData] = useState<Record<string, any>>({});
  const [asideCheckedKey, setAsideCheckedKey] = useState(asideValue);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false)
  useEffect(() => {
    if (asideData) {
      setAsideCheckedKey(asideData[0].key);
    }
  }, [asideData]);
 const getPageData = useCallback(
    async (params: Record<string, any> = {}) => {
      if (asideKey && !asideCheckedKey) return;
      if (pageApi) {
        params = { ...paramsData }
        setLoading(true);
        const obj = {
          ...params,
          ...pageParams,
          pageSize: pageData.pageSize,
          pageNumber: pageData.pageNum,
          maxResultCount: pageData.pageSize,
          skipCount: pageData.pageNum,
          sort: pageData.sort,
          sortOrder: pageData.sortOrder,
          [asideKey!]: asideCheckedKey,
        };
        const res = await pageApi(obj);

        if (res) {
          setPageData({ total: res.results.total, data: res.results.data });
          setDataExport && setDataExport(res.results.data);
          setLoading(false);
        }
      }
    },
    [
      pageApi,
      pageParams,
      pageData.pageSize,
      pageData.pageNum,
      pageData.sortOrder,
      pageData.sort,
      asideKey,
      asideCheckedKey,
      paramsData
    ]
  );
  const onCloseFilter = () => {
    setShowFilterDrawer(false);
  }
  useEffect(() => {
    getPageData();
  }, [getPageData, forceUpdate]);

  const onSearch = (searchParams: Record<string, any>) => {
    // getPageData(searchParams);
    setparamsData(searchParams)
  };

  const onSelectAsideTree: MyAsideProps['onSelect'] = ([key]) => {
    setAsideCheckedKey(key);
  };

  const onPageChange = (pageNum: number, pageSize?: number) => {
    setPageData({ pageNum });
    if (pageSize) {
      setPageData({ pageSize });
    }
  };

  useImperativeHandle(ref, () => ({
    setAsideCheckedKey,
    load: (data?: object) => getPageData(data),
  }));
  const handleTableChange = (pagination: any, _ :any,sorter:any) => {
    // console.log(sorter)
    setPageData({
      sort: sorter.columnKey,
      sortOrder: sorter.order
    })
  };
  return (
    <div css={styles}>
      {tabsData && (
        <MyTabs
          className="tabs"
          options={tabsData}
          defaultValue={tabsData[0].value || tabsValue}
        />
      )}
      <div className="tabs-main">
        {asideData && (
          <MyAside
            options={asideData}
            selectedKeys={asideCheckedKey ? [asideCheckedKey] : undefined}
            titleRender={asideTreeItemRender}
            onSelect={onSelectAsideTree}
          />
        )}
        <div className="aside-main">
          {searchRender && (
            <Card size="small" style={{ marginBottom: 16 }}>
                <MySearch
                loading={loading}
                open ={showFilterDrawer}
                onClose={onCloseFilter}
                className="search"
                onSearch={onSearch}
                labelCol={{ style: { width: labelWidth } }}
                labelAlign="right">
                {searchRender}
              </MySearch>
            </Card>
          )}
          {radioCardsData && (
            <MyRadioCards
              options={radioCardsData}
              defaultValue={radioCardsValue || radioCardsData[0].value}
            />
          )}
          {tableOptions && (
            <div className="table">
              <Card size="small" title={title} extra={slot}>
                <MyTable
                  loading={loading}
                  rowKey={'id'}
                  size="middle"
                  height="100%"
                  dataSource={pageData.data}
                  columns={tableOptions}
                  onChange={handleTableChange}
                  pagination={{
                    current: pageData.pageNum,
                    pageSize: pageData.pageSize,
                    total: pageData.total,
                    onChange: onPageChange,
                  }}>
                  {tableRender?.(pageData.data)}
                </MyTable>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BasePageRef = forwardRef(BasePage) as <S extends SearchApi>(
  props: PageProps<S> & { ref?: React.Ref<RefPageProps> }
) => React.ReactElement;

type BasePageType = typeof BasePageRef;

interface MyPageType extends BasePageType {
  MySearch: typeof MySearch;
  MyTable: typeof MyTable;
  MyAside: typeof MyAside;
}

const MyPage = BasePageRef as MyPageType;

MyPage.MySearch = MySearch;
MyPage.MyTable = MyTable;
MyPage.MyAside = MyAside;

export default MyPage;

const styles = css`
  display: flex;
  flex-direction: column;
  .tabs-main {
    flex: 1;
    display: flex;
    /* overflow: hidden; */
  }
  .search {
    margin-bottom: 10px;
  }

  .aside-main {
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
  }

  .table {
    flex: 1;
    overflow: hidden;
  }
`;
