import React from "react";
import Line from "@/components/G2/Line";
import Column from "@/components/G2/Column";
const G2Index: React.FC<{}> = props => {
  const [lineConfig, setLineConfig] = React.useState<object>({
    data: [],
    xField: "date",
    yField: "value"
  });
  const [columnConfig, setColumnConfig] = React.useState<object>({
    data: [],
    xField: "action",
    yField: "pv"
  });
  React.useEffect(() => {
    init();
  }, []);
  function init() {
    setLineConfig({
      ...lineConfig,
      data: [
        {
          date: "2018/8/1",
          type: "download",
          value: 4623
        },
        {
          date: "2018/8/1",
          type: "register",
          value: 2208
        },
        {
          date: "2018/8/1",
          type: "bill",
          value: 182
        },
        {
          date: "2018/8/2",
          type: "download",
          value: 6145
        }
      ]
    });
    setColumnConfig({
      ...columnConfig,
      data: [
        {
          action: "浏览网站",
          pv: 50000
        },
        {
          action: "放入购物车",
          pv: 35000
        },
        {
          action: "生成订单",
          pv: 25000
        }
      ]
    });
  }
  return (
    <>
      <div>
        <Line config={lineConfig} />
      </div>
      <div className="mt-30">
        <Column config={columnConfig} />
      </div>
    </>
  );
};
export default G2Index;
