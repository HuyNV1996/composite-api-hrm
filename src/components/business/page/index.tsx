import { Col } from 'antd';
import { css } from '@emotion/react';
import { ColumnsType } from 'antd/lib/table/interface';
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
import { useLocale } from '@/locales';
import { useStates } from '@/utils/use-states';
import MyAside, { MyAsideProps } from '../aside';
import MyRadioCards, { MyRadioCardssOption } from '../radio-cards';
import MySearch from '../search';
import SearchBar from '../search-bar';
import MyTabs, { MyTabsOption } from '../tabs';
import { Card } from 'antd';

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
  multipleSelection?: boolean;
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
  setSelectedRowData?: React.Dispatch<React.SetStateAction<any[]>>;
  forceClearSelection?: boolean;
}

export interface RefPageProps {
  setAsideCheckedKey: (key?: string) => void;
  load: (data?: object) => Promise<void>;
}

interface SelectedOptions {
  fieldNames: string[];
  inputValues: string[];
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
    multipleSelection,
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
    setSelectedRowData,
    forceClearSelection,
  } = props;
  const [pageData, setPageData] = useStates<PageData<ParseDataType<S>>>({
    pageSize: 10,
    pageNum: 1,
    total: 0,
    data: [],
  });
  const [loading, setLoading] = useState(false);
  const [asideCheckedKey, setAsideCheckedKey] = useState(asideValue);

  useEffect(() => {
    if (asideData) {
      setAsideCheckedKey(asideData[0].key);
    }
  }, [asideData]);
  const [paramsData, setparamsData] = useState<Record<string, any>>({});
  const getPageData = useCallback(
    async (params: Record<string, any> = {}) => {
      if (asideKey && !asideCheckedKey) return;
      if (pageApi) {
        setLoading(true);
        params = { ...paramsData };
        const obj = {
          ...params,
          ...pageParams,
          page_size: pageData.pageSize,
          page_number: pageData.pageNum,
          [asideKey!]: asideCheckedKey,
        };
        console.log(obj);

        const res = await pageApi(obj);
        console.log(res);

        if (res) {
          setPageData({ total: res.results.total, data: res.results.data });
          setDataExport && setDataExport(res.results.data);
          setLoading(false);
        }
      }
    },
    [
      // pageApi,
      pageParams,
      pageData.pageSize,
      pageData.pageNum,
      asideKey,
      asideCheckedKey,
      paramsData,
    ]
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (isMounted) {
        setSelectedRowKeys([]);
        setLoading(false);
      }
    }, 1000);
  }, [forceClearSelection, isMounted]);
  useEffect(() => {
    getPageData();
  }, [getPageData, forceUpdate]);

  const onSearch = (searchParams: Record<string, any>) => {
    setparamsData(searchParams);
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

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any
  ) => {
    setSelectedRowData && setSelectedRowData(selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  ////
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    fieldNames: [],
    inputValues: [],
  });
  const [results, setResults] = useState<any[]>([]);

  const handleSelectedOptions = (options: SelectedOptions) => {
    setSelectedOptions(options);
    console.log(selectedOptions);
  };

  const combinedUrl = selectedOptions.fieldNames
    .map((fieldName, index) => {
      const inputValue = selectedOptions.inputValues[index];
      return `${fieldName}_like=${inputValue}`;
    })
    .join('&');

  const fullUrl = `http://localhost:3000/employees?${combinedUrl}`;

  const fetchData = () => {
    fetch(fullUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setResults(json);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [selectedOptions]);
  useEffect(() => {
    console.log(results);
  }, [results]);

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
              {/* {searchRender} */}
              {/* <SearchBar
                onSelectedOptionsChange={handleSelectedOptions}
                tableOptions={tableOptions}
              /> */}
              {/* <MyTable
                loading={loading}
                rowKey={'id'}
                size="middle"
                height="100%"
                dataSource={results}
                columns={tableOptions}
                rowSelection={rowSelection}></MyTable> */}
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
                {multipleSelection ? (
                  <MyTable
                    loading={loading}
                    rowKey={'id'}
                    size="middle"
                    height="100%"
                    dataSource={loading ? [] : pageData.data}
                    columns={tableOptions}
                    rowSelection={rowSelection}
                    pagination={{
                      current: pageData.pageNum,
                      pageSize: pageData.pageSize,
                      total: pageData.total,
                      onChange: onPageChange,
                    }}>
                    {tableRender?.(pageData.data)}
                  </MyTable>
                ) : (
                  <MyTable
                    loading={loading}
                    rowKey={'id'}
                    size="middle"
                    height="100%"
                    dataSource={loading ? [] : pageData.data}
                    columns={tableOptions}
                    pagination={{
                      current: pageData.pageNum,
                      pageSize: pageData.pageSize,
                      total: pageData.total,
                      onChange: onPageChange,
                    }}>
                    {tableRender?.(pageData.data)}
                  </MyTable>
                )}
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
