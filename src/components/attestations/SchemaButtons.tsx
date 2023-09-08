import { EAS_SCHEMAS } from "../../constants";

export default function SchemaButtons() {
  return (
    <div className="flex gap-5 w-full">
      <div className="px-3 py-2 shadow-theme-shadow-1 rounded-xl hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 cursor-pointer">
        All
      </div>
      {EAS_SCHEMAS.map((schema) => (
        <div
          key={schema.uid}
          className="px-3 py-2 shadow-theme-shadow-1 rounded-xl hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 cursor-pointer"
        >
          {schema.name}
        </div>
      ))}
    </div>
  );
}
