import React from "react";
import TableModule from "@/components/table";
import SearchModule from "@/components/search";
import ButtomModule from "@/components/buttonModule";
import tableOption from "./indexTable";
import * as APITEST from "@/apis/test";
const defaultParams = {
  page: 1,
  number: 12
};
const TableIndex: React.FC<{}> = props => {
  // 列表数据
  let [dataList, setDataList] = React.useState<object[]>([]);
  // 列表分页数据
  let [pagination, setPagination] = React.useState<objectKey>({});
  // 列表loading
  let [tableLoading, setTablLoading] = React.useState<boolean>(false);
  // 列表筛选条件
  let [params, setParams] = React.useState<objectKey>(defaultParams);
  // 筛选条件列表
  let [searchList] = React.useState<object[]>(tableOption.searchList);
  React.useEffect(() => {
    // 获取列表数据
    getList();
  }, []);
  // 获取列表数据
  const getList = async (resetParam?: objectKey | undefined) => {
    setTablLoading(true);
    let _params = JSON.parse(JSON.stringify(resetParam || params));
    let data: any = await APITEST.list(_params).catch(() => {
      setTablLoading(false);
    });
    if (!data) return;
    // 设置列表数据
    setDataList(data.list || []);
    // 设置分页数据
    setPagination({
      total: data.total_count,
      defaultCurrent: params.page,
      pageSize: params.number,
      onChange: onPageChange
    });
    setTablLoading(false);
  };
  // 分页改变
  const onPageChange = (page: number) => {
    let newParam = { ...params, page: page };
    setParams(newParam);
    getList(newParam);
  };
  // 筛选改变
  const searchChange = (data: objectKey) => {
    setParams({ ...params, ...data });
  };
  // 列表选择改变
  const onchange = (key: string, row: objectKey[]) => {};
  // 点击列表回调
  const callback = (
    name: string,
    data: objectKey,
    emit: objectKey | undefined
  ) => {
    if (emit && emit.emit === "toDetail") {
      return alert("点击了查看详情");
    }
    alert(`点击了${name}，值为${data[name]}`)
  };
  // 按钮点击
  const buttonClick = (data: objectKey) => {
    switch (data.type) {
      // 查询
      case "search":
        getList();
        return;
      // 重置
      case "reset":
        let newParam = { ...defaultParams, page: params.page };
        setParams(newParam);
        getList(newParam);
        return;
    }
  };
  return (
    <div>
      <div className="mb-10">
        <SearchModule
          list={searchList}
          onChange={searchChange}
          className="dis-initial"
        />
        <ButtomModule
          list={tableOption.buttonList}
          onClick={buttonClick}
          className="dis-inb mt-10"
        />
      </div>
      <TableModule
        columns={tableOption.tableList}
        data={dataList}
        key="table-index"
        rowKey="id"
        callback={callback}
        pagination={pagination}
        rowSelection={{ onChange: onchange, hide: true }}
        loading={tableLoading}
      />
    </div>
  );
};
export default TableIndex;
