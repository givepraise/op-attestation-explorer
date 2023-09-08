import { EAS_SCHEMAS } from "../../constants";

export default function SchemaButtons() {
  return (
    <div className="flex w-full gap-5">
      <div className="px-3 py-2 cursor-pointer shadow-theme-shadow-1 rounded-xl hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40">
        All
      </div>
      {EAS_SCHEMAS.map((schema) => (
        <div
          key={schema.uid}
          className="px-3 py-2 cursor-pointer shadow-theme-shadow-1 rounded-xl hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40"
        >
          {schema.name}
        </div>
      ))}
    </div>
  );
}
