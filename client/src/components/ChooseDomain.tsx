import { typeWork } from "../staticData/genres";

type Props ={
  workName: string,
  handleChange :Function ,

}
const ChooseDomain = ({workName ,handleChange}:Props) => {
    const workType = typeWork;

  return (
    <div className="mb-3 text-white text-end">
      <p className="text-end"> : اختر نوع العمل  </p>
      <select
        style={{ backgroundColor: "#ffffff4f" }}
        className="text-end text-white w-75"
        value={workName}
        onChange={(e) => handleChange(e, "workName")}
      >
        <option className="list-group-item text-white" value="">
          {" "}
        </option>
        {workType.map((work) => {
          return (
            <option
              key={work}
              value={work}
              className="list-group-item text-dark"
            >
              {work}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ChooseDomain;
