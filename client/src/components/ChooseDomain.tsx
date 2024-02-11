import axios from "axios";
import { useEffect, useState } from "react";
type Props = {
  workName: string;
  handleChange: Function;
};
const ChooseDomain = ({ workName, handleChange }: Props) => {
  const url = process.env.REACT_APP_port;
  const [workNameList, setWorkNameList] = useState<
    null | { name: string; _id: string }[]
  >(null);
  const getDomains = async () => {
    try {
      await axios.get(url + "/workNameList").then((res: any) => {
        console.log("work name list ", location.pathname);
        setWorkNameList(res.data.workNames);
      });
    } catch (error: any) {
      setWorkNameList([{ name: "لا يمكن الاتصال بالسرفر", _id: "9" }]);
    }
  };
  useEffect(() => {
    getDomains();
  }, []);

  return (
    <div className="mb-3 text-white text-end">
      <p className="text-end"> : اختر نوع العمل </p>
      <select
        style={{ backgroundColor: "#ffffff4f" }}
        className="text-end text-white w-75"
        value={workName}
        onChange={(e) => handleChange(e, "workName")}
      >
        <option className="list-group-item text-white" value="">
          {" "}
        </option>
        {workNameList?.length &&
          workNameList.map((work) => {
            return (
              <option
                key={work._id}
                value={work.name}
                className="list-group-item text-dark"
              >
                {work.name}
              </option>
            );
          })}
        {location.pathname === "/register/info" && (
          <option
            className="list-group-item text-dark"
            value={"أخرى (أريد إضافة عملي)"}
          >
            {"أخرى (أريد إضافة عملي)"}
          </option>
        )}
      </select>
    </div>
  );
};

export default ChooseDomain;
