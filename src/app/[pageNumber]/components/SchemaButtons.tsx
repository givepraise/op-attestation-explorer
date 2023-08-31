import { EAS_SCHEMAS } from "../../../constants";

export default function SchemaButtons() {
  return (
    <div className="flex gap-5 w-full">
      <div className="py-2 px-3 border bg-white bg-opacity-10">All</div>
      {EAS_SCHEMAS.map((schema) => (
        <div key={schema.uid} className="px-3 py-2 border ">
          {schema.name}
        </div>
      ))}
    </div>
  );
}
